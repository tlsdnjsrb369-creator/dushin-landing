"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown, Menu, X } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [archivesOpen, setArchivesOpen] = useState(false);
  const [mobileArchivesOpen, setMobileArchivesOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const archivesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (archivesRef.current && !archivesRef.current.contains(e.target)) {
        setArchivesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileArchivesOpen(false);
  }, [pathname]);

  const regularLinks = [
    { name: t('nav_about'), href: "/about" },
    { name: t('nav_services'), href: "/services" },
    { name: t('nav_inquiry'), href: "/inquiry" },
  ];

  const archivesSubmenu = [
    { name: t('nav_archives_perf'), href: "/archives/performance" },
    { name: t('nav_archives_cert'), href: "/archives/certificates" },
  ];

  const isArchivesActive = pathname.startsWith("/archives");

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
          <div className="relative h-10 w-10 md:h-12 md:w-12 shrink-0">
            <Image src="/logo.png" alt="(주)두신이엔지 로고" fill sizes="(max-width: 768px) 40px, 48px" className="object-contain object-left" priority />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tight text-slate-900 group-hover:text-brand-blue transition-colors">
            (주)두신이엔지
          </span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden lg:flex items-center gap-8">
          {regularLinks.map((link) => {
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

          {/* 기술자료실 드롭다운 */}
          <div
            ref={archivesRef}
            className="relative"
            onMouseEnter={() => setArchivesOpen(true)}
            onMouseLeave={() => setArchivesOpen(false)}
          >
            <button
              onClick={() => setArchivesOpen((prev) => !prev)}
              className={`flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-slate-900 after:transition-all after:duration-300 ${
                isArchivesActive ? "text-slate-900 after:w-full" : "text-slate-500 hover:text-slate-900 after:w-0 hover:after:w-full"
              }`}
            >
              {t('nav_archives')}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${archivesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* 드롭다운 패널 — pt-2로 gap 없앰 (마우스 이탈 방지) */}
            <div className="absolute left-0 top-full w-56 pt-2">
              <div
                className={`flex flex-col bg-slate-900 shadow-2xl rounded-xl py-2 z-[999] border border-slate-700 transition-all duration-200 origin-top ${
                  archivesOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
                }`}
              >
                {archivesSubmenu.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className={`px-5 py-3 text-sm font-semibold transition-colors duration-200 ${
                      pathname === sub.href
                        ? "text-white bg-brand-blue"
                        : "text-slate-200 hover:text-white hover:bg-slate-800"
                    }`}
                    onClick={() => setArchivesOpen(false)}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </nav>

        {/* CTA + 언어 선택 + 햄버거 버튼 */}
        <div className="flex items-center gap-4">
          {/* 언어 선택기 */}
          <div className="relative hidden md:block">
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
                <button onClick={() => { setLang('ko'); setLangOpen(false); }} className={`px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors ${lang === 'ko' ? 'font-bold text-slate-900' : 'text-slate-600'}`}>KO (한국어)</button>
                <button onClick={() => { setLang('en'); setLangOpen(false); }} className={`px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors ${lang === 'en' ? 'font-bold text-slate-900' : 'text-slate-600'}`}>EN (English)</button>
                <button onClick={() => { setLang('ja'); setLangOpen(false); }} className={`px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors ${lang === 'ja' ? 'font-bold text-slate-900' : 'text-slate-600'}`}>JA (日本語)</button>
              </div>
            )}
          </div>

          <Link
            href="/inquiry"
            className="hidden md:flex px-5 py-2 text-xs md:text-sm font-bold tracking-wider text-slate-900 uppercase rounded-md border-2 border-slate-900 hover:bg-slate-900 hover:text-white duration-300 transition-all shadow-sm"
          >
            {t('nav_cta')}
          </Link>

          {/* 모바일 햄버거 */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="메뉴 열기"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 모바일 드로어 */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 pb-6 pt-4 bg-white border-t border-slate-100 shadow-lg">
          {regularLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${
                pathname === link.href ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* 모바일 기술자료실 아코디언 */}
          <div>
            <button
              onClick={() => setMobileArchivesOpen((prev) => !prev)}
              className={`w-full flex justify-between items-center py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${
                isArchivesActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>{t('nav_archives')}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileArchivesOpen ? "rotate-180" : ""}`} />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileArchivesOpen ? "max-h-40" : "max-h-0"
              }`}
            >
              <div className="flex flex-col gap-1 pl-4 pt-1">
                {archivesSubmenu.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${
                      pathname === sub.href
                        ? "bg-brand-blue text-white"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 모바일 언어 선택 */}
          <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
            {['ko', 'en', 'ja'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-colors ${
                  lang === l ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
