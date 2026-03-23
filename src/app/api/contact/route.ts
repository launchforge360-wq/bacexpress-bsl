import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, courriel, sujet, message } = body;

    if (!nom || !courriel || !sujet || !message) {
      return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
    }

    // Ici vous pouvez envoyer un courriel via Resend, Nodemailer, etc.
    console.log("Nouveau message de contact:", { nom, courriel, sujet, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
