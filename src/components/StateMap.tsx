import { motion } from "framer-motion";
import { ArrowLeft, MapPinned, Droplets, Thermometer } from "lucide-react";
import { Tooltip } from "@/components/Tooltip";
import { useMapData } from "@/hooks/useMapData";
import { getSoilColor, getSoilGradient } from "@/utils/soilColors";
import type { DistrictRecord, StateRecord, ViewMode } from "@/types";

interface StateMapProps {
  state: StateRecord;
  viewMode: ViewMode;
  onBack: () => void;
  onSelectDistrict: (district: DistrictRecord) => void;
}

export function StateMap({
  state,
  viewMode,
  onBack,
  onSelectDistrict,
}: StateMapProps) {
  const { getDistrictsForState, getRainfall, getClimate } = useMapData();
  const districts = getDistrictsForState(state.id);

  const maxRow = districts.length
    ? Math.max(...districts.map((d) => d.row)) + 1
    : 1;
  const maxCol = districts.length
    ? Math.max(...districts.map((d) => d.col)) + 1
    : 1;

  return (
    <div
      className="sensor-field relative w-full overflow-hidden rounded-2xl border border-accent/30 p-4 sm:p-6"
      role="group"
      aria-label={`District map of ${state.name}`}
    >
      <header className="mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-surface px-3 py-1.5 text-xs font-medium text-primary transition hover:bg-primary hover:text-white"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to India
        </button>
        <div className="text-right">
          <p className="font-display text-sm font-semibold">{state.name}</p>
          <p className="data-readout text-[11px] text-ink/50">
            Capital: {state.capital}
          </p>
        </div>
      </header>

      {districts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-accent/50 bg-surface/60 p-8 text-center">
          <MapPinned className="mx-auto mb-3 text-accent" size={28} aria-hidden="true" />
          <p className="font-display text-sm font-medium text-ink">
            District-level data for {state.name} is still being digitized
          </p>
          <p className="mx-auto mt-2 max-w-sm text-xs text-ink/60">
            You can still continue with the state-level soil profile below —
            it's already loaded into the Farmer Decision Panel.
          </p>
        </div>
      ) : (
        <div
          className="grid gap-2 sm:gap-3"
          style={{
            gridTemplateColumns: `repeat(${maxCol}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${maxRow}, minmax(0, 1fr))`,
          }}
        >
          {districts.map((district) => {
            const isSoil = viewMode === "soil";
            const rainfall = getRainfall(district.id);
            const climate = getClimate(district.id);
            return (
              <div
                key={district.id}
                style={{ gridColumn: district.col + 1, gridRow: district.row + 1 }}
              >
                <Tooltip
                  content={
                    <div>
                      <p className="font-display text-sm font-semibold text-ink">
                        {district.name}
                      </p>
                      <p className="data-readout mt-1 text-[11px] uppercase tracking-wide text-primary">
                        Soil: {district.dominantSoil}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-ink/70">
                        <Droplets size={11} aria-hidden="true" /> {rainfall} mm/yr
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-ink/70">
                        <Thermometer size={11} aria-hidden="true" /> {climate}
                      </p>
                    </div>
                  }
                >
                  <motion.button
                    type="button"
                    aria-label={`${district.name}. Dominant soil: ${district.dominantSoil}. Select to load into the decision panel.`}
                    onClick={() => onSelectDistrict(district)}
                    whileHover={{ scale: 1.08, zIndex: 10 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="group relative flex aspect-square w-full min-w-[44px] flex-col items-center justify-center gap-0.5 overflow-hidden rounded-lg border text-center shadow-tile transition-shadow hover:shadow-tile-hover focus-visible:shadow-tile-hover"
                    style={{
                      borderColor: isSoil
                        ? getSoilColor(district.dominantSoil)
                        : "#81C784",
                      background: isSoil
                        ? getSoilGradient(district.dominantSoil)
                        : "#FFFFFF",
                    }}
                  >
                    <span
                      className={`data-readout px-0.5 text-[9px] font-medium leading-tight sm:text-[10px] ${
                        isSoil ? "text-white drop-shadow" : "text-ink"
                      }`}
                    >
                      {district.name}
                    </span>
                  </motion.button>
                </Tooltip>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
