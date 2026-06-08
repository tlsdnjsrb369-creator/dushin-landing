"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 relative z-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* 기업 정보 */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 md:h-12 md:w-12 shrink-0">
              <Image src="/logo.png" alt="(주)두신이엔지 로고" fill sizes="(max-width: 768px) 40px, 48px" className="object-contain object-left" priority />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tight text-slate-900 group-hover:text-brand-blue transition-colors">
              (주)두신이엔지
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-md">
            인천광역시 서구 검단천로356번길 46 (오류동)<br />
            대표번호: 032-562-5494 | 팩스: 032-562-5495<br />
            이메일: skj1994@naver.com | 사업자등록번호: 137-81-94279
          </p>
        </div>

        {/* 링크 및 저작권 */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex gap-4">
            <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-brand-blue transition-colors">{t('footer_home')}</Link>
            <Link href="/about" className="text-xs font-semibold text-slate-500 hover:text-brand-blue transition-colors">{t('nav_about')}</Link>
            <Link href="/services" className="text-xs font-semibold text-slate-500 hover:text-brand-blue transition-colors">{t('nav_services')}</Link>
            <Link href="/inquiry" className="text-xs font-semibold text-slate-500 hover:text-brand-blue transition-colors">{t('nav_inquiry')}</Link>
          </div>
          <p className="text-[10px] text-slate-400">
            Copyright © {new Date().getFullYear()} Dushin Engineering. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
