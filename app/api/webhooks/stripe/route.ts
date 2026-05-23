import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = env.STRIPE_SECRET_KEY ? new Stripe(env.STRIPE_SECRET_KEY) : null;

export async function POST(req: Request) {
  if (!env.STRIPE_WEBHOOK_SECRET) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return NextResponse.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET" },
      { status: 400 }
    );
  }

  if (!stripe) {
    console.error("Missing STRIPE_SECRET_KEY");
    return NextResponse.json(
      { error: "Missing STRIPE_SECRET_KEY" },
      { status: 400 }
    );
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  console.log("stripe webhook received", {
    hasSignature: Boolean(signature),
    hasWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
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
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("stripe signature verification failed", errorMessage);
    return NextResponse.json(
      { error: "Invalid Stripe webhook signature" },
      { status: 400 }
    );
  }

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

        if (!userId) {
          console.error("No userId in session metadata");
          throw new Error("Missing checkout metadata: userId");
        }

        if (!subscriptionId) {
          console.error("No subscriptionId in session");
          throw new Error("Missing subscription id");
        }

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const priceId = subscription.items.data[0].price.id;

        let planType = "free";
        if (priceId === env.STRIPE_PRICE_ID_PRO) {
          planType = "pro";
        } else if (priceId === env.STRIPE_PRICE_ID_TEAM) {
          planType = "team";
        }

        const { error: subError } = await supabase.from("subscriptions").upsert({
          user_id: userId,
          workspace_id: workspaceId || null,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          stripe_price_id: priceId,
          status: subscription.status,
          plan_type: planType,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
        });

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
        if (priceId === env.STRIPE_PRICE_ID_PRO) {
          planType = "pro";
        } else if (priceId === env.STRIPE_PRICE_ID_TEAM) {
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
