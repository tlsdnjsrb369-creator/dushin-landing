"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function ProcessFlow() {
  const { t } = useTranslation();

  const steps = [
    t("home_process_s1"),
    t("home_process_s2"),
    t("home_process_s3"),
    t("home_process_s4"),
    t("home_process_s5"),
    t("home_process_s6"),
    t("home_process_s7"),
  ];

  return (
    <section className="relative py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-bold tracking-widest text-brand-blue uppercase block mb-3">
            {t("home_process_badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">
            {t("home_process_title_1")}<br />
            <span className="text-brand-blue">{t("home_process_title_2")}</span>
          </h2>
          <div className="w-16 h-[2px] bg-brand-blue mx-auto mb-6 shadow-[0_2px_8px_rgba(0,85,164,0.4)]" />
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
            {t("home_process_desc")}
          </p>
        </motion.div>

        {/* 단계 */}
        <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-6">
          {steps.map((label, i) => (
            <Fragment key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="flex flex-col items-center w-[92px] md:w-[110px]"
              >
                <div className="w-14 h-14 rounded-full bg-white border-2 border-brand-blue/30 text-brand-blue font-extrabold flex items-center justify-center text-lg shadow-sm">
                  {i + 1}
                </div>
                <span className="mt-3 text-sm md:text-base font-bold text-slate-700 text-center leading-snug">
                  {label}
                </span>
              </motion.div>
              {i < steps.length - 1 && (
                <ChevronRight className="w-5 h-5 text-slate-300 shrink-0 hidden sm:block" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
