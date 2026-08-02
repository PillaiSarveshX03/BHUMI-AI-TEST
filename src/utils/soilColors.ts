import soilData from "@/data/soil.json";
import type { SoilProfile, SoilType } from "@/types";

const soilProfiles = soilData as SoilProfile[];

const soilMap = new Map<SoilType, SoilProfile>(
  soilProfiles.map((profile) => [profile.type, profile])
);

/** Returns the full soil profile (color, gradient, description) for a soil type. */
export function getSoilProfile(type: SoilType): SoilProfile {
  const profile = soilMap.get(type);
  if (!profile) {
    // Falls back to a neutral profile rather than throwing, so a bad
    // or future soil type never breaks the map render.
    return {
      type,
      color: "#9CA3AF",
      gradientFrom: "#B4B9BF",
      gradientTo: "#6B7280",
      description: "No profile data available yet for this soil type.",
    };
  }
  return profile;
}

export function getSoilColor(type: SoilType): string {
  return getSoilProfile(type).color;
}

export function getSoilGradient(type: SoilType): string {
  const profile = getSoilProfile(type);
  return `linear-gradient(135deg, ${profile.gradientFrom}, ${profile.gradientTo})`;
}

export const ALL_SOIL_TYPES: SoilType[] = soilProfiles.map((p) => p.type);
