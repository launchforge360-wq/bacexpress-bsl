import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Villes desservies – Rimouski, Matane, Mont-Joli, Rivière-du-Loup",
  description:
    "BacExpress BSL livre des boîtes de déménagement réutilisables à Rimouski, Matane, Mont-Joli et Rivière-du-Loup. Service de livraison et cueillette inclus.",
};

const villes = [
  {
    nom: "Rimouski",
    description:
      "Principale ville du Bas-Saint-Laurent, Rimouski est notre zone de service centrale. Livraison rapide partout en ville et dans les secteurs adjacents.",
    motsCles: ["location boites déménagement Rimouski", "déménagement Rimouski"],
    population: "~50 000 habitants",
    emoji: "🏙️",
  },
  {
    nom: "Matane",
    description:
      "Nous desservons Matane et ses environs. Que vous déménagiez en ville ou en périphérie, nous livrons vos boîtes à domicile.",
    motsCles: ["location boites déménagement Matane", "déménagement Matane"],
    population: "~14 000 habitants",
    emoji: "🌊",
  },
  {
    nom: "Mont-Joli",
    description:
      "BacExpress BSL est disponible à Mont-Joli pour tous vos besoins de déménagement. Service rapide et fiable.",
    motsCles: ["location boites déménagement Mont-Joli", "déménagement Mont-Joli"],
    population: "~6 500 habitants",
    emoji: "🏔️",
  },
  {
    nom: "Rivière-du-Loup",
    description:
      "Nous couvrons Rivière-du-Loup et sa région. Profitez de nos boîtes réutilisables pour un déménagement sans tracas.",
    motsCles: ["location boites déménagement Rivière-du-Loup", "déménagement Rivière-du-Loup"],
    population: "~20 000 habitants",
    emoji: "🐋",
  },
];

const faq = [
  {
    q: "Est-ce que vous livrez en dehors de ces villes?",
    a: "Nous desservons principalement ces quatre villes. Contactez-nous pour vérifier si nous pouvons vous livrer dans une municipalité adjacente.",
  },
  {
    q: "Combien de temps à l'avance faut-il réserver?",
    a: "Nous recommandons de réserver au moins 1 semaine à l'avance, surtout en période de pointe (mai à septembre). Plus tôt c'est mieux!",
  },
  {
    q: "À quelle heure livrez-vous?",
    a: "La livraison se fait généralement en journée, du lundi au samedi. Nous vous contactons pour confirmer l'heure exacte.",
  },
];

export default function Villes() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-4">Villes desservies</h1>
          <p className="text-green-100 text-lg">
            BacExpress BSL livre des boîtes de déménagement réutilisables dans quatre villes
            du Bas-Saint-Laurent.
          </p>
        </div>
      </section>

      {/* Carte / zones */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {villes.map((v) => (
              <div
                key={v.nom}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{v.emoji}</div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 mb-1">{v.nom}</h2>
                    <p className="text-xs text-gray-400 mb-2">{v.population}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-12 px-4 bg-green-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Livraison et cueillette incluses
          </h2>
          <p className="text-gray-600 mb-6">
            Peu importe votre ville, le service est le même : on livre les boîtes propres chez vous
            avant le déménagement et on vient les chercher après. Aucun frais supplémentaire pour la
            livraison ou la cueillette.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Livraison gratuite", "Cueillette gratuite", "Boîtes propres", "Délai garanti"].map((tag) => (
              <span
                key={tag}
                className="bg-green-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <div key={item.q} className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold text-gray-800 mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-green-700 text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Votre ville est desservie?</h2>
          <p className="text-green-100 mb-6">
            Réservez vos boîtes dès maintenant et préparez votre déménagement l&apos;esprit tranquille.
          </p>
          <Link
            href="/reservation"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Réserver mes boîtes
          </Link>
        </div>
      </section>
    </>
  );
}
