import crops from '../data/crops.json';
export function recommendCrops(soil?: string){return crops.filter(crop=>!soil||crop.soils.includes(soil));}
