/**
 * Future backend integration seam.
 *
 * Today, Project Bhumi runs entirely on the static JSON in `src/data`.
 * When the FastAPI + PostgreSQL backend described in the project spec
 * is ready, replace the bodies below with real `fetch` calls — every
 * component that needs this data already goes through `useMapData` or
 * `cropRecommendation.ts`, so no UI code should need to change.
 *
 * Suggested base URL, once live:
 *   const API_BASE = import.meta.env.VITE_API_BASE_URL;
 */

export interface WeatherForecast {
  districtId: string;
  summary: string;
  temperatureC: number;
  humidityPercent: number;
}

export async function getWeatherForecast(
  districtId: string
): Promise<WeatherForecast> {
  // TODO: wire up to a weather API (e.g. IMD, OpenWeather) via the backend.
  throw new Error(
    `getWeatherForecast(${districtId}) is not implemented yet — ` +
      "this is a placeholder for the future Weather API integration."
  );
}

export interface SatelliteLayer {
  districtId: string;
  imageUrl: string;
  capturedOn: string;
}

export async function getSatelliteImagery(
  districtId: string
): Promise<SatelliteLayer> {
  // TODO: wire up to ISRO Bhuvan / satellite imagery provider.
  throw new Error(
    `getSatelliteImagery(${districtId}) is not implemented yet — ` +
      "this is a placeholder for future satellite imagery integration."
  );
}

export interface SoilSensorReading {
  districtId: string;
  moisturePercent: number;
  phLevel: number;
  recordedAt: string;
}

export async function getSoilSensorReading(
  districtId: string
): Promise<SoilSensorReading> {
  // TODO: wire up to IoT soil sensor network via the backend.
  throw new Error(
    `getSoilSensorReading(${districtId}) is not implemented yet — ` +
      "this is a placeholder for future soil sensor integration."
  );
}

export interface ChatbotReply {
  reply: string;
}

export async function askFarmerAssistant(
  _prompt: string
): Promise<ChatbotReply> {
  // TODO: wire up to the LLM-powered chatbot / AI recommendation engine.
  throw new Error(
    "askFarmerAssistant is not implemented yet — this is a placeholder " +
      "for the future LLM chatbot integration."
  );
}
