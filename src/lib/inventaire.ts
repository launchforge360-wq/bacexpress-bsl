/**
 * Gestion de l'inventaire via Vercel KV (Redis).
 * En développement local, un fallback en mémoire est utilisé.
 *
 * Pour activer en production :
 * 1. Allez sur vercel.com → votre projet → Storage → Create KV Database
 * 2. Copiez les variables KV_URL, KV_REST_API_URL, KV_REST_API_TOKEN dans Vercel
 * 3. Localement : vercel env pull .env.local
 */

import { FORFAITS, type ForfaitId } from "@/config/forfaits";

// Fallback mémoire (dev uniquement — ne persiste pas entre requêtes)
const memoryInventaire: Record<string, number> = {};

async function getKV() {
  try {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null;
    const { kv } = await import("@vercel/kv");
    return kv;
  } catch {
    return null;
  }
}

export async function getInventaire(forfaitId: ForfaitId): Promise<number> {
  const kv = await getKV();
  const key = `inventaire:${forfaitId}`;

  if (kv) {
    const val = await kv.get<number>(key);
    if (val === null) {
      // Initialiser si première fois
      const initial = FORFAITS[forfaitId].inventaireInitial;
      await kv.set(key, initial);
      return initial;
    }
    return val;
  }

  // Fallback mémoire
  if (memoryInventaire[key] === undefined) {
    memoryInventaire[key] = FORFAITS[forfaitId].inventaireInitial;
  }
  return memoryInventaire[key];
}

export async function decrementerInventaire(forfaitId: ForfaitId): Promise<number> {
  const kv = await getKV();
  const key = `inventaire:${forfaitId}`;

  if (kv) {
    const actuel = await getInventaire(forfaitId);
    if (actuel <= 0) return 0;
    const nouveau = await kv.decr(key);
    return nouveau;
  }

  // Fallback mémoire
  const actuel = await getInventaire(forfaitId);
  if (actuel <= 0) return 0;
  memoryInventaire[key] = actuel - 1;
  return memoryInventaire[key];
}

export async function setInventaire(forfaitId: ForfaitId, quantite: number): Promise<void> {
  const kv = await getKV();
  const key = `inventaire:${forfaitId}`;

  if (kv) {
    await kv.set(key, quantite);
    return;
  }
  memoryInventaire[key] = quantite;
}
