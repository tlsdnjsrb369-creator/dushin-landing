"use client";

import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-slate-800 font-sans selection:bg-brand-blue selection:text-white">


      <main className="w-full">
        {/* 히어로 섹션 */}
        <Hero />

        {/* 회사소개 섹션 */}
        <AboutUs />

        {/* 산업적 난제 섹션 */}
        <Problem />

        {/* 솔루션 및 강점 섹션 */}
        <Solution />

        {/* 문의 및 신뢰 지표 섹션 */}
        <CTA />
      </main>
    </div>
  );
}
