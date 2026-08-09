import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { CropCard } from "@/components/CropCard";
import { allCrops } from "@/services/cropRecommendation";
import { ALL_SOIL_TYPES, getSoilColor } from "@/utils/soilColors";
import type { SoilType } from "@/types";

export default function CropDatabase() {
  const [query, setQuery] = useState("");
  const [soilFilter, setSoilFilter] = useState<SoilType | "All">("All");

  const filtered = useMemo(() => {
    return allCrops.filter((crop) => {
      const matchesQuery = crop.name.toLowerCase().includes(query.trim().toLowerCase());
      const matchesSoil = soilFilter === "All" || crop.suitableSoils.includes(soilFilter);
      return matchesQuery && matchesSoil;
    });
  }, [query, soilFilter]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <p className="data-readout text-xs uppercase tracking-widest text-primary">Reference</p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Crop Database
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink/60">
          Browse every crop in Project Bhumi's dataset — fertilizer plans,
          growing windows, expected yield, and the soils each one suits best.
        </p>
      </motion.div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" aria-hidden="true" />
          <input
            type="text"
            aria-label="Search crops by name"
            placeholder="Search crops…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-accent/40 bg-surface py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by soil type">
          <button
            type="button"
            onClick={() => setSoilFilter("All")}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              soilFilter === "All"
                ? "border-primary bg-primary text-white"
                : "border-accent/30 bg-surface text-ink/70 hover:border-primary/50"
            }`}
          >
            All soils
          </button>
          {ALL_SOIL_TYPES.map((soil) => (
            <button
              key={soil}
              type="button"
              onClick={() => setSoilFilter(soil)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                soilFilter === soil
                  ? "border-primary bg-primary text-white"
                  : "border-accent/30 bg-surface text-ink/70 hover:border-primary/50"
              }`}
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                style={{ background: soilFilter === soil ? "#fff" : getSoilColor(soil) }}
              />
              {soil}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-ink/50" role="status">
        {filtered.length} crop{filtered.length !== 1 ? "s" : ""} found
      </p>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((crop) => (
          <CropCard key={crop.id} crop={crop} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-accent/40 p-8 text-center text-sm text-ink/50">
          No crops match your filters. Try clearing the soil filter or search term.
        </div>
      )}
    </div>
  );
}
