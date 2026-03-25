import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function GET() {
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price_data: { currency: "cad", product_data: { name: "Test" }, unit_amount: 100 }, quantity: 1 }],
      mode: "payment",
      success_url: "https://bacexpress.vercel.app/paiement/succes",
      cancel_url: "https://bacexpress.vercel.app/paiement/annule",
    });
    return NextResponse.json({ ok: true, url: session.url?.slice(0, 50) });
  } catch (err) {
    return NextResponse.json({ error: String(err), type: err instanceof Error ? err.constructor.name : "unknown" });
  }
}
