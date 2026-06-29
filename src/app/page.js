"use client";

import Hero from "@/components/Hero";
import BusinessAreas from "@/components/home/BusinessAreas";
import PerformanceHighlight from "@/components/home/PerformanceHighlight";
import Clients from "@/components/home/Clients";

export default function Home() {
  return (
    <div className="relative bg-white font-sans selection:bg-brand-blue selection:text-white">
      <Hero />
      <BusinessAreas />
      <PerformanceHighlight />
      <Clients />
    </div>
  );
}
