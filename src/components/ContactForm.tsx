"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ nom: "", courriel: "", sujet: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-10 shadow text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Message envoyé!</h2>
        <p className="text-gray-600 text-sm">
          Nous avons reçu votre message et vous répondrons dans les 24 heures.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Envoyer un message</h2>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-3 mb-5 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nom-contact">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            id="nom-contact"
            name="nom"
            type="text"
            required
            value={form.nom}
            onChange={handleChange}
            placeholder="Votre nom"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="courriel-contact">
            Courriel <span className="text-red-500">*</span>
          </label>
          <input
            id="courriel-contact"
            name="courriel"
            type="email"
            required
            value={form.courriel}
            onChange={handleChange}
            placeholder="votre@courriel.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="sujet">
            Sujet <span className="text-red-500">*</span>
          </label>
          <select
            id="sujet"
            name="sujet"
            required
            value={form.sujet}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="">-- Choisir un sujet --</option>
            <option value="reservation">Réservation</option>
            <option value="info-forfait">Information sur les forfaits</option>
            <option value="disponibilite">Disponibilité</option>
            <option value="livraison">Livraison / Cueillette</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message-contact">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message-contact"
            name="message"
            rows={5}
            required
            value={form.message}
            onChange={handleChange}
            placeholder="Votre message..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors"
        >
          {loading ? "Envoi..." : "Envoyer le message"}
        </button>
      </form>
    </div>
  );
}
