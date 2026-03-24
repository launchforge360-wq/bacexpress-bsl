import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paiement annulé – BacExpress BSL",
  robots: { index: false },
};

export default function AnnulePage() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-gray-50">
      <div className="bg-white rounded-2xl p-10 shadow max-w-md w-full text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Paiement annulé</h1>
        <p className="text-gray-600 mb-6">
          Votre paiement a été annulé. Aucun montant n&apos;a été débité.
          Vous pouvez recommencer quand vous le souhaitez.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/reservation"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Réessayer
          </Link>
          <Link
            href="/"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
