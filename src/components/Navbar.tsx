import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sprout, X } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/utils/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? "text-primary" : "text-ink/70"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-accent/20 bg-surface/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
        aria-label="Primary"
      >
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
            <Sprout size={18} aria-hidden="true" />
          </span>
          <span>
            <span className="block font-display text-base font-semibold leading-none text-ink">
              {BRAND.name}
            </span>
            <span className="data-readout block text-[10px] leading-none text-ink/50">
              {BRAND.tagline}
            </span>
          </span>
        </NavLink>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={linkClass} end={link.to === "/"}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="rounded-md p-2 text-ink md:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-accent/20 bg-surface-alt md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.to} className="border-b border-accent/10 last:border-none">
                <NavLink
                  to={link.to}
                  className={linkClass}
                  end={link.to === "/"}
                  onClick={() => setOpen(false)}
                >
                  <span className="block px-6 py-3">{link.label}</span>
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
