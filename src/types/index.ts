export type SoilType =
  | "Black"
  | "Red"
  | "Laterite"
  | "Sandy"
  | "Alluvial"
  | "Mountain";

export type ViewMode = "political" | "soil";

export type WaterRequirement = "Low" | "Medium" | "High";

export type Season = "Kharif" | "Rabi" | "Zaid" | "Perennial";

export interface StateRecord {
  id: string;
  name: string;
  capital: string;
  row: number;
  col: number;
  dominantSoil: SoilType;
  soilDescription: string;
  hasDistrictData: boolean;
}

export interface SoilProfile {
  type: SoilType;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  description: string;
}

export interface DistrictRecord {
  id: string;
  stateId: string;
  name: string;
  row: number;
  col: number;
  dominantSoil: SoilType;
}

export interface RainfallRecord {
  districtId: string;
  annualRainfallMm: number;
}

export interface ClimateRecord {
  districtId: string;
  climateZone: string;
}

export interface CropRecord {
  id: string;
  name: string;
  icon: string;
  suitableSoils: SoilType[];
  waterRequirement: WaterRequirement;
  season: Season;
  growingMonths: string;
  expectedYield: string;
  fertilizerRecommendation: string;
  challenges: string[];
}

export interface SuggestedCrop extends CropRecord {
  suitabilityScore: number;
}

export interface SelectedLocation {
  state: StateRecord | null;
  district: DistrictRecord | null;
}

export type DecisionMode = "suggested" | "advisor" | null;
