import { Route, Routes } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapProvider } from "@/context/MapContext";
import Home from "@/pages/Home";
import About from "@/pages/About";
import CropDatabase from "@/pages/CropDatabase";
import Dashboard from "@/pages/Dashboard";
import Help from "@/pages/Help";

export default function App() {
  return (
    <MapProvider>
      <div className="flex min-h-screen flex-col bg-surface">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/crops" element={<CropDatabase />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </MapProvider>
  );
}
