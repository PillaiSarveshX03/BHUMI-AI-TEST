import soilData from "@/data/soil.json";
import { Tooltip } from "@/components/Tooltip";
import type { SoilProfile } from "@/types";

const soils = soilData as SoilProfile[];

export function SoilLegend() {
  return (
    <div
      className="rounded-2xl border border-accent/30 bg-surface-alt p-4"
      role="group"
      aria-label="Soil type legend"
    >
      <p className="data-readout mb-3 text-[11px] uppercase tracking-wide text-primary">
        Soil Legend
      </p>
      <ul className="flex flex-wrap gap-2">
        {soils.map((soil) => (
          <li key={soil.type}>
            <Tooltip
              content={
                <p className="text-[11px] leading-snug text-ink/80">
                  {soil.description}
                </p>
              }
            >
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-surface px-2.5 py-1 text-xs font-medium text-ink/80 transition hover:border-accent"
              >
                <span
                  aria-hidden="true"
                  className="h-3 w-3 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${soil.gradientFrom}, ${soil.gradientTo})`,
                  }}
                />
                {soil.type}
              </button>
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
}
