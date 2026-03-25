import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: "Clé manquante" });

  // Test direct fetch vers Stripe sans SDK
  try {
    const res = await fetch("https://api.stripe.com/v1/payment_methods?limit=1", {
      headers: { Authorization: `Bearer ${key}` },
    });
    const data = await res.json();
    return NextResponse.json({
      keyPrefix: key.slice(0, 12) + "...",
      stripeStatus: res.status,
      stripeOk: res.ok,
      object: data.object,
    });
  } catch (err) {
    return NextResponse.json({ fetchError: String(err) });
  }
}
