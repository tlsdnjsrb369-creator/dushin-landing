"use client";

import { useState, useEffect } from "react";
import { Hammer, Loader2 } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAlert = (e, name) => {
    if (name === "기술 자료실" || name === "기술자료실") {
      e.preventDefault();
      alert("기술자료실은 준비 중입니다. 신속히 업데이트하도록 하겠습니다.");
    }
  };

  const handleLinkClick = (e, link) => {
    if (link.isAlert) {
      handleAlert(e, link.name);
      return;
    }
    if (link.name === "제공 서비스") {
      e.preventDefault();
      setIsBuffering(true);
      setTimeout(() => {
        setIsBuffering(false);
        const section = document.getElementById("problem");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 600);
    }
  };

  const navLinks = [
    { name: "회사소개", href: "#about" },
    { name: "제공 서비스", href: "#problem" },
    { name: "설비현황", href: "#solution" },
    { name: "제작 문의", href: "#cta" },
    { name: "기술 자료실", href: "#", isAlert: true }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-4 glassmorphism shadow-sm border-b border-slate-200/60"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* 로고 영역 */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-lime flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
            <Hammer className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <span className="font-sans font-bold text-xl tracking-wider text-slate-900">
            두신<span className="text-neon-cyan group-hover:text-neon-lime transition-colors duration-300">이엔지</span>
          </span>
        </a>

        {/* 메뉴 링크 (데스크톱) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className="text-sm font-semibold tracking-wide text-slate-600 hover:text-neon-cyan transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-neon-cyan after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA 버튼 */}
        <div className="flex items-center gap-4">
          <a
            href="#cta"
            className="px-5 py-2 text-xs md:text-sm font-bold tracking-wider text-slate-800 uppercase rounded-md border border-neon-cyan/40 bg-neon-cyan/5 hover:bg-neon-cyan/10 hover:border-neon-cyan duration-300 transition-all shadow-[0_2px_10px_rgba(0,210,222,0.05)]"
          >
            견적 요청하기
          </a>
        </div>
      </div>

      {/* 테크니컬 로딩 스피너 오버레이 */}
      {isBuffering && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative flex flex-col items-center">
            {/* 회전하는 바깥쪽 게이지 */}
            <div className="absolute inset-0 w-24 h-24 border-4 border-slate-700 rounded-full" />
            <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-neon-cyan border-r-neon-cyan rounded-full animate-spin" />
            <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-b-neon-lime rounded-full animate-spin [animation-duration:1.5s] [animation-direction:reverse]" />
            
            {/* 중앙 아이콘 */}
            <div className="w-24 h-24 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-neon-cyan animate-spin" />
            </div>

            {/* 로딩 텍스트 */}
            <div className="mt-8 flex flex-col items-center gap-2">
              <span className="text-neon-cyan font-mono font-bold tracking-widest text-lg animate-pulse">
                SYSTEM LOADING...
              </span>
              <span className="text-slate-400 font-mono text-xs tracking-wider">
                INITIALIZING PROCESS
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
