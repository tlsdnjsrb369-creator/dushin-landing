"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";

// 현장 갤러리 — 실제 촬영 사진(자재 입고→출하) + 현장 영상
export default function FieldGallery() {
  const { t } = useTranslation();

  const photos = [
    { src: "/images/field-material.jpg",    label: t("home_field_1") },
    { src: "/images/field-cutting.jpg",     label: t("home_field_2") },
    { src: "/images/field-fabrication.jpg", label: t("home_field_3") },
    { src: "/images/field-welding.jpg",     label: t("home_field_4") },
    { src: "/images/field-bigframe.jpg",    label: t("home_field_5") },
    { src: "/images/field-grinding.jpg",    label: t("home_field_6") },
    { src: "/images/field-inspection.jpg",  label: t("home_field_7") },
    { src: "/images/field-shipping.jpg",    label: t("home_field_8") },
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
          <span className="text-sm font-bold tracking-widest text-brand-blue uppercase block mb-3">
            {t("home_field_badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">
            {t("home_field_title_1")}<br />
            <span className="text-brand-blue">{t("home_field_title_2")}</span>
          </h2>
          <div className="w-16 h-[2px] bg-brand-blue mx-auto mb-6 shadow-[0_2px_8px_rgba(0,85,164,0.4)]" />
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
            {t("home_field_desc")}
          </p>
        </motion.div>

        {/* 현장 영상 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg mb-10 bg-slate-900"
        >
          <video
            src="/videos/field-weld.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full max-h-[480px] object-cover"
          />
          <span className="absolute bottom-3 left-4 text-xs font-bold text-white/90 bg-black/45 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {t("home_field_video")}
          </span>
        </motion.div>

        {/* 사진 그리드 (자재 입고 → 출하) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: (idx % 4) * 0.08 }}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 shadow-sm"
            >
              <Image
                src={p.src}
                alt={`두신이엔지 현장 — ${p.label}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <span className="absolute bottom-2.5 left-3 text-[13px] md:text-sm font-bold text-white drop-shadow">
                {p.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
