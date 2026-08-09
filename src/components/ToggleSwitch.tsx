import { motion } from "framer-motion";
import type { ViewMode } from "@/types";

interface ToggleSwitchProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ToggleSwitch({ viewMode, onChange }: ToggleSwitchProps) {
  const isSoil = viewMode === "soil";

  return (
    <div className="flex items-center gap-3">
      <span
        className={`text-xs font-medium ${!isSoil ? "text-primary" : "text-ink/40"}`}
      >
        Political
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isSoil}
        aria-label="Toggle between political view and soil view"
        onClick={() => onChange(isSoil ? "political" : "soil")}
        className="relative h-7 w-14 rounded-full border border-accent/50 bg-surface-alt p-0.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="block h-6 w-6 rounded-full bg-primary shadow-tile"
          style={{ marginLeft: isSoil ? "calc(100% - 1.5rem)" : 0 }}
        />
      </button>
      <span
        className={`text-xs font-medium ${isSoil ? "text-primary" : "text-ink/40"}`}
      >
        Soil
      </span>
    </div>
  );
}
