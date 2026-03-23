"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-green-600 text-white font-bold text-xl px-3 py-1 rounded-lg">
            BAC
          </div>
          <span className="font-bold text-xl text-gray-800">
            Express <span className="text-green-600">BSL</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
            Accueil
          </Link>
          <Link href="/forfaits" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
            Forfaits
          </Link>
          <Link href="/villes" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
            Villes desservies
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
            Contact
          </Link>
          <Link
            href="/reservation"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            Réserver
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4 flex flex-col gap-3">
          <Link href="/" className="text-gray-700 py-2 font-medium" onClick={() => setMenuOpen(false)}>Accueil</Link>
          <Link href="/forfaits" className="text-gray-700 py-2 font-medium" onClick={() => setMenuOpen(false)}>Forfaits</Link>
          <Link href="/villes" className="text-gray-700 py-2 font-medium" onClick={() => setMenuOpen(false)}>Villes desservies</Link>
          <Link href="/contact" className="text-gray-700 py-2 font-medium" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link
            href="/reservation"
            className="bg-green-600 text-white font-semibold px-5 py-2 rounded-lg text-center"
            onClick={() => setMenuOpen(false)}
          >
            Réserver
          </Link>
        </div>
      )}
    </header>
  );
}
