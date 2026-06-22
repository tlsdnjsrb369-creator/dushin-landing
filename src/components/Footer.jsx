"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#1a1a1a] border-t border-[#2a2a2a] py-16 relative z-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        
        {/* 기업 정보 */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 group">
            <div className="relative h-12 w-12 md:h-14 md:w-14 shrink-0 bg-white/10 rounded-md p-1 backdrop-blur-sm">
              <Image src="/logo.png" alt={`${t('common_companyName')} 로고`} fill sizes="(max-width: 768px) 48px, 56px" className="object-contain" priority />
            </div>
            <span className="text-2xl md:text-3xl font-black tracking-tight text-white transition-colors">
              {t('common_companyName')}
            </span>
          </div>
          <p className="text-sm md:text-base text-gray-400 leading-[1.8] max-w-xl font-medium">
            {t('footer_addr_val')}<br />
            {t('footer_tel_lbl')}: {t('footer_tel_val')} | {t('footer_fax_lbl')}: {t('footer_fax_val')}<br />
            {t('footer_email_lbl')}: {t('footer_email_val')} | {t('footer_biz_lbl')}: {t('footer_biz_val')}
          </p>
        </div>

        {/* 링크 및 저작권 */}
        <div className="flex flex-col items-start md:items-end gap-5">
          <div className="flex gap-6">
            <Link href="/" className="text-base font-semibold text-gray-400 hover:text-white transition-colors">{t('footer_home')}</Link>
            <Link href="/about" className="text-base font-semibold text-gray-400 hover:text-white transition-colors">{t('nav_about')}</Link>
            <Link href="/services" className="text-base font-semibold text-gray-400 hover:text-white transition-colors">{t('nav_services')}</Link>
            <Link href="/inquiry" className="text-base font-semibold text-gray-400 hover:text-white transition-colors">{t('nav_inquiry')}</Link>
          </div>
          <p className="text-sm text-gray-500 font-medium mt-2">
            Copyright © {new Date().getFullYear()} Dushin Engineering. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
