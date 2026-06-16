"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function CertificatesPage() {
  const { t } = useTranslation();
  const [selectedCert, setSelectedCert] = useState(null);

  // ── 자격증/면허 데이터 배열 ─────────────────────────────────────────────────
  const certificatesData = [
    { id: 1, name: t('cert1_name'), image: "/images/cert-1.jpg" },
    { id: 2, name: t('cert2_name'), image: "/images/cert-2.jpg" },
    { id: 3, name: t('cert3_name'), image: "/images/cert-3.jpg" },
    { id: 4, name: t('cert4_name'), image: "/images/cert-4.jpg" },
    { id: 5, name: t('cert5_name'), image: "/images/cert-5.jpg" },
    { id: 6, name: t('cert6_name'), image: "/images/cert-6.jpg" },
    { id: 7, name: t('cert7_name'), image: "/images/cert-7.jpg" },
  ];

  // 모달 열릴 때 배경 스크롤 방지
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedCert]);

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── 헤더 ─────────────────────────────────────────────────────── */}
        <div className="mb-14 pb-10 border-b border-black/10">
          <Link
            href="/archives"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-black/40 uppercase tracking-widest hover:text-black transition-colors duration-200 mb-7"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            {t('nav_archives')}
          </Link>

          <div>
            <span className="inline-block text-[10px] font-black tracking-[0.25em] text-black uppercase border border-black px-3 py-1 mb-5">
              {t('cert_badge')}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-none tracking-tight">
              {t('cert_title')}
            </h1>
            <div className="w-12 h-[3px] bg-black mb-5" />
            <p className="text-black/50 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
              {t('cert_desc')}
            </p>
          </div>
        </div>

        {/* ── 자격증 그리드 (3:4 세로 비율) ──────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
          {certificatesData.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="group cursor-pointer flex flex-col border border-black/15 hover:border-black bg-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
            >
              {/* 이미지 영역 */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/5">
                <img
                  src={encodeURI(cert.image)}
                  alt={cert.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                />
                {/* 호버 오버레이 */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white border border-black px-3 py-1.5">
                    <span className="text-[10px] font-black tracking-widest text-black uppercase">{t('cert_view')}</span>
                  </div>
                </div>
              </div>

              {/* 카드 하단 텍스트 */}
              <div className="px-4 py-3 border-t border-black/10 group-hover:border-black transition-colors duration-300 bg-white">
                <h3 className="font-black text-black text-sm leading-snug tracking-tight">
                  {cert.name}
                </h3>
                <span className="text-[10px] font-bold text-black/30 uppercase tracking-widest mt-0.5 block">
                  {t('cert_company')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 팝업 모달 ─────────────────────────────────────────────────────── */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/85 backdrop-blur-sm">
          {/* 배경 클릭으로 닫기 */}
          <div className="absolute inset-0" onClick={() => setSelectedCert(null)} />

          <div className="relative flex flex-col bg-white max-w-2xl w-full max-h-[90vh] shadow-2xl">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/10 flex-shrink-0">
              <div>
                <span className="text-[10px] font-black tracking-[0.2em] text-black/40 uppercase block mb-0.5">
                  {t('cert_modal_badge')}
                </span>
                <h3 className="font-black text-black text-lg leading-none">
                  {selectedCert.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-9 h-9 flex items-center justify-center border border-black/20 hover:border-black hover:bg-black hover:text-white transition-all duration-200 text-black ml-4 flex-shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 이미지 영역 — object-contain 으로 전체 자격증 표시 */}
            <div className="flex-grow overflow-auto bg-black/[0.03] flex items-center justify-center p-6 md:p-10">
              <img
                src={encodeURI(selectedCert.image)}
                alt={selectedCert.name}
                style={{ objectFit: "contain", maxHeight: "70vh", width: "100%" }}
              />
            </div>

            {/* 모달 푸터 */}
            <div className="px-5 py-3 border-t border-black/10 flex-shrink-0 flex justify-between items-center bg-white">
              <span className="text-xs font-bold text-black/30 tracking-widest uppercase">
                {t('cert_company')}
              </span>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-xs font-black text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition-all duration-200 tracking-widest uppercase"
              >
                {t('cert_close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
