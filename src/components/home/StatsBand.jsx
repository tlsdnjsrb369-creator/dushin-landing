"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";

// 숫자로 보는 두신 — 남색 밴드에 핵심 수치 4개
export default function StatsBand() {
  const { t } = useTranslation();

  const stats = [
    { num: t("home_stats_1_num"), label: t("home_stats_1_label") },
    { num: t("home_stats_2_num"), label: t("home_stats_2_label") },
    { num: t("home_stats_3_num"), label: t("home_stats_3_label") },
    { num: t("home_stats_4_num"), label: t("home_stats_4_label") },
  ];

  return (
    <section className="relative bg-brand-navy py-14 md:py-16 overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2">
                {s.num}
              </span>
              <span className="text-[13px] md:text-sm font-semibold text-blue-200/80">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
