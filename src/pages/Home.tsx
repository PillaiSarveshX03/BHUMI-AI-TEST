import { AnimatePresence, motion } from "framer-motion";
import { IndiaMap } from "@/components/IndiaMap";
import { StateMap } from "@/components/StateMap";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { SoilLegend } from "@/components/SoilLegend";
import { InfoPanel } from "@/components/InfoPanel";
import { useMapContext } from "@/context/MapContext";
import { getSoilColor } from "@/utils/soilColors";

export default function Home() {
  const {
    viewMode,
    setViewMode,
    selectedState,
    selectedDistrict,
    selectState,
    selectDistrict,
    reset,
  } = useMapContext();

  const activeRecord = selectedDistrict ?? selectedState;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8"
      >
        <p className="data-readout text-xs uppercase tracking-widest text-primary">
          Agricultural intelligence · India
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Explore soils across India, state by state
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink/60">
          Hover a state for its dominant soil, click to drill into districts,
          then let the Farmer Decision Panel turn that soil profile into a
          crop plan.
        </p>
      </motion.div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-[70%]">
          <AnimatePresence mode="wait" initial={false}>
            {selectedState ? (
              <motion.div
                key="state-map"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <StateMap
                  state={selectedState}
                  viewMode={viewMode}
                  onBack={reset}
                  onSelectDistrict={selectDistrict}
                />
              </motion.div>
            ) : (
              <motion.div
                key="india-map"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <IndiaMap viewMode={viewMode} onSelectState={selectState} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="flex flex-col gap-4 lg:w-[30%]" aria-label="Map information panel">
          <div className="rounded-2xl border border-accent/30 bg-surface-alt p-4">
            <p className="data-readout mb-3 text-[11px] uppercase tracking-wide text-primary">
              Layer control
            </p>
            <ToggleSwitch viewMode={viewMode} onChange={setViewMode} />
          </div>

          <div className="rounded-2xl border border-accent/30 bg-surface p-4">
            <p className="data-readout mb-2 text-[11px] uppercase tracking-wide text-primary">
              Selection readout
            </p>
            {activeRecord ? (
              <div>
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-3 w-3 rounded-full"
                    style={{ background: getSoilColor(activeRecord.dominantSoil) }}
                  />
                  <p className="font-display text-sm font-semibold text-ink">
                    {activeRecord.name}
                  </p>
                </div>
                <p className="mt-1 text-xs text-ink/60">
                  Dominant soil: {activeRecord.dominantSoil}
                </p>
                {selectedState && (
                  <p className="mt-2 text-[11px] leading-snug text-ink/50">
                    {selectedState.soilDescription}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-ink/50">
                Nothing selected yet — hover or click a tile on the map.
              </p>
            )}
          </div>

          <SoilLegend />
        </aside>
      </div>

      <div className="mt-8">
        <InfoPanel />
      </div>
    </div>
  );
}
