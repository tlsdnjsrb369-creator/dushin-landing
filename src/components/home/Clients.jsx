"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";

// 직접 거래처(주요 파트너)와 최종 적용처(End Users)를 구분해 정직하게 표기.
// 두신이엔지는 2차 벤더로서 아래 파트너사에 납품하며, 그 제품은 최종 적용처 프로젝트에 사용됩니다.
const partners = ["심팩ENG", "한일너클프레스", "진우FT", "재원산업기계", "용운중공업", "일광메탈포밍", "남양기공"];
const endUsers = ["현대제철", "동국제강", "JFE Steel", "삼성전자", "대우건설", "MHI"];

export default function Clients() {
  const { t } = useTranslation();

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
          <span className="text-sm font-bold tracking-widest text-brand-blue uppercase block mb-3">
            {t("home_clients_badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">
            {t("home_clients_title_1")}<br />
            <span className="text-brand-blue">{t("home_clients_title_2")}</span>
          </h2>
          <div className="w-16 h-[2px] bg-brand-blue mx-auto mb-6 shadow-[0_2px_8px_rgba(0,85,164,0.4)]" />
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
            {t("home_clients_desc")}
          </p>
        </motion.div>

        {/* 주요 파트너 (직접 거래처) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <p className="text-center text-sm font-bold text-slate-500 mb-4">
            {t("home_clients_partners_label")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {partners.map((name) => (
              <span
                key={name}
                className="px-5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm md:text-base"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 최종 적용처 (End Users) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <p className="text-center text-sm font-bold text-slate-500 mb-4">
            {t("home_clients_endusers_label")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {endUsers.map((name) => (
              <span
                key={name}
                className="px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-500 font-semibold text-sm md:text-base"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
