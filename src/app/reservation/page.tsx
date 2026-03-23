import type { Metadata } from "next";
import ReservationForm from "@/components/ReservationForm";

export const metadata: Metadata = {
  title: "Réservation de boîtes de déménagement",
  description:
    "Réservez vos boîtes de déménagement réutilisables au Bas-Saint-Laurent. Choisissez votre forfait, votre date et votre adresse. Livraison incluse.",
};

export default function ReservationPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-4">Réservation</h1>
          <p className="text-green-100 text-lg">
            Remplissez le formulaire ci-dessous et nous vous contacterons dans les 24 heures
            pour confirmer votre réservation.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <ReservationForm />
        </div>
      </section>
    </>
  );
}
