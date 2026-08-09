import { cloneElement, ReactElement, ReactNode, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TooltipProps {
  content: ReactNode;
  children: ReactElement<Record<string, unknown>>;
}

/**
 * Wraps a single focusable element (a map tile button) and shows an
 * accessible tooltip panel on hover or keyboard focus. Associates the
 * trigger with the tooltip via aria-describedby so screen readers pick
 * it up without any extra narration.
 */
export function Tooltip({ content, children }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  const trigger = cloneElement(children, {
    "aria-describedby": open ? tooltipId : undefined,
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
  });

  return (
    <div className="relative inline-flex">
      {trigger}
      <AnimatePresence>
        {open && (
          <motion.div
            role="tooltip"
            id={tooltipId}
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-60 -translate-x-1/2 rounded-lg border border-accent/50 bg-surface p-3 text-left text-xs shadow-tile-hover"
          >
            {content}
            <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-accent/50 bg-surface" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
