"use client";
import SubPageBackground from "@/components/SubPageBackground";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function PerformancePage() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);

  // ── 실적 프로젝트 데이터 배열 ──────────────────────────────────────────────
  const projects = [
    {
      id: 1,
      title: t('perf1_title'),
      date: "YYYY",
      description: t('perf1_desc'),
      thumbnail: "/images/spco-1.jpg",
      images: [
        "/images/spco-1.jpg", "/images/spco-2.jpg", "/images/spco-3.jpg", "/images/spco-4.jpg",
        "/images/spco-5.jpg", "/images/spco-6.jpg", "/images/spco-7.jpg", "/images/spco-8.jpg"
      ]
    },
    {
      id: 2,
      title: t('perf2_title'),
      date: "YYYY",
      description: t('perf2_desc'),
      thumbnail: "/images/spco-mnm-1.jpg",
      images: ["/images/spco-mnm-1.jpg", "/images/spco-mnm-2.jpg"]
    },
    {
      id: 3,
      title: t('perf3_title'),
      date: "YYYY",
      description: t('perf3_desc'),
      thumbnail: "/images/jfe-cooler-1.jpg",
      images: ["/images/jfe-cooler-1.jpg", "/images/jfe-cooler-2.jpg", "/images/jfe-cooler-3.jpg", "/images/jfe-cooler-4.jpg", "/images/jfe-cooler-5.jpg", "/images/jfe-cooler-6.jpg"]
    },
    {
      id: 4,
      title: t('perf4_title'),
      date: "YYYY",
      description: t('perf4_desc'),
      thumbnail: "/images/mhises-1.jpg",
      images: ["/images/mhises-1.jpg", "/images/mhises-2.jpg"]
    },
    {
      id: 5,
      title: t('perf5_title'),
      date: "YYYY",
      description: t('perf5_desc'),
      thumbnail: "/images/mhi-lf-1.jpg",
      images: ["/images/mhi-lf-1.jpg"]
    },
    {
      id: 6,
      title: t('perf6_title'),
      date: "YYYY",
      description: t('perf6_desc'),
      thumbnail: "/images/nmf-ring-1.jpg",
      images: ["/images/nmf-ring-1.jpg", "/images/nmf-ring-2.jpg"]
    },
    {
      id: 7,
      title: t('perf7_title'),
      date: "YYYY",
      description: t('perf7_desc'),
      thumbnail: "/images/nse-steel-1.jpg",
      images: ["/images/nse-steel-1.jpg", "/images/nse-steel-2.jpg", "/images/nse-steel-3.jpg", "/images/nse-steel-4.jpg", "/images/nse-steel-5.jpg", "/images/nse-steel-6.jpg", "/images/nse-steel-7.jpg", "/images/nse-steel-8.jpg", "/images/nse-steel-9.jpg"]
    },
    {
      id: 8,
      title: t('perf8_title'),
      date: "YYYY",
      description: t('perf8_desc'),
      thumbnail: "/images/stc-walkway-1.jpg",
      images: ["/images/stc-walkway-1.jpg", "/images/stc-walkway-2.jpg", "/images/stc-walkway-3.jpg", "/images/stc-walkway-4.jpg", "/images/stc-walkway-5.jpg"]
    },
    {
      id: 9,
      title: t('perf9_title'),
      date: "YYYY",
      description: t('perf9_desc'),
      thumbnail: "/images/dongkuk-cassette-1.jpg",
      images: ["/images/dongkuk-cassette-1.jpg", "/images/dongkuk-cassette-2.jpg", "/images/dongkuk-cassette-3.jpg", "/images/dongkuk-cassette-4.jpg"]
    },
    {
      id: 10,
      title: t('perf10_title'),
      date: "YYYY",
      description: t('perf10_desc'),
      thumbnail: "/images/hyundai-buffer-1.jpg",
      images: ["/images/hyundai-buffer-1.jpg", "/images/hyundai-buffer-2.jpg"]
    },
    {
      id: 11,
      title: t('perf11_title'),
      date: "YYYY",
      description: t('perf11_desc'),
      thumbnail: "/images/hyundai-ladle-inflow-1.jpg",
      images: ["/images/hyundai-ladle-inflow-1.jpg", "/images/hyundai-ladle-inflow-2.jpg", "/images/hyundai-ladle-inflow-3.jpg"]
    },
    {
      id: 12,
      title: t('perf12_title'),
      date: "YYYY",
      description: t('perf12_desc'),
      thumbnail: "/images/hyundai-90t-ladle-1.jpg",
      images: ["/images/hyundai-90t-ladle-1.jpg", "/images/hyundai-90t-ladle-2.jpg", "/images/hyundai-90t-ladle-3.jpg"]
    },
    {
      id: 13,
      title: t('perf13_title'),
      date: "YYYY",
      description: t('perf13_desc'),
      thumbnail: "/images/hyundai-roof-1.jpg",
      images: ["/images/hyundai-roof-1.jpg", "/images/hyundai-roof-2.jpg", "/images/hyundai-roof-3.jpg", "/images/hyundai-roof-4.jpg"]
    },
    {
      id: 14,
      title: t('perf14_title'),
      date: "YYYY",
      description: t('perf14_desc'),
      thumbnail: "/images/hyundai-120t-pipe-1.jpg",
      images: ["/images/hyundai-120t-pipe-1.jpg", "/images/hyundai-120t-pipe-2.jpg", "/images/hyundai-120t-pipe-3.jpg", "/images/hyundai-120t-pipe-4.jpg"]
    },
    {
      id: 15,
      title: t('perf15_title'),
      date: "YYYY",
      description: t('perf15_desc'),
      thumbnail: "/images/daewoo-penstock-1.jpg",
      images: ["/images/daewoo-penstock-1.jpg", "/images/daewoo-penstock-2.jpg", "/images/daewoo-penstock-3.jpg", "/images/daewoo-penstock-4.jpg", "/images/daewoo-penstock-5.jpg", "/images/daewoo-penstock-6.jpg", "/images/daewoo-penstock-7.jpg", "/images/daewoo-penstock-8.jpg", "/images/daewoo-penstock-9.jpg", "/images/daewoo-penstock-10.jpg"]
    },
    {
      id: 16,
      title: t('perf16_title'),
      date: "YYYY",
      description: t('perf16_desc'),
      thumbnail: "/images/rcp-assembly-1.jpg",
      images: ["/images/rcp-assembly-1.jpg", "/images/rcp-assembly-2.jpg"]
    },
    {
      id: 17,
      title: t('perf17_title'),
      date: "YYYY",
      description: t('perf17_desc'),
      thumbnail: "/images/press-bending-1.jpg",
      images: ["/images/press-bending-1.jpg", "/images/press-bending-2.jpg", "/images/press-bending-3.jpg", "/images/press-bending-4.jpg", "/images/press-bending-5.jpg", "/images/press-bending-6.jpg", "/images/press-bending-7.jpg", "/images/press-bending-8.jpg"]
    },
    {
      id: 18,
      title: t('perf18_title'),
      date: "YYYY",
      description: t('perf18_desc'),
      thumbnail: "/images/cooling-conveyor-1.jpg",
      images: ["/images/cooling-conveyor-1.jpg", "/images/cooling-conveyor-2.jpg", "/images/cooling-conveyor-3.jpg"]
    },
    {
      id: 19,
      title: t('perf19_title'),
      date: "YYYY",
      description: t('perf19_desc'),
      thumbnail: "/images/samsung-base-1.jpg",
      images: ["/images/samsung-base-1.jpg", "/images/samsung-base-2.jpg", "/images/samsung-base-3.jpg", "/images/samsung-base-4.jpg", "/images/samsung-base-5.jpg"]
    },
    {
      id: 20,
      title: t('perf20_title'),
      date: "YYYY",
      description: t('perf20_desc'),
      thumbnail: "/images/dsmf-pipe-1.jpg",
      images: ["/images/dsmf-pipe-1.jpg", "/images/dsmf-pipe-2.jpg", "/images/dsmf-pipe-3.jpg", "/images/dsmf-pipe-4.jpg"]
    }
  ];

  const hasItems = projects.length > 0;

  // 모달 활성화 시 배경 스크롤 방지
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <>
      <SubPageBackground />
      <main className="min-h-screen bg-transparent pt-32 pb-24 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* 헤더 */}
        <div className="mb-14 border-b border-brand-red/20 pb-10">
          <Link
            href="/archives"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-brand-red transition-colors mb-6"
          >
            ← {t('nav_archives')}
          </Link>
          <div>
            <span className="text-xs font-bold tracking-widest text-brand-red uppercase block mb-3 bg-brand-red/10 w-fit px-3 py-1 rounded-full border border-brand-red/30">
              {t('perf_badge')}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              {t('perf_title')}
            </h1>
            <div className="w-16 h-[3px] bg-gradient-to-r from-brand-red to-red-500 mb-5" />
            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
              {t('perf_desc')}
            </p>
          </div>
        </div>

        {/* 갤러리 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 md:gap-16">
          {hasItems
            ? projects.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 hover:border-brand-red/50 shadow-lg hover:shadow-[0_8px_30px_rgba(229,9,20,0.15)] transition-all duration-500 bg-white flex flex-col cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* 이미지 썸네일 영역 (16:9) */}
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-100 flex items-center justify-center border-b border-slate-100">
                    {project.thumbnail ? (
                      <img
                        src={encodeURI(project.thumbnail)}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      // 이미지가 없을 때의 Placeholder
                      <div className="flex flex-col items-center justify-center text-slate-300 group-hover:text-brand-red/50 transition-colors duration-500 group-hover:scale-105 ease-out">
                        <svg
                          className="w-16 h-16 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-xs font-semibold uppercase tracking-widest">{t('perf_no_image')}</span>
                      </div>
                    )}
                    
                    {/* Hover Overlay Icon */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-brand-red text-white p-3 rounded-full shadow-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* 카드 텍스트 영역 */}
                  <div className="p-8 md:p-10 flex flex-col grow group-hover:bg-brand-red/[0.02] transition-colors duration-500">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black text-brand-red bg-brand-red/10 px-3 py-1.5 rounded-full border border-brand-red/20">
                        {project.date}
                      </span>
                      <span className="text-xs font-bold text-slate-400 border border-slate-200 px-2 py-1 rounded-md">
                        {t('perf_photo_count_1')}{project.images.length}{t('perf_photo_count_2')}
                      </span>
                    </div>
                    <h3 className="mb-3 font-black text-slate-900 text-xl md:text-2xl group-hover:text-brand-red transition-colors duration-300 leading-snug">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-slate-500 leading-relaxed text-sm md:text-base font-medium mb-6">
                        {project.description}
                      </p>
                    )}
                    
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-brand-red font-bold text-sm">
                      <span>{t('perf_view_more')}</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))
            : (
                <div className="col-span-full py-20 text-center text-slate-400">
                  {t('perf_no_data')}
                </div>
              )}
        </div>
      </div>

      {/* 팝업 모달 (Modal) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm transition-opacity">
          {/* 모달 닫기 배경 클릭 */}
          <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />
          
          <div className="relative w-full max-w-5xl bg-white rounded-2xl md:rounded-3xl shadow-2xl flex flex-col max-h-full overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* 모달 헤더 */}
            <div className="flex justify-between items-center p-5 md:p-6 border-b border-slate-200 bg-white z-10">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-brand-red mb-1">{selectedProject.date}</span>
                <h3 className="font-black text-slate-900 text-lg md:text-2xl">{selectedProject.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="p-2 text-slate-400 hover:text-brand-red hover:bg-red-50 rounded-full transition-colors flex-shrink-0 ml-4"
              >
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* 모달 갤러리 영역 */}
            <div className="p-5 md:p-8 overflow-y-auto bg-slate-50 flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {selectedProject.images.map((imgSrc, idx) => (
                  <div key={idx} className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm group">
                    <img 
                      src={encodeURI(imgSrc)} 
                      alt={`${selectedProject.title} 사진 ${idx + 1}`} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
                      {idx + 1} / {selectedProject.images.length}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
    </>
  );
}
