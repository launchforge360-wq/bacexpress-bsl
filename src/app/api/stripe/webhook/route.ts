import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { FORFAITS, SEMAINE_SUP_PRIX, type ForfaitId } from "@/config/forfaits";
import { decrementerInventaire } from "@/lib/inventaire";
import { envoyerConfirmationReservation } from "@/lib/email";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret || webhookSecret.startsWith("whsec_REMPLACER")) {
    console.warn("[Webhook] STRIPE_WEBHOOK_SECRET non configuré — signature ignorée en dev.");
    return NextResponse.json({ received: true });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("[Webhook] Signature invalide:", err);
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status === "paid") {
      const meta = session.metadata || {};
      const forfaitId = meta.forfaitId as ForfaitId;

      // 1. Réduire l'inventaire
      if (forfaitId && FORFAITS[forfaitId]) {
        const restant = await decrementerInventaire(forfaitId);
        console.log(`[Inventaire] ${forfaitId} → ${restant} restant(s)`);
      }

      // 2. Calculer le total
      const forfait = FORFAITS[forfaitId];
      const semaines = Number(meta.semainessup || 0);
      const prixTotal = forfait
        ? forfait.prix + semaines * SEMAINE_SUP_PRIX
        : (session.amount_total || 0) / 100;

      // 3. Envoyer les courriels de confirmation
      await envoyerConfirmationReservation({
        nom: meta.nom || "Client",
        courriel: meta.courriel || session.customer_email || "",
        forfait: forfait?.nom || forfaitId,
        boites: forfait?.boites || 0,
        prixTotal,
        datesouhaitee: meta.datesouhaitee || "",
        adresse: meta.adresse || "",
        ville: meta.ville || "",
        semainessup: semaines,
        stripeSessionId: session.id,
      });

      console.log(`[Webhook] Paiement confirmé pour ${meta.nom} — ${forfait?.nom} — ${prixTotal}$`);
    }
  }

  return NextResponse.json({ received: true });
}
