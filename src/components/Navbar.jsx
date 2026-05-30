"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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

  const navLinks = [
    { name: "회사소개", href: "/about" },
    { name: "제공 서비스", href: "/services" },
    { name: "설비현황", href: "/facilities" },
    { name: "제작 문의", href: "/inquiry" },
    { name: "기술 자료실", href: "/archives" }
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
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 md:w-10 md:h-10">
            <Image src="/logo.png" alt="두신이엔지 로고" fill className="object-contain" />
          </div>
          <span className="font-sans font-bold text-xl tracking-wider text-slate-900">
            두신<span className="text-neon-cyan group-hover:text-neon-lime transition-colors duration-300">이엔지</span>
          </span>
        </Link>

        {/* 메뉴 링크 (데스크톱) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-neon-cyan after:transition-all after:duration-300 ${
                  isActive ? "text-neon-cyan after:w-full" : "text-slate-600 hover:text-neon-cyan after:w-0 hover:after:w-full"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA 버튼 */}
        <div className="flex items-center gap-4">
          <Link
            href="/inquiry"
            className="px-5 py-2 text-xs md:text-sm font-bold tracking-wider text-slate-800 uppercase rounded-md border border-neon-cyan/40 bg-neon-cyan/5 hover:bg-neon-cyan/10 hover:border-neon-cyan duration-300 transition-all shadow-[0_2px_10px_rgba(0,210,222,0.05)]"
          >
            견적 요청하기
          </Link>
        </div>
      </div>
    </header>
  );
}
