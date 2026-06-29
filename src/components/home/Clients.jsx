"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";

export default function Clients() {
  const { t } = useTranslation();

  // 로고 이미지는 public/clients/ 의 플레이스홀더입니다.
  // 실제 로고 파일(png/svg)을 같은 이름으로 교체하면 그대로 반영됩니다.
  const clients = [
    { name: "현대제철",   logo: "/clients/hyundai-steel.svg" },
    { name: "동국제강",   logo: "/clients/dongkuk-steel.svg" },
    { name: "JFE Steel",  logo: "/clients/jfe-steel.svg" },
    { name: "대우건설",   logo: "/clients/daewoo-enc.svg" },
    { name: "삼성전자",   logo: "/clients/samsung.svg" },
    { name: "MHI",        logo: "/clients/mhi.svg" },
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
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-sm font-bold tracking-widest text-brand-red uppercase block mb-3">
            {t("home_clients_badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">
            {t("home_clients_title_1")}<br />
            <span className="text-brand-blue">{t("home_clients_title_2")}</span>
          </h2>
          <div className="w-16 h-[2px] bg-brand-red mx-auto mb-6 shadow-[0_2px_8px_rgba(229,9,20,0.4)]" />
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
            {t("home_clients_desc")}
          </p>
        </motion.div>

        {/* 로고 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-slate-200 rounded-xl overflow-hidden border border-slate-200">
          {clients.map((c, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.07 }}
              className="group flex items-center justify-center bg-white px-5 py-8 aspect-[3/2]"
            >
              <Image
                src={c.logo}
                alt={`${c.name} 로고`}
                width={220}
                height={66}
                className="max-h-16 w-full object-contain opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
