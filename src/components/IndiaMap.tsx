import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Layers } from "lucide-react";
import { Tooltip } from "@/components/Tooltip";
import { useMapData } from "@/hooks/useMapData";
import { getSoilColor, getSoilGradient } from "@/utils/soilColors";
import type { StateRecord, ViewMode } from "@/types";

interface IndiaMapProps {
  viewMode: ViewMode;
  onSelectState: (state: StateRecord) => void;
}

export function IndiaMap({ viewMode, onSelectState }: IndiaMapProps) {
  const { states } = useMapData();
  const [rippleId, setRippleId] = useState<string | null>(null);

  const maxRow = Math.max(...states.map((s) => s.row)) + 1;
  const maxCol = Math.max(...states.map((s) => s.col)) + 1;

  function handleSelect(state: StateRecord) {
    setRippleId(state.id);
    window.setTimeout(() => setRippleId(null), 600);
    onSelectState(state);
  }

  return (
    <div
      className="sensor-field relative w-full overflow-hidden rounded-2xl border border-accent/30 p-4 sm:p-6"
      role="group"
      aria-label="Interactive map of India states"
    >
      <header className="mb-4 flex items-center justify-between">
        <div className="data-readout flex items-center gap-2 text-xs text-primary-dark">
          <Layers size={14} aria-hidden="true" />
          <span>
            {viewMode === "political" ? "VIEW: POLITICAL" : "VIEW: SOIL COMPOSITION"}
          </span>
        </div>
        <span className="data-readout text-xs text-ink/40">
          {states.length} states · schematic index
        </span>
      </header>

      <div
        className="grid gap-2 sm:gap-3"
        style={{
          gridTemplateColumns: `repeat(${maxCol}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${maxRow}, minmax(0, 1fr))`,
        }}
      >
        {states.map((state) => {
          const isSoil = viewMode === "soil";
          return (
            <div
              key={state.id}
              style={{
                gridColumn: state.col + 1,
                gridRow: state.row + 1,
              }}
            >
              <Tooltip
                content={
                  <div>
                    <p className="font-display text-sm font-semibold text-ink">
                      {state.name}
                    </p>
                    <p className="data-readout mt-1 text-[11px] uppercase tracking-wide text-primary">
                      Soil: {state.dominantSoil}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-ink/70">
                      {state.soilDescription}
                    </p>
                  </div>
                }
              >
                <motion.button
                  type="button"
                  aria-label={`${state.name}. Dominant soil: ${state.dominantSoil}. Activate to view districts.`}
                  onClick={() => handleSelect(state)}
                  whileHover={{ scale: 1.08, zIndex: 10 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="group relative flex aspect-square w-full min-w-[44px] flex-col items-center justify-center gap-0.5 overflow-hidden rounded-lg border text-center shadow-tile transition-shadow hover:shadow-tile-hover focus-visible:shadow-tile-hover"
                  style={{
                    borderColor: isSoil ? getSoilColor(state.dominantSoil) : "#81C784",
                    background: isSoil
                      ? getSoilGradient(state.dominantSoil)
                      : "#FFFFFF",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1/3 -translate-y-full bg-white/25 opacity-0 transition-opacity duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:animate-scan"
                  />
                  {rippleId === state.id && (
                    <span
                      aria-hidden="true"
                      className="absolute h-6 w-6 rounded-full bg-primary/40 animate-ripple"
                    />
                  )}
                  <MapPin
                    size={12}
                    className={isSoil ? "text-white/90" : "text-primary"}
                    aria-hidden="true"
                  />
                  <span
                    className={`data-readout px-0.5 text-[9px] font-medium leading-tight sm:text-[10px] ${
                      isSoil ? "text-white drop-shadow" : "text-ink"
                    }`}
                  >
                    {state.name.length > 12
                      ? `${state.name.slice(0, 10)}…`
                      : state.name}
                  </span>
                </motion.button>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
}
