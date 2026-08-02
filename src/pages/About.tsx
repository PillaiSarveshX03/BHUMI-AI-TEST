import { motion } from "framer-motion";
import { Satellite, Sprout, Radar, Cpu } from "lucide-react";

const PILLARS = [
  {
    icon: Sprout,
    title: "Soil-first",
    body: "Every recommendation starts from the ground — dominant soil type, texture, and how it holds water — rather than generic seasonal averages.",
  },
  {
    icon: Radar,
    title: "Region-aware",
    body: "State and district views let a farmer zoom from a national picture down to conditions specific to their own block.",
  },
  {
    icon: Satellite,
    title: "Built to extend",
    body: "The data layer is modular by design, so weather feeds, satellite imagery, and live soil sensors can slot in without reworking the interface.",
  },
  {
    icon: Cpu,
    title: "AI-ready",
    body: "The Crop Advisor and Suggested Crops workflows already run on a scoring engine — the seam for a full LLM-driven assistant is in place.",
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <p className="data-readout text-xs uppercase tracking-widest text-primary">About</p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          A map that thinks like a farmer, not a tourist
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink/70">
          Project Bhumi ("bhumi" — land, in Sanskrit and most Indian
          languages) is a concept agricultural intelligence platform. It
          treats the map as a working instrument rather than a picture:
          hover a region and get its soil profile, drill into a district and
          get rainfall and climate on top of that, then hand the whole
          reading straight to a crop-planning workflow. The intent, in the
          spirit of ISRO Bhuvan and consumer mapping tools like Google Maps,
          is to make regional agronomy legible at a glance.
        </p>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PILLARS.map(({ icon: Icon, title, body }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="rounded-xl border border-accent/30 bg-surface-alt p-4"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
              <Icon size={18} aria-hidden="true" />
            </span>
            <h2 className="mt-3 font-display text-sm font-semibold text-ink">{title}</h2>
            <p className="mt-1 text-xs leading-relaxed text-ink/60">{body}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-dashed border-accent/40 bg-surface p-5">
        <h2 className="font-display text-sm font-semibold text-ink">Where this is heading</h2>
        <p className="mt-2 text-xs leading-relaxed text-ink/60">
          The current build runs entirely on curated sample data for a
          representative set of states and districts. The next milestones —
          already scaffolded in <code className="rounded bg-surface-alt px-1 py-0.5">src/services/api.ts</code> —
          are a FastAPI + PostgreSQL backend, a live weather feed, satellite
          imagery layers, IoT soil-sensor readings, and an LLM chatbot that
          can answer follow-up questions in a farmer's own words.
        </p>
      </div>
    </div>
  );
}
