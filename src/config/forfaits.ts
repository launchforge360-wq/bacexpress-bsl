// ============================================================
// CONFIGURATION DES FORFAITS - MODIFIEZ ICI POUR CHANGER LES PRIX
// ============================================================

export const FORFAITS = {
  studio: {
    id: "studio",
    nom: "Forfait Studio",
    boites: 20,
    semaines: 1,
    prix: 79,          // <-- Changer le prix ici (en dollars CAD)
    description: "20 boîtes réutilisables • 1 semaine • Livraison et cueillette incluses",
    inventaireInitial: 5, // Nombre de forfaits disponibles en même temps
  },
  appartement: {
    id: "appartement",
    nom: "Forfait Appartement",
    boites: 35,
    semaines: 1,
    prix: 109,         // <-- Changer le prix ici
    description: "35 boîtes réutilisables • 1 semaine • Livraison et cueillette incluses",
    inventaireInitial: 5,
  },
  maison: {
    id: "maison",
    nom: "Forfait Maison",
    boites: 50,
    semaines: 1,
    prix: 149,         // <-- Changer le prix ici
    description: "50 boîtes réutilisables • 1 semaine • Livraison et cueillette incluses",
    inventaireInitial: 3,
  },
} as const;

export type ForfaitId = keyof typeof FORFAITS;

// Prix d'une semaine supplémentaire (en dollars CAD)
export const SEMAINE_SUP_PRIX = 25; // <-- Changer ici

// ============================================================
