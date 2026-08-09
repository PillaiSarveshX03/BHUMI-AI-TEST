import { Sprout } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/utils/constants";

export function Footer() {
  return (
    <footer className="border-t border-accent/20 bg-surface-alt">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Sprout size={16} aria-hidden="true" />
            </span>
            <span className="font-display text-sm font-semibold">{BRAND.name}</span>
          </div>
          <p className="mt-2 max-w-xs text-xs text-ink/60">
            Helping farmers read the ground beneath them — soil, rainfall and
            climate, mapped down to the district.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink/70">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <a href={link.to} className="hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-accent/20 px-4 py-4 text-center text-[11px] text-ink/40 sm:px-6">
        Project Bhumi — a concept agricultural intelligence platform. Soil and
        climate figures are representative, not a substitute for local
        agricultural extension advice.
      </div>
    </footer>
  );
}
