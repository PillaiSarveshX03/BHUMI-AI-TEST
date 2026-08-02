import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Sprout } from "lucide-react";
import { FarmerDecisionCard } from "@/components/FarmerDecisionCard";
import { CropSearch } from "@/components/CropSearch";
import { CropCard } from "@/components/CropCard";
import { useMapContext } from "@/context/MapContext";
import { getSuggestedCrops, getCropSuitability } from "@/services/cropRecommendation";
import type { CropRecord, DecisionMode } from "@/types";

export function InfoPanel() {
  const { selectedState, selectedDistrict } = useMapContext();
  const [mode, setMode] = useState<DecisionMode>(null);
  const [chosenCrop, setChosenCrop] = useState<CropRecord | null>(null);

  const dominantSoil = selectedDistrict?.dominantSoil ?? selectedState?.dominantSoil;
  const locationLabel = selectedDistrict?.name ?? selectedState?.name ?? "";

  const suggested = dominantSoil ? getSuggestedCrops(dominantSoil) : [];
  const advisorResult =
    dominantSoil && chosenCrop
      ? getCropSuitability(chosenCrop, dominantSoil)
      : null;

  return (
    <section
      className="rounded-2xl border border-accent/30 bg-surface p-4 sm:p-6"
      aria-labelledby="farmer-decision-heading"
    >
      <h2 id="farmer-decision-heading" className="font-display text-base font-semibold text-ink">
        Farmer Decision Panel
      </h2>
      <p className="mt-1 text-xs text-ink/60">
        Pick a state (and district, where available) on the map — the fields
        below fill in automatically.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="field-state" className="mb-1.5 block text-xs font-medium text-ink/70">
            State
          </label>
          <div
            id="field-state"
            className="flex items-center gap-2 rounded-lg border border-accent/30 bg-surface-alt px-3 py-2.5 text-sm text-ink"
          >
            <MapPin size={14} className="text-primary" aria-hidden="true" />
            {selectedState?.name ?? (
              <span className="text-ink/40">Select a state on the map</span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="field-district" className="mb-1.5 block text-xs font-medium text-ink/70">
            District
          </label>
          <div
            id="field-district"
            className="flex items-center gap-2 rounded-lg border border-accent/30 bg-surface-alt px-3 py-2.5 text-sm text-ink"
          >
            <MapPin size={14} className="text-primary" aria-hidden="true" />
            {selectedDistrict?.name ?? (
              <span className="text-ink/40">Select a district, if available</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <FarmerDecisionCard activeMode={mode} onSelect={setMode} />
      </div>

      <AnimatePresence mode="wait">
        {!selectedState && mode && (
          <motion.p
            key="no-location"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-lg bg-surface-alt p-3 text-xs text-ink/60"
          >
            Pick a state on the map above first, so recommendations can be
            matched to its soil profile.
          </motion.p>
        )}

        {selectedState && mode === "suggested" && (
          <motion.div
            key="suggested"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-5"
          >
            <p className="mb-3 flex items-center gap-1.5 text-xs font-medium text-ink/70">
              <Sprout size={14} className="text-primary" aria-hidden="true" />
              Recommended for {locationLabel} ({dominantSoil} soil)
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {suggested.map((crop, i) => (
                <CropCard
                  key={crop.id}
                  crop={crop}
                  score={crop.suitabilityScore}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        )}

        {selectedState && mode === "advisor" && (
          <motion.div
            key="advisor"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-5"
          >
            <CropSearch onSelect={setChosenCrop} />
            {chosenCrop && advisorResult && (
              <div className="mt-4">
                <CropCard
                  crop={chosenCrop}
                  score={advisorResult.score}
                  suitable={advisorResult.suitable}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
