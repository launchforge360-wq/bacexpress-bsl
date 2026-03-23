import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forfaits de location de boîtes de déménagement",
  description:
    "Découvrez nos forfaits location boîtes déménagement au Bas-Saint-Laurent. Forfait Studio 79$, Appartement 109$, Maison 149$. Livraison et cueillette incluses.",
};

const forfaits = [
  {
    nom: "Studio",
    boites: 20,
    prix: 79,
    slug: "studio",
    description: "Parfait pour un studio ou un logement d'une chambre. Idéal pour les petits déménagements.",
    inclus: [
      "20 boîtes réutilisables",
      "1 semaine d'utilisation",
      "Livraison à domicile",
      "Cueillette incluse",
      "Boîtes propres et désinfectées",
    ],
    couleur: "border-blue-400",
    badgeCouleur: "bg-blue-50 text-blue-700",
    badge: "Petit déménagement",
    highlight: false,
  },
  {
    nom: "Appartement",
    boites: 35,
    prix: 109,
    slug: "appartement",
    description: "Idéal pour un appartement de 3½ à 5½. Notre forfait le plus populaire.",
    inclus: [
      "35 boîtes réutilisables",
      "1 semaine d'utilisation",
      "Livraison à domicile",
      "Cueillette incluse",
      "Boîtes propres et désinfectées",
    ],
    couleur: "border-green-500",
    badgeCouleur: "bg-green-50 text-green-700",
    badge: "Le plus populaire",
    highlight: true,
  },
  {
    nom: "Maison",
    boites: 50,
    prix: 149,
    slug: "maison",
    description: "Pour les maisons et les grandes familles. Assez de boîtes pour tout déménager d'un coup.",
    inclus: [
      "50 boîtes réutilisables",
      "1 semaine d'utilisation",
      "Livraison à domicile",
      "Cueillette incluse",
      "Boîtes propres et désinfectées",
    ],
    couleur: "border-orange-400",
    badgeCouleur: "bg-orange-50 text-orange-700",
    badge: "Grande famille",
    highlight: false,
  },
];

export default function Forfaits() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-4">Nos forfaits de location</h1>
          <p className="text-green-100 text-lg">
            Choisissez le forfait qui correspond à votre déménagement. Livraison et cueillette
            toujours incluses.
          </p>
        </div>
      </section>

      {/* Forfaits */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {forfaits.map((f) => (
            <div
              key={f.nom}
              className={`rounded-2xl border-t-4 ${f.couleur} p-8 shadow-sm hover:shadow-lg transition-shadow ${f.highlight ? "ring-2 ring-green-400 scale-[1.02]" : ""}`}
            >
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${f.badgeCouleur}`}>
                {f.badge}
              </span>
              <h2 className="text-2xl font-extrabold text-gray-800 mt-3 mb-1">Forfait {f.nom}</h2>
              <p className="text-gray-500 text-sm mb-4">{f.description}</p>

              <div className="mb-6">
                <span className="text-5xl font-extrabold text-gray-900">{f.prix}</span>
                <span className="text-xl text-gray-500">$</span>
                <div className="text-sm text-gray-400 mt-1">{f.boites} boîtes · 1 semaine</div>
              </div>

              <ul className="space-y-2 mb-8">
                {f.inclus.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={`/reservation?forfait=${f.slug}`}
                className={`block text-center font-semibold py-3 rounded-xl transition-colors ${f.highlight ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-100 hover:bg-green-600 hover:text-white text-gray-800"}`}
              >
                Choisir ce forfait
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Semaine supp */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm text-center">
          <div className="text-4xl mb-3">+</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Semaine supplémentaire</h2>
          <p className="text-gray-600 mb-4">
            Besoin de plus de temps? Ajoutez une semaine supplémentaire à votre forfait pour seulement
          </p>
          <div className="text-5xl font-extrabold text-green-600 mb-4">25$</div>
          <p className="text-sm text-gray-400">
            Disponible pour tous les forfaits. Mentionnez-le lors de votre réservation ou contactez-nous.
          </p>
        </div>
      </section>

      {/* Comparaison carton vs réutilisable */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Boîtes en carton vs boîtes réutilisables
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 bg-gray-100 rounded-tl-xl text-gray-600 font-semibold">Critère</th>
                  <th className="py-3 px-4 bg-gray-100 text-gray-600 font-semibold">Carton</th>
                  <th className="py-3 px-4 bg-green-600 text-white rounded-tr-xl font-semibold">BacExpress BSL</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Résistance à l'humidité", "Non", "Oui"],
                  ["Empilable facilement", "Parfois", "Toujours"],
                  ["Livraison incluse", "Non", "Oui"],
                  ["Zéro déchet", "Non", "Oui"],
                  ["Assemblage requis", "Oui", "Non"],
                  ["Coût global", "15-30$+ taxes", "Dès 79$"],
                ].map(([critere, carton, bac], i) => (
                  <tr key={critere} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-3 px-4 font-medium text-gray-700">{critere}</td>
                    <td className="py-3 px-4 text-center text-gray-500">{carton}</td>
                    <td className="py-3 px-4 text-center text-green-700 font-semibold bg-green-50">{bac}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-green-700 text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Réservez dès aujourd&apos;hui</h2>
          <p className="text-green-100 mb-6">
            Disponibilité limitée lors des périodes de pointe. Réservez à l&apos;avance pour garantir votre date.
          </p>
          <Link
            href="/reservation"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Faire une réservation
          </Link>
        </div>
      </section>
    </>
  );
}
