"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, Flame, Cog, ShieldCheck, ArrowRight } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function BusinessAreas() {
  const { t } = useTranslation();

  const areas = [
    { icon: Layers,      title: t("home_biz1_title"), desc: t("home_biz1_desc") },
    { icon: Flame,       title: t("home_biz2_title"), desc: t("home_biz2_desc") },
    { icon: Cog,         title: t("home_biz3_title"), desc: t("home_biz3_desc") },
    { icon: ShieldCheck, title: t("home_biz4_title"), desc: t("home_biz4_desc") },
  ];

  return (
    <section className="relative py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-bold tracking-widest text-brand-red uppercase block mb-3">
            {t("home_biz_badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">
            {t("home_biz_title_1")}<br />
            <span className="text-brand-blue">{t("home_biz_title_2")}</span>
          </h2>
          <div className="w-16 h-[2px] bg-brand-red mx-auto mb-6 shadow-[0_2px_8px_rgba(229,9,20,0.4)]" />
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
            {t("home_biz_desc")}
          </p>
        </motion.div>

        {/* 사업분야 카드 4개 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
                className="group p-7 rounded-xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-brand-blue/40 transition-all duration-300 flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 group-hover:bg-brand-blue/10 group-hover:border-brand-blue/30 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-7 h-7 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-brand-blue transition-colors duration-300">
                  {area.title}
                </h3>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  {area.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md border-2 border-slate-800 text-slate-800 font-bold tracking-wide hover:bg-slate-800 hover:text-white transition-all duration-300"
          >
            {t("home_biz_cta")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
