"use server";

import { createClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";
import Stripe from "stripe";

export async function createCheckoutSession(priceId: string) {
  if (!env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  if (!env.NEXT_PUBLIC_APP_URL) {
    throw new Error("Missing NEXT_PUBLIC_APP_URL");
  }

  if (!priceId) {
    throw new Error("Missing price ID");
  }

  const isProPrice = priceId === env.STRIPE_PRICE_ID_PRO;
  const isTeamPrice = priceId === env.STRIPE_PRICE_ID_TEAM;

  if (isProPrice && !env.STRIPE_PRICE_ID_PRO) {
    throw new Error("Missing STRIPE_PRICE_ID_PRO");
  }

  if (isTeamPrice && !env.STRIPE_PRICE_ID_TEAM) {
    throw new Error("Missing STRIPE_PRICE_ID_TEAM");
  }

  if (isProPrice && !env.STRIPE_PRICE_ID_PRO?.startsWith("price_")) {
    throw new Error("Invalid STRIPE_PRICE_ID_PRO, expected price_...");
  }

  if (isTeamPrice && !env.STRIPE_PRICE_ID_TEAM?.startsWith("price_")) {
    throw new Error("Invalid STRIPE_PRICE_ID_TEAM, expected price_...");
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  let customerId = subscription?.stripe_customer_id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId: user.id },
    });
    customerId = customer.id;
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${env.NEXT_PUBLIC_APP_URL}/app?checkout=success`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL}/pricing?checkout=canceled`,
  });

  return { url: session.url };
}
