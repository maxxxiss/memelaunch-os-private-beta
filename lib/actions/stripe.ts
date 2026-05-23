"use server";

import { createClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";
import Stripe from "stripe";

if (!env.STRIPE_SECRET_KEY) {
  console.warn("STRIPE_SECRET_KEY not set. Stripe features disabled.");
}

const stripe = env.STRIPE_SECRET_KEY ? new Stripe(env.STRIPE_SECRET_KEY) : null;

export async function createCheckoutSession(priceId: string) {
  if (!stripe) {
    throw new Error("Stripe is not configured");
  }

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
