"use client";

import Hero from "@/components/Hero";
import BusinessAreas from "@/components/home/BusinessAreas";
import ProcessFlow from "@/components/home/ProcessFlow";
import PerformanceHighlight from "@/components/home/PerformanceHighlight";
import StatsBand from "@/components/home/StatsBand";
import Clients from "@/components/home/Clients";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="relative bg-white font-sans selection:bg-brand-blue selection:text-white">
      <Hero />
      <BusinessAreas />
      <ProcessFlow />
      <PerformanceHighlight />
      <StatsBand />
      <Clients />
      <CTA />
    </div>
  );
}
