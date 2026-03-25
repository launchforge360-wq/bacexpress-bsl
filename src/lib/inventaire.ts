/**
 * Inventaire simple — stocké en mémoire (par instance serverless).
 * Pour un vrai suivi persistant, connectez une base de données (ex: Vercel Postgres, Supabase).
 * Pour l'instant, les réservations sont tracées dans les logs Vercel et le dashboard Stripe.
 */

import { FORFAITS, type ForfaitId } from "@/config/forfaits";

const stock: Record<string, number> = {};

function getStock(forfaitId: ForfaitId): number {
  if (stock[forfaitId] === undefined) {
    stock[forfaitId] = FORFAITS[forfaitId].inventaireInitial;
  }
  return stock[forfaitId];
}

export async function getInventaire(forfaitId: ForfaitId): Promise<number> {
  return getStock(forfaitId);
}

export async function decrementerInventaire(forfaitId: ForfaitId): Promise<number> {
  const actuel = getStock(forfaitId);
  if (actuel > 0) stock[forfaitId] = actuel - 1;
  return stock[forfaitId];
}

export async function setInventaire(forfaitId: ForfaitId, quantite: number): Promise<void> {
  stock[forfaitId] = quantite;
}
