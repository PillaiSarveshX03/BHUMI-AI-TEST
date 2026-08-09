import cropsRaw from "@/data/crops.json";
import type { CropRecord, SoilType, SuggestedCrop } from "@/types";

const crops = cropsRaw as CropRecord[];

/**
 * Small stable hash so each crop gets a consistent-but-varied score
 * offset instead of every match tying at the same number. Deterministic
 * on purpose — no Math.random() — so the same district always returns
 * the same ranking.
 */
function stableOffset(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 17;
  }
  return hash;
}

/**
 * Ranks crops for a given dominant soil type.
 *
 * This is a transparent, rule-based stand-in for the "AI recommendation
 * engine" described in the project spec. It lives behind its own module
 * on purpose: swap this implementation for a call to
 * `services/api.ts -> askFarmerAssistant` (or a dedicated
 * `/recommendations` endpoint) once the backend exists, and every screen
 * that calls `getSuggestedCrops` keeps working unchanged.
 */
export function getSuggestedCrops(soil: SoilType): SuggestedCrop[] {
  const matches = crops.filter((crop) => crop.suitableSoils.includes(soil));

  return matches
    .map((crop) => {
      const primaryMatch = crop.suitableSoils[0] === soil;
      const base = primaryMatch ? 82 : 74;
      const score = Math.min(99, base + stableOffset(crop.id + soil));
      return { ...crop, suitabilityScore: score };
    })
    .sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}

export function searchCrops(query: string): CropRecord[] {
  const q = query.trim().toLowerCase();
  if (!q) return crops;
  return crops.filter((crop) => crop.name.toLowerCase().includes(q));
}

export function getCropById(id: string): CropRecord | undefined {
  return crops.find((crop) => crop.id === id);
}

/** Suitability of a specific crop against a given soil, for the Crop Advisor workflow. */
export function getCropSuitability(
  crop: CropRecord,
  soil: SoilType
): { suitable: boolean; score: number } {
  const suitable = crop.suitableSoils.includes(soil);
  const score = suitable
    ? Math.min(99, 82 + stableOffset(crop.id + soil))
    : Math.max(20, 45 - stableOffset(crop.id + soil));
  return { suitable, score };
}

export const allCrops = crops;
