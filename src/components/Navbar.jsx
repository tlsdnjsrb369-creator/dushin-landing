"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);

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
    { name: t('nav_about'), href: "/about" },
    { name: t('nav_services'), href: "/services" },
    { name: t('nav_facilities'), href: "/facilities" },
    { name: t('nav_inquiry'), href: "/inquiry" },
    { name: t('nav_archives'), href: "/archives" }
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
          <div className="relative w-8 h-8 md:w-10 md:h-10 shrink-0">
            <Image src="/logo.png" alt="두신이엔지 로고" fill sizes="40px" className="object-contain" priority />
          </div>
          <span className="font-sans font-extrabold text-xl tracking-wider text-slate-900 transition-colors duration-300">
            두신이엔지
          </span>
        </Link>

        {/* 메뉴 링크 (데스크톱) */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-slate-900 after:transition-all after:duration-300 ${
                  isActive ? "text-slate-900 after:w-full" : "text-slate-500 hover:text-slate-900 after:w-0 hover:after:w-full"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA 버튼 및 다국어 선택기 */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              onBlur={() => setTimeout(() => setLangOpen(false), 200)}
              className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors py-2"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-bold uppercase">{lang}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 flex flex-col bg-white shadow-xl border border-slate-100 rounded-lg py-2 min-w-[140px] z-50">
                <button onClick={() => {setLang('ko'); setLangOpen(false);}} className={`px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors ${lang === 'ko' ? 'font-bold text-slate-900' : 'text-slate-600'}`}>KO (한국어)</button>
                <button onClick={() => {setLang('en'); setLangOpen(false);}} className={`px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors ${lang === 'en' ? 'font-bold text-slate-900' : 'text-slate-600'}`}>EN (English)</button>
                <button onClick={() => {setLang('ja'); setLangOpen(false);}} className={`px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors ${lang === 'ja' ? 'font-bold text-slate-900' : 'text-slate-600'}`}>JA (日本語)</button>
              </div>
            )}
          </div>

          <Link
            href="/inquiry"
            className="hidden md:flex px-5 py-2 text-xs md:text-sm font-bold tracking-wider text-slate-900 uppercase rounded-md border-2 border-slate-900 hover:bg-slate-900 hover:text-white duration-300 transition-all shadow-sm"
          >
            {t('nav_cta')}
          </Link>
        </div>
      </div>
    </header>
  );
}
