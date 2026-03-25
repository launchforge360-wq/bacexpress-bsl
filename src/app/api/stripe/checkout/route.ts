import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { FORFAITS, SEMAINE_SUP_PRIX, type ForfaitId } from "@/config/forfaits";
import { getInventaire } from "@/lib/inventaire";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { forfaitId, semainessup = 0, nom, courriel, telephone, adresse, ville, datesouhaitee, message } = body;

    if (!forfaitId || !FORFAITS[forfaitId as ForfaitId]) {
      return NextResponse.json({ error: "Forfait invalide." }, { status: 400 });
    }

    const forfait = FORFAITS[forfaitId as ForfaitId];

    // Vérifier l'inventaire (avec fallback si KV non disponible)
    try {
      const dispo = await getInventaire(forfaitId as ForfaitId);
      if (dispo <= 0) {
        return NextResponse.json(
          { error: "Ce forfait n'est plus disponible pour le moment. Contactez-nous." },
          { status: 409 }
        );
      }
    } catch (invErr) {
      // Inventaire non disponible — on continue quand même
      console.warn("[Inventaire] Erreur lecture inventaire, on continue:", invErr);
    }

    const siteUrl = process.env.SITE_URL || "https://bacexpress.vercel.app";
    const semaines = Number(semainessup);

    const lineItems = [
      {
        price_data: {
          currency: "cad",
          product_data: {
            name: forfait.nom,
            description: forfait.description,
          },
          unit_amount: forfait.prix * 100,
        },
        quantity: 1,
      },
      ...(semaines > 0
        ? [
            {
              price_data: {
                currency: "cad",
                product_data: {
                  name: "Semaine(s) supplémentaire(s)",
                  description: `+${semaines} semaine(s) à ${SEMAINE_SUP_PRIX}$/semaine`,
                },
                unit_amount: SEMAINE_SUP_PRIX * 100,
              },
              quantity: semaines,
            },
          ]
        : []),
    ];

    const metadata: Record<string, string> = {
      forfaitId,
      nom: nom || "",
      courriel: courriel || "",
      telephone: telephone || "",
      adresse: adresse || "",
      ville: ville || "",
      datesouhaitee: datesouhaitee || "",
      semainessup: String(semaines),
      message: message || "",
    };

    const session = await getStripe().checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      locale: "fr",
      customer_email: courriel || undefined,
      success_url: `${siteUrl}/paiement/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/paiement/annule`,
      metadata,
      payment_intent_data: { metadata },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Erreur checkout Stripe:", message);
    return NextResponse.json({ error: "Erreur lors de la création du paiement.", detail: message }, { status: 500 });
  }
}
