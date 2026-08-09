import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import type { DistrictRecord, StateRecord, ViewMode } from "@/types";

interface MapContextValue {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  selectedState: StateRecord | null;
  selectedDistrict: DistrictRecord | null;
  selectState: (state: StateRecord | null) => void;
  selectDistrict: (district: DistrictRecord | null) => void;
  reset: () => void;
}

const MapContext = createContext<MapContextValue | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>("political");
  const [selectedState, setSelectedState] = useState<StateRecord | null>(null);
  const [selectedDistrict, setSelectedDistrict] =
    useState<DistrictRecord | null>(null);

  function selectState(state: StateRecord | null) {
    setSelectedState(state);
    setSelectedDistrict(null);
  }

  function selectDistrict(district: DistrictRecord | null) {
    setSelectedDistrict(district);
  }

  function reset() {
    setSelectedState(null);
    setSelectedDistrict(null);
  }

  const value = useMemo(
    () => ({
      viewMode,
      setViewMode,
      selectedState,
      selectedDistrict,
      selectState,
      selectDistrict,
      reset,
    }),
    [viewMode, selectedState, selectedDistrict]
  );

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}

export function useMapContext(): MapContextValue {
  const ctx = useContext(MapContext);
  if (!ctx) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return ctx;
}
