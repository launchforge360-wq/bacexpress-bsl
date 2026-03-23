import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact – BacExpress BSL",
  description:
    "Contactez BacExpress BSL pour toute question sur notre service de location de boîtes de déménagement au Bas-Saint-Laurent.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-4">Contactez-nous</h1>
          <p className="text-green-100 text-lg">
            Une question sur nos forfaits? Besoin d&apos;informations sur la livraison dans votre secteur?
            On est là pour vous aider.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Infos contact */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Informations</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📍</div>
                  <div>
                    <div className="font-semibold text-gray-800">Zone de service</div>
                    <div className="text-gray-600 text-sm">Rimouski · Matane · Mont-Joli · Rivière-du-Loup</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🌐</div>
                  <div>
                    <div className="font-semibold text-gray-800">Site web</div>
                    <div className="text-gray-600 text-sm">boitededemenagement.ca</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⏰</div>
                  <div>
                    <div className="font-semibold text-gray-800">Disponibilité</div>
                    <div className="text-gray-600 text-sm">
                      Réponse en moins de 24 heures<br />
                      Lundi au vendredi, 8h à 18h
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-5">
              <h3 className="font-bold text-green-800 mb-2">Besoin urgent?</h3>
              <p className="text-green-700 text-sm">
                Pour les demandes urgentes, mentionnez-le dans votre message et nous ferons de notre
                mieux pour vous répondre rapidement.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-3">Pourquoi BacExpress BSL?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "Service local, réponse rapide",
                  "Forfaits clairs, sans surprises",
                  "Livraison et cueillette incluses",
                  "Boîtes solides et écologiques",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formulaire */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
