"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function PerformanceHighlight() {
  const { t } = useTranslation();

  // 대표 실적 4건 (실적 페이지의 실제 데이터/이미지 사용)
  const projects = [
    { title: t("perf3_title"),  desc: t("perf3_desc"),  image: "/images/jfe-cooler-1.jpg" },
    { title: t("perf13_title"), desc: t("perf13_desc"), image: "/images/hyundai-roof-1.jpg" },
    { title: t("perf9_title"),  desc: t("perf9_desc"),  image: "/images/dongkuk-cassette-1.jpg" },
    { title: t("perf15_title"), desc: t("perf15_desc"), image: "/images/daewoo-penstock-1.jpg" },
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
            {t("home_perf_badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">
            {t("home_perf_title_1")}<br />
            <span className="text-brand-blue">{t("home_perf_title_2")}</span>
          </h2>
          <div className="w-16 h-[2px] bg-brand-blue mx-auto mb-6 shadow-[0_2px_8px_rgba(0,85,164,0.4)]" />
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
            {t("home_perf_desc")}
          </p>
        </motion.div>

        {/* 실적 카드 4개 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
            >
              <Link
                href="/archives/performance"
                className="group block rounded-xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-brand-blue/40 transition-all duration-300 h-full"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-brand-blue" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-800 mb-2 leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-2">
                    {p.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Link
            href="/archives/performance"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-gradient-to-r from-brand-blue to-blue-600 text-white font-bold tracking-wide hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_15px_rgba(0,85,164,0.3)]"
          >
            {t("home_perf_cta")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
