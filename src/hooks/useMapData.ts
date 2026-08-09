import { useMemo } from "react";
import statesRaw from "@/data/india.json";
import districtsRaw from "@/data/districts.json";
import rainfallRaw from "@/data/rainfall.json";
import climateRaw from "@/data/climate.json";
import type {
  ClimateRecord,
  DistrictRecord,
  RainfallRecord,
  StateRecord,
} from "@/types";

const states = statesRaw as StateRecord[];
const districts = districtsRaw as DistrictRecord[];
const rainfall = rainfallRaw as RainfallRecord[];
const climate = climateRaw as ClimateRecord[];

/**
 * Central data-access hook for the map. Joins the modular JSON sources
 * (india, districts, rainfall, climate) into convenient lookups so
 * components never need to know the on-disk shape of the datasets.
 *
 * When a real backend lands, this hook is the seam to replace —
 * swap the static imports above for `services/api.ts` calls and every
 * consumer of this hook keeps working unchanged.
 */
export function useMapData() {
  const rainfallByDistrict = useMemo(
    () => new Map(rainfall.map((r) => [r.districtId, r.annualRainfallMm])),
    []
  );
  const climateByDistrict = useMemo(
    () => new Map(climate.map((c) => [c.districtId, c.climateZone])),
    []
  );
  const districtsByState = useMemo(() => {
    const map = new Map<string, DistrictRecord[]>();
    for (const d of districts) {
      const list = map.get(d.stateId) ?? [];
      list.push(d);
      map.set(d.stateId, list);
    }
    return map;
  }, []);

  function getState(stateId: string): StateRecord | undefined {
    return states.find((s) => s.id === stateId);
  }

  function getDistrictsForState(stateId: string): DistrictRecord[] {
    return districtsByState.get(stateId) ?? [];
  }

  function getRainfall(districtId: string): number | undefined {
    return rainfallByDistrict.get(districtId);
  }

  function getClimate(districtId: string): string | undefined {
    return climateByDistrict.get(districtId);
  }

  return {
    states,
    getState,
    getDistrictsForState,
    getRainfall,
    getClimate,
  };
}
