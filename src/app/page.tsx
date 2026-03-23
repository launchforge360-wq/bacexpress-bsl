import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BacExpress BSL | Location de boîtes de déménagement Rimouski & Bas-Saint-Laurent",
  description:
    "Déménagez sans stress avec BacExpress BSL. Boîtes réutilisables solides, livraison et cueillette incluses à Rimouski, Matane, Mont-Joli et Rivière-du-Loup. Forfaits dès 79$.",
};

const avantages = [
  {
    icon: "♻️",
    title: "Écologique",
    description:
      "Nos boîtes en plastique réutilisables remplacent des dizaines de boîtes en carton. Zéro déchet, zéro culpabilité.",
  },
  {
    icon: "💪",
    title: "Solides & empilables",
    description:
      "Conçues pour résister aux chocs, à l'humidité et aux chutes. Vos biens sont protégés à chaque étape.",
  },
  {
    icon: "🚚",
    title: "Livraison incluse",
    description:
      "On livre chez vous avant votre déménagement et on vient récupérer les boîtes après. Aucun déplacement requis.",
  },
  {
    icon: "💰",
    title: "Économique",
    description:
      "Plus abordable qu'acheter des boîtes en carton quand on additionne l'achat, le transport et le recyclage.",
  },
  {
    icon: "⏱️",
    title: "Gain de temps",
    description:
      "Pas d'assemblage, pas de colle, pas de papier journal. Les boîtes sont prêtes à l'emploi dès leur livraison.",
  },
  {
    icon: "📦",
    title: "Format idéal",
    description:
      "Taille uniforme et optimisée pour faciliter l'empilement dans le camion et réduire le nombre de voyages.",
  },
];

const forfaits = [
  {
    nom: "Studio",
    boites: 20,
    prix: 79,
    slug: "studio",
    description: "Parfait pour un studio ou une chambre",
    couleur: "border-blue-400",
    badge: "",
  },
  {
    nom: "Appartement",
    boites: 35,
    prix: 109,
    slug: "appartement",
    description: "Idéal pour un 3½ à 5½",
    couleur: "border-green-500",
    badge: "Populaire",
  },
  {
    nom: "Maison",
    boites: 50,
    prix: 149,
    slug: "maison",
    description: "Pour les maisons et grandes familles",
    couleur: "border-orange-400",
    badge: "",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-green-500 text-white text-sm font-semibold px-4 py-1 rounded-full mb-5">
            Service disponible au Bas-Saint-Laurent
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
            Déménagez vert, <br className="hidden md:block" />
            déménagez <span className="text-yellow-300">sans stress</span>
          </h1>
          <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Location de boîtes de déménagement réutilisables avec livraison et cueillette
            incluses à Rimouski, Matane, Mont-Joli et Rivière-du-Loup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservation"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
            >
              Réserver mes boîtes
            </Link>
            <Link
              href="/forfaits"
              className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors border border-white/30"
            >
              Voir les forfaits
            </Link>
          </div>
          <p className="mt-6 text-green-200 text-sm">
            Forfaits à partir de 79$ · Livraison gratuite · Semaine supplémentaire 25$
          </p>
        </div>
      </section>

      {/* POURQUOI NOS BOITES */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Pourquoi choisir les boîtes réutilisables?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Fini le carton mouillé, les boîtes qui s&apos;effondrent et les tonnes de déchets.
              Voici pourquoi nos clients adorent BacExpress BSL.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {avantages.map((a) => (
              <div
                key={a.title}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-3">{a.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{a.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORFAITS APERCU */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Nos forfaits</h2>
            <p className="text-gray-500">1 semaine incluse · Semaine supplémentaire : 25$</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {forfaits.map((f) => (
              <div
                key={f.nom}
                className={`bg-white rounded-2xl p-6 border-t-4 ${f.couleur} shadow-sm hover:shadow-md transition-shadow relative`}
              >
                {f.badge && (
                  <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                    {f.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-800 mb-1">Forfait {f.nom}</h3>
                <p className="text-gray-500 text-sm mb-4">{f.description}</p>
                <div className="text-3xl font-extrabold text-gray-900 mb-1">
                  {f.prix}$
                </div>
                <div className="text-sm text-gray-400 mb-4">{f.boites} boîtes · 1 semaine</div>
                <Link
                  href={`/reservation?forfait=${f.slug}`}
                  className="block text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Choisir ce forfait
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/forfaits" className="text-green-600 hover:text-green-700 font-semibold underline">
              Voir tous les détails des forfaits →
            </Link>
          </div>
        </div>
      </section>

      {/* COMMENT CA MARCHE */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Comment ça marche?</h2>
            <p className="text-gray-500">Simple, rapide, efficace.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {[
              { step: "1", title: "Choisissez votre forfait", desc: "Studio, Appartement ou Maison selon vos besoins." },
              { step: "2", title: "On livre chez vous", desc: "Les boîtes arrivent propres et empilées avant votre déménagement." },
              { step: "3", title: "Déménagez!", desc: "Remplissez, transportez et videz vos boîtes à votre rythme." },
              { step: "4", title: "On vient récupérer", desc: "On passe chercher les boîtes. Rien à poster, rien à apporter." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white font-extrabold text-xl flex items-center justify-center mb-3 shadow">
                  {s.step}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 px-4 bg-green-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Prêt à déménager sans stress?</h2>
          <p className="text-green-100 mb-8">
            Réservez maintenant et recevez vos boîtes à la date qui vous convient.
            Service disponible à Rimouski, Matane, Mont-Joli et Rivière-du-Loup.
          </p>
          <Link
            href="/reservation"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-10 py-4 rounded-xl text-lg transition-colors shadow-lg"
          >
            Réserver mes boîtes maintenant
          </Link>
        </div>
      </section>
    </>
  );
}
