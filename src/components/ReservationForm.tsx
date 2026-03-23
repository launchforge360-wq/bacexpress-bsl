"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi");
      setSubmitted(true);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer ou nous contacter directement.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-10 shadow text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Demande envoyée!</h2>
        <p className="text-gray-600">
          Merci {form.nom}! Nous avons bien reçu votre demande de réservation et nous vous
          contacterons dans les <strong>24 heures</strong> pour confirmer votre date.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Demande de réservation</h2>

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
            id="nom"
            name="nom"
            type="text"
            required
            value={form.nom}
            onChange={handleChange}
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
              id="telephone"
              name="telephone"
              type="tel"
              required
              value={form.telephone}
              onChange={handleChange}
              placeholder="418 xxx-xxxx"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="courriel">
              Courriel <span className="text-red-500">*</span>
            </label>
            <input
              id="courriel"
              name="courriel"
              type="email"
              required
              value={form.courriel}
              onChange={handleChange}
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
            id="adresse"
            name="adresse"
            type="text"
            required
            value={form.adresse}
            onChange={handleChange}
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
            id="ville"
            name="ville"
            required
            value={form.ville}
            onChange={handleChange}
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
            id="datesouhaitee"
            name="datesouhaitee"
            type="date"
            required
            value={form.datesouhaitee}
            onChange={handleChange}
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
            id="forfait"
            name="forfait"
            required
            value={form.forfait}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="">-- Choisir un forfait --</option>
            <option value="studio">Forfait Studio – 20 boîtes – 79$</option>
            <option value="appartement">Forfait Appartement – 35 boîtes – 109$</option>
            <option value="maison">Forfait Maison – 50 boîtes – 149$</option>
          </select>
        </div>

        {/* Semaines supp */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="semainessup">
            Semaines supplémentaires (25$ chacune)
          </label>
          <select
            id="semainessup"
            name="semainessup"
            value={form.semainessup}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="0">Aucune semaine supplémentaire</option>
            <option value="1">+1 semaine (+25$)</option>
            <option value="2">+2 semaines (+50$)</option>
            <option value="3">+3 semaines (+75$)</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
            Message ou précisions (optionnel)
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={form.message}
            onChange={handleChange}
            placeholder="Ex: appartement au 3e étage, code d'accès, heure préférée..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl text-lg transition-colors"
        >
          {loading ? "Envoi en cours..." : "Envoyer ma demande de réservation"}
        </button>

        <p className="text-xs text-gray-400 text-center">
          Nous vous contacterons dans les 24 heures pour confirmer votre réservation.
        </p>
      </form>
    </div>
  );
}

export default function ReservationForm() {
  return (
    <Suspense fallback={<div className="bg-white rounded-2xl p-8 shadow text-center text-gray-400">Chargement...</div>}>
      <ReservationFormInner />
    </Suspense>
  );
}
