import { motion } from "framer-motion";
import { CloudRain, Satellite, Radio, Bot, Map, Sprout, Layers } from "lucide-react";
import indiaData from "@/data/india.json";
import districtsData from "@/data/districts.json";
import { allCrops } from "@/services/cropRecommendation";
import { ALL_SOIL_TYPES } from "@/utils/soilColors";

const STATS = [
  { icon: Map, label: "States mapped", value: indiaData.length },
  { icon: Layers, label: "Districts digitized", value: districtsData.length },
  { icon: Sprout, label: "Crops in database", value: allCrops.length },
  { icon: Radio, label: "Soil types tracked", value: ALL_SOIL_TYPES.length },
];

const UPCOMING = [
  {
    icon: CloudRain,
    title: "Live weather feed",
    body: "Short-range forecasts per district, layered over the current rainfall and climate data.",
  },
  {
    icon: Satellite,
    title: "Satellite imagery",
    body: "NDVI and crop-health overlays sourced from ISRO Bhuvan-style imagery providers.",
  },
  {
    icon: Radio,
    title: "Soil sensor network",
    body: "Real-time moisture and pH readings from field-deployed IoT sensors, where available.",
  },
  {
    icon: Bot,
    title: "LLM farmer assistant",
    body: "A chat-based assistant for follow-up questions, building on the same recommendation engine.",
  },
];

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <p className="data-readout text-xs uppercase tracking-widest text-primary">Dashboard</p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Platform overview
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink/60">
          A snapshot of what's loaded today, and what the next integration
          phase adds on top of it.
        </p>
      </motion.div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map(({ icon: Icon, label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="rounded-xl border border-accent/30 bg-surface-alt p-4"
          >
            <Icon size={16} className="text-primary" aria-hidden="true" />
            <p className="data-readout mt-2 text-2xl font-semibold text-ink">{value}</p>
            <p className="mt-0.5 text-[11px] text-ink/60">{label}</p>
          </motion.div>
        ))}
      </div>

      <h2 className="mt-10 font-display text-base font-semibold text-ink">
        Coming online next
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {UPCOMING.map(({ icon: Icon, title, body }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex items-start gap-3 rounded-xl border border-dashed border-accent/40 bg-surface p-4"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-alt text-primary">
              <Icon size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-ink">{title}</p>
              <p className="mt-1 text-xs text-ink/60">{body}</p>
              <span className="mt-2 inline-block rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-medium text-primary-dark">
                Planned
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
