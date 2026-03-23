import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-green-600 text-white font-bold text-lg px-2 py-1 rounded">BAC</div>
            <span className="font-bold text-lg text-white">Express BSL</span>
          </div>
          <p className="text-sm leading-relaxed">
            Location de boîtes de déménagement réutilisables au Bas-Saint-Laurent.
            Livraison et cueillette incluses dans tous nos forfaits.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-green-400 transition-colors">Accueil</Link></li>
            <li><Link href="/forfaits" className="hover:text-green-400 transition-colors">Forfaits</Link></li>
            <li><Link href="/villes" className="hover:text-green-400 transition-colors">Villes desservies</Link></li>
            <li><Link href="/reservation" className="hover:text-green-400 transition-colors">Réservation</Link></li>
            <li><Link href="/contact" className="hover:text-green-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h3 className="text-white font-semibold mb-3">Zones desservies</h3>
          <ul className="space-y-1 text-sm">
            <li>Rimouski</li>
            <li>Matane</li>
            <li>Mont-Joli</li>
            <li>Rivière-du-Loup</li>
          </ul>
          <div className="mt-4">
            <Link
              href="/reservation"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Réserver maintenant
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} BacExpress BSL. Tous droits réservés. | boitededemenagement.ca
      </div>
    </footer>
  );
}
