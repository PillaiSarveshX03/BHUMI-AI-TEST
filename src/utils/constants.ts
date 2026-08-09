export const BRAND = {
  name: "Project Bhumi",
  tagline: "AI-powered farmer assistant",
} as const;

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Crop Database", to: "/crops" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Help", to: "/help" },
] as const;

/** Local grid size used to lay out districts inside a state console. */
export const DISTRICT_GRID_COLS = 3;

/** Debounce delay for the crop search box, in milliseconds. */
export const SEARCH_DEBOUNCE_MS = 200;
