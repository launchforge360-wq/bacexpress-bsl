"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FORFAITS, SEMAINE_SUP_PRIX } from "@/config/forfaits";

const FORFAIT_OPTIONS = [
  { value: "studio", label: `Forfait Studio – ${FORFAITS.studio.boites} boîtes – ${FORFAITS.studio.prix}$` },
  { value: "appartement", label: `Forfait Appartement – ${FORFAITS.appartement.boites} boîtes – ${FORFAITS.appartement.prix}$` },
  { value: "maison", label: `Forfait Maison – ${FORFAITS.maison.boites} boîtes – ${FORFAITS.maison.prix}$` },
];

function getPrixTotal(forfaitId: string, semainessup: string): number {
  const f = FORFAITS[forfaitId as keyof typeof FORFAITS];
  if (!f) return 0;
  return f.prix + Number(semainessup) * SEMAINE_SUP_PRIX;
}

function ReservationFormInner() {
  const searchParams = useSearchParams();
  const forfaitParam = searchParams.get("forfait") || "";

  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    courriel: "",
    adresse: "",
    ville: "",
    datesouhaitee: "",
    forfait: forfaitParam,
    semainessup: "0",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          forfaitId: form.forfait,
          semainessup: Number(form.semainessup),
          nom: form.nom,
          courriel: form.courriel,
          telephone: form.telephone,
          adresse: form.adresse,
          ville: form.ville,
          datesouhaitee: form.datesouhaitee,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue.");
        return;
      }

      // Redirection vers Stripe Checkout
      window.location.href = data.url;
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const prixTotal = getPrixTotal(form.forfait, form.semainessup);

  return (
    <div className="bg-white rounded-2xl p-8 shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Réserver et payer en ligne</h2>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-3 mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nom">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            id="nom" name="nom" type="text" required
            value={form.nom} onChange={handleChange}
            placeholder="Jean Tremblay"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Téléphone + Courriel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="telephone">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <input
              id="telephone" name="telephone" type="tel" required
              value={form.telephone} onChange={handleChange}
              placeholder="418 xxx-xxxx"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="courriel">
              Courriel <span className="text-red-500">*</span>
            </label>
            <input
              id="courriel" name="courriel" type="email" required
              value={form.courriel} onChange={handleChange}
              placeholder="jean@exemple.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Adresse */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="adresse">
            Adresse de livraison <span className="text-red-500">*</span>
          </label>
          <input
            id="adresse" name="adresse" type="text" required
            value={form.adresse} onChange={handleChange}
            placeholder="123 rue Principale"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Ville */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="ville">
            Ville <span className="text-red-500">*</span>
          </label>
          <select
            id="ville" name="ville" required
            value={form.ville} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="">-- Choisir une ville --</option>
            <option value="Rimouski">Rimouski</option>
            <option value="Matane">Matane</option>
            <option value="Mont-Joli">Mont-Joli</option>
            <option value="Rivière-du-Loup">Rivière-du-Loup</option>
          </select>
        </div>

        {/* Date souhaitée */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="datesouhaitee">
            Date de livraison souhaitée <span className="text-red-500">*</span>
          </label>
          <input
            id="datesouhaitee" name="datesouhaitee" type="date" required
            value={form.datesouhaitee} onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Forfait */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="forfait">
            Forfait <span className="text-red-500">*</span>
          </label>
          <select
            id="forfait" name="forfait" required
            value={form.forfait} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="">-- Choisir un forfait --</option>
            {FORFAIT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Semaines supp */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="semainessup">
            Semaines supplémentaires ({SEMAINE_SUP_PRIX}$ chacune)
          </label>
          <select
            id="semainessup" name="semainessup"
            value={form.semainessup} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="0">Aucune semaine supplémentaire</option>
            <option value="1">+1 semaine (+{SEMAINE_SUP_PRIX}$)</option>
            <option value="2">+2 semaines (+{SEMAINE_SUP_PRIX * 2}$)</option>
            <option value="3">+3 semaines (+{SEMAINE_SUP_PRIX * 3}$)</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
            Message ou précisions (optionnel)
          </label>
          <textarea
            id="message" name="message" rows={3}
            value={form.message} onChange={handleChange}
            placeholder="Ex: appartement au 3e étage, code d'accès, heure préférée..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>

        {/* Récapitulatif prix */}
        {prixTotal > 0 && (
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <span className="text-green-800 font-medium">Total à payer</span>
              <span className="text-2xl font-extrabold text-green-700">{prixTotal}$</span>
            </div>
            <p className="text-green-600 text-xs mt-1">Paiement sécurisé via Stripe · TPS/TVQ incluses</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !form.forfait}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <span>Redirection vers le paiement...</span>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Payer {prixTotal > 0 ? `${prixTotal}$` : ""} en ligne
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Paiement 100% sécurisé par Stripe
        </div>
      </form>
    </div>
  );
}

export default function ReservationForm() {
  return (
    <Suspense fallback={
      <div className="bg-white rounded-2xl p-8 shadow text-center text-gray-400">
        Chargement...
      </div>
    }>
      <ReservationFormInner />
    </Suspense>
  );
}
