import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { nom, telephone, courriel, adresse, ville, datesouhaitee, forfait, semainessup, message } = body;

    if (!nom || !telephone || !courriel || !adresse || !ville || !datesouhaitee || !forfait) {
      return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
    }

    // Calcul du prix
    const prixForfait: Record<string, number> = {
      studio: 79,
      appartement: 109,
      maison: 149,
    };
    const prix = (prixForfait[forfait] || 0) + Number(semainessup || 0) * 25;

    // Ici vous pouvez envoyer un courriel via Resend, Nodemailer, etc.
    // Pour l'instant on log et on retourne un succès.
    console.log("Nouvelle réservation:", {
      nom,
      telephone,
      courriel,
      adresse,
      ville,
      datesouhaitee,
      forfait,
      semainessup,
      prixTotal: `${prix}$`,
      message,
    });

    return NextResponse.json({ success: true, message: "Réservation reçue avec succès." });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
