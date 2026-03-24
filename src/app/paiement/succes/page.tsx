import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paiement réussi – BacExpress BSL",
  robots: { index: false },
};

export default function SuccesPage() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-gray-50">
      <div className="bg-white rounded-2xl p-10 shadow max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Paiement réussi!</h1>
        <p className="text-gray-600 mb-6">
          Merci pour votre réservation! Un courriel de confirmation a été envoyé à votre adresse.
          Nous vous contacterons dans les <strong>24 heures</strong> pour confirmer la date
          et l&apos;heure de livraison.
        </p>
        <div className="bg-green-50 rounded-xl p-4 mb-6 text-sm text-green-700">
          Gardez un oeil sur votre boîte de réception (et vos courriels indésirables).
        </div>
        <Link
          href="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
