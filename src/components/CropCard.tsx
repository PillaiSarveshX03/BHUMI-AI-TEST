import { motion } from "framer-motion";
import { Droplet, Calendar, TrendingUp, FlaskConical, AlertTriangle } from "lucide-react";
import type { CropRecord, WaterRequirement } from "@/types";

interface CropCardProps {
  crop: CropRecord;
  score?: number;
  suitable?: boolean;
  index?: number;
}

const WATER_DOTS: Record<WaterRequirement, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
};

export function CropCard({ crop, score, suitable = true, index = 0 }: CropCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className={`rounded-xl border p-4 ${
        suitable ? "border-accent/40 bg-surface" : "border-ink/10 bg-surface-alt"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-alt text-xl"
            aria-hidden="true"
          >
            {crop.icon}
          </span>
          <div>
            <h3 className="font-display text-sm font-semibold text-ink">
              {crop.name}
            </h3>
            <span className="text-[11px] text-ink/50">{crop.season} season</span>
          </div>
        </div>
        {score !== undefined && (
          <div className="text-right">
            <p
              className={`data-readout text-lg font-semibold leading-none ${
                suitable ? "text-primary" : "text-ink/40"
              }`}
            >
              {score}%
            </p>
            <p className="text-[10px] uppercase tracking-wide text-ink/40">
              suitability
            </p>
          </div>
        )}
      </div>

      {score !== undefined && !suitable && (
        <p className="mt-3 flex items-center gap-1.5 rounded-md bg-ink/5 px-2.5 py-1.5 text-[11px] text-ink/60">
          <AlertTriangle size={12} aria-hidden="true" />
          Not a strong match for this soil — possible with heavy amendment.
        </p>
      )}

      <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
        <div>
          <dt className="flex items-center gap-1 text-ink/50">
            <Droplet size={12} aria-hidden="true" /> Water need
          </dt>
          <dd className="mt-1 flex items-center gap-0.5" aria-label={crop.waterRequirement}>
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`h-1.5 w-4 rounded-full ${
                  i <= WATER_DOTS[crop.waterRequirement] ? "bg-primary" : "bg-ink/10"
                }`}
              />
            ))}
            <span className="ml-1 text-ink/70">{crop.waterRequirement}</span>
          </dd>
        </div>
        <div>
          <dt className="flex items-center gap-1 text-ink/50">
            <Calendar size={12} aria-hidden="true" /> Growing months
          </dt>
          <dd className="mt-1 text-ink/70">{crop.growingMonths}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1 text-ink/50">
            <TrendingUp size={12} aria-hidden="true" /> Expected yield
          </dt>
          <dd className="mt-1 text-ink/70">{crop.expectedYield}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1 text-ink/50">
            <FlaskConical size={12} aria-hidden="true" /> Fertilizer
          </dt>
          <dd className="mt-1 text-ink/70">{crop.fertilizerRecommendation}</dd>
        </div>
      </dl>

      <div className="mt-3 border-t border-ink/5 pt-3">
        <p className="text-[11px] font-medium text-ink/60">Known challenges</p>
        <ul className="mt-1 space-y-1">
          {crop.challenges.map((challenge) => (
            <li key={challenge} className="flex items-start gap-1.5 text-[11px] text-ink/60">
              <span aria-hidden="true" className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {challenge}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
