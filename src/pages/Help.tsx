import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How do I read the map?",
    a: "Each tile is a state. Hover or focus it to see its name, dominant soil type, and a short description. Click or press Enter to zoom into that state's districts, where available.",
  },
  {
    q: "Why do some states not zoom into districts?",
    a: "District-level data is currently populated for ten states as a working sample. Other states still show their state-level soil profile, and you can continue straight to the Farmer Decision Panel with that.",
  },
  {
    q: "What's the difference between Political View and Soil View?",
    a: "Political View shows plain state or district outlines. Soil View recolors every tile with a gradient matched to its dominant soil type, using the same six categories as the legend.",
  },
  {
    q: "How are suggested crops chosen?",
    a: "Suggested Crops ranks every crop in the database whose suitable-soil list includes the selected location's dominant soil, then scores each one for suitability. It's a transparent, rule-based stand-in for the AI recommendation engine planned for a future release.",
  },
  {
    q: "Can I check a specific crop instead?",
    a: "Yes — choose 'Crop I Want to Grow' in the Farmer Decision Panel, search for any crop by name, and you'll see its suitability for the selected location along with fertilizer, timing, and yield guidance.",
  },
  {
    q: "Is the agronomic data accurate enough to farm by?",
    a: "No — figures here are representative samples meant to demonstrate the interface, not verified agricultural guidance. Always confirm with your local agricultural extension office before making planting decisions.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-accent/20 py-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="font-display text-sm font-medium text-ink">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-primary" aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pt-2 text-xs leading-relaxed text-ink/60">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Help() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <p className="data-readout text-xs uppercase tracking-widest text-primary">Help</p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Frequently asked questions
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          Everything you need to make sense of the map and the crop workflows.
        </p>
      </motion.div>

      <div className="mt-6 rounded-2xl border border-accent/30 bg-surface p-4 sm:p-6">
        {FAQS.map((faq) => (
          <FaqItem key={faq.q} q={faq.q} a={faq.a} />
        ))}
      </div>
    </div>
  );
}
