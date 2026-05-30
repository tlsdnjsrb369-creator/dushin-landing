"use client";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 relative z-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* 기업 정보 */}
        <div className="flex flex-col gap-2">
          <span className="font-bold text-lg text-slate-900 tracking-wider">
            (주)두신이엔지
          </span>
          <p className="text-xs text-slate-600 leading-relaxed max-w-md">
            {t('footer_address')}<br />
            {t('footer_contact')}<br />
            {t('footer_biz')}
          </p>
        </div>

        {/* 링크 및 저작권 */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex gap-4">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">{t('footer_home')}</Link>
            <Link href="/about" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">{t('nav_about')}</Link>
            <Link href="/services" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">{t('nav_services')}</Link>
            <Link href="/inquiry" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">{t('nav_inquiry')}</Link>
          </div>
          <p className="text-[10px] text-slate-400">
            {t('footer_copyright')}
          </p>
        </div>

      </div>
    </footer>
  );
}
