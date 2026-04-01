/**
 * Envoi de courriels via Resend (https://resend.com)
 *
 * ADRESSE D'ENVOI :
 * - En test Resend : utilise "onboarding@resend.dev" (fonctionne sans vérification de domaine)
 * - En production : vérifiez boitededemenagement.ca dans Resend → puis changez FROM_EMAIL ci-dessous
 */

// Pour utiliser votre propre domaine, vérifiez-le sur resend.com/domains
// puis remplacez la valeur ci-dessous par : "BacExpress BSL <noreply@boitededemenagement.ca>"
const FROM_EMAIL = "BacExpress BSL <noreply@boitededemenagement.ca>";

interface ConfirmationEmailData {
  nom: string;
  courriel: string;
  forfait: string;
  boites: number;
  prixTotal: number;
  datesouhaitee: string;
  adresse: string;
  ville: string;
  semainessup: number;
  stripeSessionId: string;
}

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html, reply_to: "info@boitededemenagement.ca" }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`[Resend] Erreur envoi à ${to}:`, err);
    // Ne pas bloquer le flux — le paiement est déjà confirmé
    return null;
  }
  return res.json();
}

export async function envoyerConfirmationReservation(data: ConfirmationEmailData) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bacexpress.vercel.app";
  const notifEmail = process.env.NOTIFICATION_EMAIL;
  const numConfirmation = data.stripeSessionId.slice(-12).toUpperCase();

  // ── Courriel au CLIENT ──────────────────────────────────────────────────────
  const htmlClient = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:white;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08)">

        <!-- En-tête -->
        <tr>
          <td style="background:linear-gradient(135deg,#15803d,#166534);padding:32px 24px;text-align:center">
            <p style="margin:0;color:#bbf7d0;font-size:13px;letter-spacing:.5px;text-transform:uppercase">BacExpress BSL</p>
            <h1 style="margin:8px 0 0;color:white;font-size:26px;font-weight:800">Réservation confirmée!</h1>
          </td>
        </tr>

        <!-- Corps -->
        <tr>
          <td style="padding:32px 24px">
            <p style="margin:0 0 16px;font-size:17px;color:#111827">Bonjour <strong>${data.nom}</strong>,</p>
            <p style="margin:0 0 24px;color:#4b5563;line-height:1.6">
              Votre paiement a été traité avec succès et votre réservation est confirmée.
              Voici le récapitulatif de votre commande.
            </p>

            <!-- Carte récap -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;margin-bottom:24px">
              <tr style="background:#f9fafb">
                <td style="padding:14px 18px;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.5px" colspan="2">Détails de la réservation</td>
              </tr>
              <tr style="border-top:1px solid #e5e7eb">
                <td style="padding:12px 18px;color:#6b7280;font-size:14px">Forfait</td>
                <td style="padding:12px 18px;font-weight:600;color:#111827;font-size:14px">${data.forfait}</td>
              </tr>
              <tr style="border-top:1px solid #e5e7eb;background:#f9fafb">
                <td style="padding:12px 18px;color:#6b7280;font-size:14px">Nombre de boîtes</td>
                <td style="padding:12px 18px;font-weight:600;color:#111827;font-size:14px">${data.boites} boîtes réutilisables</td>
              </tr>
              ${data.semainessup > 0 ? `
              <tr style="border-top:1px solid #e5e7eb">
                <td style="padding:12px 18px;color:#6b7280;font-size:14px">Semaines supplémentaires</td>
                <td style="padding:12px 18px;font-weight:600;color:#111827;font-size:14px">+${data.semainessup} semaine(s)</td>
              </tr>` : ""}
              <tr style="border-top:1px solid #e5e7eb;background:#f9fafb">
                <td style="padding:12px 18px;color:#6b7280;font-size:14px">Date souhaitée</td>
                <td style="padding:12px 18px;font-weight:600;color:#111827;font-size:14px">${data.datesouhaitee}</td>
              </tr>
              <tr style="border-top:1px solid #e5e7eb">
                <td style="padding:12px 18px;color:#6b7280;font-size:14px">Adresse de livraison</td>
                <td style="padding:12px 18px;font-weight:600;color:#111827;font-size:14px">${data.adresse}, ${data.ville}</td>
              </tr>
              <tr style="border-top:2px solid #e5e7eb;background:#f0fdf4">
                <td style="padding:14px 18px;color:#166534;font-weight:700;font-size:15px">Total payé</td>
                <td style="padding:14px 18px;font-weight:800;color:#16a34a;font-size:20px">${data.prixTotal} $</td>
              </tr>
            </table>

            <!-- Prochaine étape -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;margin-bottom:24px">
              <tr>
                <td style="padding:18px">
                  <p style="margin:0 0 6px;font-weight:700;color:#166534;font-size:15px">Prochaine étape</p>
                  <p style="margin:0;color:#166534;font-size:14px;line-height:1.6">
                    Nous vous contacterons dans les <strong>24 heures</strong> pour confirmer
                    la date et l'heure exacte de livraison des boîtes à votre adresse.
                  </p>
                </td>
              </tr>
            </table>

            <p style="color:#9ca3af;font-size:12px;margin:0">
              N° de confirmation : <strong style="font-family:monospace;background:#f3f4f6;padding:2px 8px;border-radius:4px">${numConfirmation}</strong>
            </p>
          </td>
        </tr>

        <!-- Pied de page -->
        <tr>
          <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 24px;text-align:center">
            <p style="margin:0;color:#9ca3af;font-size:12px">
              BacExpress BSL · Bas-Saint-Laurent ·
              <a href="${siteUrl}" style="color:#16a34a;text-decoration:none">boitededemenagement.ca</a>
            </p>
            <p style="margin:6px 0 0;color:#d1d5db;font-size:11px">
              Rimouski · Matane · Mont-Joli · Rivière-du-Loup
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  // ── Courriel de NOTIFICATION au propriétaire ────────────────────────────────
  const htmlNotif = `
<!DOCTYPE html>
<html lang="fr">
<body style="font-family:sans-serif;max-width:560px;margin:32px auto;padding:0 16px;color:#111827">
  <div style="background:#15803d;color:white;padding:16px 20px;border-radius:8px 8px 0 0">
    <h2 style="margin:0;font-size:18px">Nouvelle réservation payée</h2>
  </div>
  <div style="border:1px solid #e5e7eb;border-top:none;padding:20px;border-radius:0 0 8px 8px">
    <table width="100%" cellpadding="6">
      <tr><td style="color:#6b7280;font-size:14px;width:40%">Client</td><td style="font-weight:600">${data.nom}</td></tr>
      <tr><td style="color:#6b7280;font-size:14px">Courriel</td><td><a href="mailto:${data.courriel}">${data.courriel}</a></td></tr>
      <tr><td style="color:#6b7280;font-size:14px">Forfait</td><td style="font-weight:600">${data.forfait} (${data.boites} boîtes)</td></tr>
      ${data.semainessup > 0 ? `<tr><td style="color:#6b7280;font-size:14px">Sem. supp.</td><td>+${data.semainessup}</td></tr>` : ""}
      <tr><td style="color:#6b7280;font-size:14px">Date souhaitée</td><td style="font-weight:600">${data.datesouhaitee}</td></tr>
      <tr><td style="color:#6b7280;font-size:14px">Adresse</td><td>${data.adresse}, ${data.ville}</td></tr>
      <tr style="background:#f0fdf4"><td style="color:#166534;font-weight:700;font-size:15px">Total</td><td style="font-weight:800;color:#16a34a;font-size:18px">${data.prixTotal} $</td></tr>
    </table>
    <p style="margin:16px 0 0;font-size:12px;color:#9ca3af">Session Stripe : ${data.stripeSessionId}</p>
  </div>
</body>
</html>`;

  // Envoi en parallèle
  const envois: Promise<unknown>[] = [
    sendEmail(data.courriel, `Confirmation de réservation – ${data.forfait} | BacExpress BSL`, htmlClient),
  ];

  if (notifEmail) {
    envois.push(
      sendEmail(notifEmail, `[BacExpress] Nouvelle réservation – ${data.nom} – ${data.forfait} – ${data.prixTotal}$`, htmlNotif)
    );
  }

  await Promise.all(envois);
  console.log(`[Email] Confirmation envoyée à ${data.courriel} + notification à ${notifEmail}`);
}
