import { motion } from "framer-motion";
import { Sparkles, Search } from "lucide-react";
import type { DecisionMode } from "@/types";

interface FarmerDecisionCardProps {
  activeMode: DecisionMode;
  onSelect: (mode: DecisionMode) => void;
}

const OPTIONS: {
  mode: DecisionMode;
  title: string;
  description: string;
  icon: typeof Sparkles;
}[] = [
  {
    mode: "suggested",
    title: "Suggested Crops",
    description: "Let the soil and climate profile recommend what to grow.",
    icon: Sparkles,
  },
  {
    mode: "advisor",
    title: "Crop I Want to Grow",
    description: "Search a specific crop and check how well it fits here.",
    icon: Search,
  },
];

export function FarmerDecisionCard({
  activeMode,
  onSelect,
}: FarmerDecisionCardProps) {
  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      role="radiogroup"
      aria-label="Choose how you'd like to plan your crop"
    >
      {OPTIONS.map(({ mode, title, description, icon: Icon }) => {
        const active = activeMode === mode;
        return (
          <motion.button
            key={mode}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(mode)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
              active
                ? "border-primary bg-primary/5 shadow-tile-hover"
                : "border-accent/30 bg-surface hover:border-primary/50"
            }`}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                active ? "bg-primary text-white" : "bg-surface-alt text-primary"
              }`}
            >
              <Icon size={18} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-sm font-semibold text-ink">
                {title}
              </span>
              <span className="mt-0.5 block text-xs text-ink/60">
                {description}
              </span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
