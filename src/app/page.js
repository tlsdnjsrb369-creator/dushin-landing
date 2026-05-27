"use client";

import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-dark-bg text-gray-100 font-sans selection:bg-neon-cyan selection:text-black">
      {/* 네온 마우스 포인터 트레일러 */}
      <CustomCursor />

      {/* 헤더 네비게이션 */}
      <Navbar />

      <main className="w-full">
        {/* 히어로 섹션 */}
        <Hero />

        {/* 산업적 난제 섹션 */}
        <Problem />

        {/* 솔루션 및 강점 섹션 */}
        <Solution />

        {/* 문의 및 신뢰 지표 섹션 */}
        <CTA />
      </main>

      {/* 푸터 영역 */}
      <footer className="bg-dark-bg border-t border-dark-border py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* 기업 정보 */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg text-white tracking-wider">
              (주)두신<span className="text-neon-cyan">이엔지</span>
            </span>
            <p className="text-xs text-gray-500 leading-relaxed max-w-md">
              주소: 인천광역시 서구 검단천로356번길 46 (오류동)<br />
              대표번호: 032-562-5494 | 팩스: 032-562-5495<br />
              이메일: contact@dushin.co.kr | 사업자등록번호: 137-81-00000
            </p>
          </div>

          {/* 링크 및 저작권 */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="flex gap-4">
              <a href="#hero" className="text-xs text-gray-400 hover:text-neon-cyan transition-colors">기능 소개</a>
              <a href="#problem" className="text-xs text-gray-400 hover:text-neon-cyan transition-colors">산업적 난제</a>
              <a href="#solution" className="text-xs text-gray-400 hover:text-neon-cyan transition-colors">엔지니어링 솔루션</a>
              <a href="#cta" className="text-xs text-gray-400 hover:text-neon-cyan transition-colors">문의하기</a>
            </div>
            <p className="text-[10px] text-gray-600">
              Copyright © {new Date().getFullYear()} Dushin Engineering. All Rights Reserved.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
