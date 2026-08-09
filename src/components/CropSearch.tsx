import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { searchCrops } from "@/services/cropRecommendation";
import { SEARCH_DEBOUNCE_MS } from "@/utils/constants";
import type { CropRecord } from "@/types";

interface CropSearchProps {
  onSelect: (crop: CropRecord) => void;
}

export function CropSearch({ onSelect }: CropSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const listboxId = useId();
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS);

  const results = useMemo(() => searchCrops(debouncedQuery), [debouncedQuery]);

  function handleSelect(crop: CropRecord) {
    onSelect(crop);
    setQuery(crop.name);
    setOpen(false);
  }

  return (
    <div className="relative">
      <label htmlFor="crop-search" className="mb-1.5 block text-xs font-medium text-ink/70">
        Search for a crop
      </label>
      <div className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
          aria-hidden="true"
        />
        <input
          id="crop-search"
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          autoComplete="off"
          placeholder="e.g. Cotton, Rice, Chickpea…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          className="w-full rounded-lg border border-accent/40 bg-surface py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition focus:border-primary"
        />
      </div>

      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.ul
            id={listboxId}
            role="listbox"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute z-20 mt-1.5 max-h-56 w-full overflow-auto rounded-lg border border-accent/30 bg-surface shadow-tile-hover"
          >
            {results.map((crop) => (
              <li key={crop.id} role="option" aria-selected={false}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(crop)}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm hover:bg-surface-alt"
                >
                  <span aria-hidden="true">{crop.icon}</span>
                  {crop.name}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
        {open && debouncedQuery && results.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute z-20 mt-1.5 w-full rounded-lg border border-accent/30 bg-surface p-3 text-xs text-ink/60 shadow-tile"
          >
            No crop matches "{debouncedQuery}" — try another name.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
