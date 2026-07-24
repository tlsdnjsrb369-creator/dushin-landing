"use client";

import SubPageBackground from "@/components/SubPageBackground";
import Link from "next/link";
import { motion } from "framer-motion";
import { FolderKanban, BadgeCheck, ArrowRight } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function ArchivesPage() {
  const { t } = useTranslation();

  const cards = [
    {
      href: "/archives/performance",
      icon: FolderKanban,
      title: t("nav_archives_perf"),
      desc: t("archives_card_perf_desc"),
    },
    {
      href: "/archives/certificates",
      icon: BadgeCheck,
      title: t("nav_archives_cert"),
      desc: t("archives_card_cert_desc"),
    },
  ];

  return (
    <>
      <SubPageBackground />
      <section className="relative min-h-screen pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <span className="text-sm font-bold tracking-widest text-brand-blue uppercase block mb-3">
              {t("archives_badge")}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">
              {t("archives_title_1")}<br />
              <span className="text-brand-blue">{t("archives_title_2")}</span>
            </h1>
            <div className="w-16 h-[2px] bg-brand-blue mx-auto mb-6 shadow-[0_2px_8px_rgba(0,85,164,0.4)]" />
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
              {t("archives_desc")}
            </p>
          </motion.div>

          {/* 두 개의 카드: 제작 실적 / 인증 현황 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((c, idx) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 + idx * 0.1 }}
                >
                  <Link
                    href={c.href}
                    className="group flex flex-col h-full p-8 md:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-blue/40 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-brand-blue/10 group-hover:border-brand-blue/30 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 text-brand-blue" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-brand-blue transition-colors duration-300">
                      {c.title}
                    </h2>
                    <p className="text-slate-600 text-base leading-relaxed font-medium mb-6">
                      {c.desc}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 text-brand-blue font-bold text-sm">
                      {t("home_perf_cta")}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
