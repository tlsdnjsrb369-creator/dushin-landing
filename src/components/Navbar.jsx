"use client";

import { useState, useEffect } from "react";
import { Hammer } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-4 glassmorphism border-b border-dark-border"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* 로고 영역 */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-lime flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <Hammer className="w-5 h-5 text-dark-bg stroke-[2.5]" />
          </div>
          <span className="font-sans font-bold text-xl tracking-wider text-white">
            두신<span className="text-neon-cyan group-hover:text-neon-lime transition-colors duration-300">이엔지</span>
          </span>
        </a>

        {/* 메뉴 링크 (데스크톱) */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#hero"
            className="text-sm font-medium tracking-wide text-gray-400 hover:text-neon-cyan transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-neon-cyan after:transition-all after:duration-300 hover:after:w-full"
          >
            기능 소개
          </a>
          <a
            href="#problem"
            className="text-sm font-medium tracking-wide text-gray-400 hover:text-neon-cyan transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-neon-cyan after:transition-all after:duration-300 hover:after:w-full"
          >
            산업적 난제
          </a>
          <a
            href="#solution"
            className="text-sm font-medium tracking-wide text-gray-400 hover:text-neon-cyan transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-neon-cyan after:transition-all after:duration-300 hover:after:w-full"
          >
            엔지니어링 솔루션
          </a>
        </nav>

        {/* CTA 버튼 */}
        <div className="flex items-center gap-4">
          <a
            href="#cta"
            className="px-5 py-2 text-xs md:text-sm font-semibold tracking-wider text-white uppercase rounded-md border border-neon-cyan/40 bg-neon-cyan/5 hover:bg-neon-cyan/20 hover:border-neon-cyan duration-300 transition-all shadow-[0_0_10px_rgba(0,242,254,0.05)] hover:shadow-[0_0_20px_rgba(0,242,254,0.2)]"
          >
            견적 문의하기
          </a>
        </div>
      </div>
    </header>
  );
}
