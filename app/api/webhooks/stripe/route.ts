import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY?.trim();

  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return NextResponse.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET" },
      { status: 400 }
    );
  }

  if (!stripeSecretKey) {
    console.error("Missing STRIPE_SECRET_KEY");
    return NextResponse.json(
      { error: "Missing STRIPE_SECRET_KEY" },
      { status: 400 }
    );
  }

  const stripe = new Stripe(stripeSecretKey);

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  console.log("stripe webhook received", {
    eventType: "unknown",
    hasSignature: Boolean(signature),
    hasWebhookSecret: Boolean(webhookSecret),
    bodyLength: body.length,
  });

  if (!signature) {
    console.error("Missing stripe-signature header");
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("stripe signature verification failed", errorMessage);
    return NextResponse.json(
      { error: "Invalid Stripe webhook signature" },
      { status: 400 }
    );
  }

  console.log("stripe webhook received", {
    eventType: event.type,
    hasSignature: Boolean(signature),
    hasWebhookSecret: Boolean(webhookSecret),
    bodyLength: body.length,
  });

  const supabase = createServiceClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;
        const userId = session.metadata?.userId;
        const workspaceId = session.metadata?.workspaceId;
        const plan = session.metadata?.plan;
        const priceId = session.metadata?.priceId;

        if (!userId) {
          console.error("Missing checkout metadata: userId");
          throw new Error("Missing checkout metadata: userId");
        }

        if (!subscriptionId) {
          console.error("Missing subscription id");
          throw new Error("Missing subscription id");
        }

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const actualPriceId = subscription.items.data[0].price.id;

        let planType = "free";
        if (actualPriceId === process.env.STRIPE_PRICE_ID_PRO) {
          planType = "pro";
        } else if (actualPriceId === process.env.STRIPE_PRICE_ID_TEAM) {
          planType = "team";
        }

        console.log("checkout.session.completed", {
          userId,
          workspaceId: workspaceId || null,
          subscriptionId,
          planType,
          status: subscription.status,
        });

        const { error: subError } = await supabase.from("subscriptions").upsert(
          {
            user_id: userId,
            workspace_id: workspaceId || null,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            stripe_price_id: actualPriceId,
            status: subscription.status,
            plan_type: planType,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          },
          { onConflict: "stripe_subscription_id" }
        );

        if (subError) {
          console.error("Supabase subscription upsert failed:", subError);
          throw new Error("Supabase subscription upsert failed");
        }

        if (workspaceId && planType !== "free") {
          const { error: workspaceError } = await supabase
            .from("workspaces")
            .update({ plan: planType })
            .eq("id", workspaceId);

          if (workspaceError) {
            console.error("Supabase workspace plan update failed:", workspaceError);
          }
        }

        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const subscriptionId = subscription.id;
        const priceId = subscription.items.data[0].price.id;

        const { data: existingSub } = await supabase
          .from("subscriptions")
          .select("user_id, workspace_id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (!existingSub) {
          console.log("No existing subscription found for customer:", customerId);
          break;
        }

        let planType = "free";
        if (priceId === process.env.STRIPE_PRICE_ID_PRO) {
          planType = "pro";
        } else if (priceId === process.env.STRIPE_PRICE_ID_TEAM) {
          planType = "team";
        }

        const { error: subError } = await supabase
          .from("subscriptions")
          .update({
            stripe_subscription_id: subscriptionId,
            stripe_price_id: priceId,
            status: subscription.status,
            plan_type: planType,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          })
          .eq("stripe_customer_id", customerId);

        if (subError) {
          console.error("Supabase subscription update failed:", subError);
          throw new Error("Supabase subscription update failed");
        }

        if (existingSub.workspace_id && planType !== "free") {
          const { error: workspaceError } = await supabase
            .from("workspaces")
            .update({ plan: planType })
            .eq("id", existingSub.workspace_id);

          if (workspaceError) {
            console.error("Supabase workspace plan update failed:", workspaceError);
          }
        }

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const { data: existingSub } = await supabase
          .from("subscriptions")
          .select("workspace_id")
          .eq("stripe_customer_id", customerId)
          .single();

        const { error: subError } = await supabase
          .from("subscriptions")
          .update({
            status: "canceled",
            plan_type: "free",
          })
          .eq("stripe_customer_id", customerId);

        if (subError) {
          console.error("Supabase subscription delete failed:", subError);
          throw new Error("Supabase subscription delete failed");
        }

        if (existingSub?.workspace_id) {
          const { error: workspaceError } = await supabase
            .from("workspaces")
            .update({ plan: "free" })
            .eq("id", existingSub.workspace_id);

          if (workspaceError) {
            console.error("Supabase workspace plan downgrade failed:", workspaceError);
          }
        }

        break;
      }

      case "invoice.payment_succeeded":
      case "invoice.payment_failed": {
        console.log(`Invoice event: ${event.type}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
