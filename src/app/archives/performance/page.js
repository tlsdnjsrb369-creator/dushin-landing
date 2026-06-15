"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// ── 실적 프로젝트 데이터 배열 ──────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: "SPCO Ferrocoke manufacturing facility(JFE공장) - 日本",
    date: "YYYY",
    description: "일본 JFE공장에 성공적으로 납품된 고효율 훼로코크스 생산 및 취급 핵심 설비입니다.",
    thumbnail: "/images/spco-1.jpg",
    images: [
      "/images/spco-1.jpg", "/images/spco-2.jpg", "/images/spco-3.jpg", "/images/spco-4.jpg",
      "/images/spco-5.jpg", "/images/spco-6.jpg", "/images/spco-7.jpg", "/images/spco-8.jpg"
    ]
  },
  {
    id: 2,
    title: "SPCO (MNM GUIDE RAIL)-日本",
    date: "YYYY",
    description: "MNM 가이드 레일 시스템으로 설비의 정밀한 이동 및 내구성을 향상시켰습니다.",
    thumbnail: "/images/spco-mnm-1.jpg",
    images: ["/images/spco-mnm-1.jpg", "/images/spco-mnm-2.jpg"]
  },
  {
    id: 3,
    title: "JFE 화성공장 (Primary Cooler)-日本",
    date: "YYYY",
    description: "고열 환경에서도 안정적인 냉각 성능을 발휘하는 프라이머리 쿨러(Primary Cooler)입니다.",
    thumbnail: "/images/jfe-cooler-1.jpg",
    images: ["/images/jfe-cooler-1.jpg", "/images/jfe-cooler-2.jpg", "/images/jfe-cooler-3.jpg", "/images/jfe-cooler-4.jpg", "/images/jfe-cooler-5.jpg", "/images/jfe-cooler-6.jpg"]
  },
  {
    id: 4,
    title: "MHISES-日本",
    date: "YYYY",
    description: "MHISES 전용 설비 파트로 까다로운 국제 규격을 충족하는 최고 수준의 품질을 보장합니다.",
    thumbnail: "/images/mhises-1.jpg",
    images: ["/images/mhises-1.jpg", "/images/mhises-2.jpg"]
  },
  {
    id: 5,
    title: "MHI(LF ROOF 제작)-인도네시아",
    date: "YYYY",
    description: "인도네시아 제철소 LF 공정 최적화를 위한 견고한 루프(ROOF) 설비 시공 실적입니다.",
    thumbnail: "/images/mhi-lf-1.jpg",
    images: ["/images/mhi-lf-1.jpg"]
  },
  {
    id: 6,
    title: "NMF 천정링(ETO OXYGEN)-日本",
    date: "YYYY",
    description: "극한의 압력과 온도를 견뎌내는 ETO OXYGEN 공정 맞춤형 특수 천정링 구조물입니다.",
    thumbnail: "/images/nmf-ring-1.jpg",
    images: ["/images/nmf-ring-1.jpg", "/images/nmf-ring-2.jpg"]
  },
  {
    id: 7,
    title: "금수산업(주)-(제강설비)日本 NSE",
    date: "YYYY",
    description: "일본 NSE 수출용 제강설비 제작 프로젝트로, 완벽한 용접과 조립 품질을 검증받았습니다.",
    thumbnail: "/images/nse-steel-1.jpg",
    images: ["/images/nse-steel-1.jpg", "/images/nse-steel-2.jpg", "/images/nse-steel-3.jpg", "/images/nse-steel-4.jpg", "/images/nse-steel-5.jpg", "/images/nse-steel-6.jpg", "/images/nse-steel-7.jpg", "/images/nse-steel-8.jpg", "/images/nse-steel-9.jpg"]
  },
  {
    id: 8,
    title: "STC 고순화로 및 WALKWAY-(주)썸백",
    date: "YYYY",
    description: "안전성과 운용 편의성을 동시에 고려하여 제작된 고순화로 및 전용 워크웨이 설비입니다.",
    thumbnail: "/images/stc-walkway-1.jpg",
    images: ["/images/stc-walkway-1.jpg", "/images/stc-walkway-2.jpg", "/images/stc-walkway-3.jpg", "/images/stc-walkway-4.jpg", "/images/stc-walkway-5.jpg"]
  },
  {
    id: 9,
    title: "동국제강 운반설비 CASSETTE(당진공장)",
    date: "YYYY",
    description: "동국제강 당진공장에 도입된 고중량 강판 운반용 카세트(Cassette) 시스템입니다.",
    thumbnail: "/images/dongkuk-cassette-1.jpg",
    images: ["/images/dongkuk-cassette-1.jpg", "/images/dongkuk-cassette-2.jpg", "/images/dongkuk-cassette-3.jpg", "/images/dongkuk-cassette-4.jpg"]
  },
  {
    id: 10,
    title: "포항 현대 완충통-용운중공업(주)",
    date: "YYYY",
    description: "용운중공업에 납품된 특수 완충통으로, 충격을 효과적으로 흡수하는 탁월한 설계가 적용되었습니다.",
    thumbnail: "/images/hyundai-buffer-1.jpg",
    images: ["/images/hyundai-buffer-1.jpg", "/images/hyundai-buffer-2.jpg"]
  },
  {
    id: 11,
    title: "현대제철 용강레들유입시공기-(당진공장)",
    date: "YYYY",
    description: "현대제철 당진공장의 용강 레들 공정을 위한 최첨단 자동 유입 및 시공 장비입니다.",
    thumbnail: "/images/hyundai-ladle-inflow-1.jpg",
    images: ["/images/hyundai-ladle-inflow-1.jpg", "/images/hyundai-ladle-inflow-2.jpg", "/images/hyundai-ladle-inflow-3.jpg"]
  },
  {
    id: 12,
    title: "현대제철 90TON 레들대차-(인천공장)",
    date: "YYYY",
    description: "90톤의 초고중량 용융 금속을 안전하고 신속하게 이송하기 위한 초대형 레들 대차입니다.",
    thumbnail: "/images/hyundai-90t-ladle-1.jpg",
    images: ["/images/hyundai-90t-ladle-1.jpg", "/images/hyundai-90t-ladle-2.jpg", "/images/hyundai-90t-ladle-3.jpg"]
  },
  {
    id: 13,
    title: "현대제철ROOF -(당진공장)",
    date: "YYYY",
    description: "현대제철 당진공장의 전기로 설비를 감싸며 고열과 분진을 차단하는 내화 루프 시스템입니다.",
    thumbnail: "/images/hyundai-roof-1.jpg",
    images: ["/images/hyundai-roof-1.jpg", "/images/hyundai-roof-2.jpg", "/images/hyundai-roof-3.jpg", "/images/hyundai-roof-4.jpg"]
  },
  {
    id: 14,
    title: "현대제철 120TON B로 접동관-(인천공장)",
    date: "YYYY",
    description: "120톤 규모의 B로 전기로에 부착되는 접동관으로 극한의 조업 환경을 견디도록 특수 코팅되었습니다.",
    thumbnail: "/images/hyundai-120t-pipe-1.jpg",
    images: ["/images/hyundai-120t-pipe-1.jpg", "/images/hyundai-120t-pipe-2.jpg", "/images/hyundai-120t-pipe-3.jpg", "/images/hyundai-120t-pipe-4.jpg"]
  },
  {
    id: 15,
    title: "필리핀 할루어 댐 STEEL PENSTOCK-(주)대우건설",
    date: "YYYY",
    description: "대우건설의 필리핀 할루어 댐 프로젝트에 납품된 초대형 수력 발전용 강철 수압관(Penstock)입니다.",
    thumbnail: "/images/daewoo-penstock-1.jpg",
    images: ["/images/daewoo-penstock-1.jpg", "/images/daewoo-penstock-2.jpg", "/images/daewoo-penstock-3.jpg", "/images/daewoo-penstock-4.jpg", "/images/daewoo-penstock-5.jpg", "/images/daewoo-penstock-6.jpg", "/images/daewoo-penstock-7.jpg", "/images/daewoo-penstock-8.jpg", "/images/daewoo-penstock-9.jpg", "/images/daewoo-penstock-10.jpg"]
  },
  {
    id: 16,
    title: "RCP 제작조립-(주)재원산업기계",
    date: "YYYY",
    description: "고성능 회전 제어 펌프(RCP)의 정밀한 제작 및 조립을 완수하여 파트너사의 신뢰를 얻은 실적입니다.",
    thumbnail: "/images/rcp-assembly-1.jpg",
    images: ["/images/rcp-assembly-1.jpg", "/images/rcp-assembly-2.jpg"]
  },
  {
    id: 17,
    title: "PRESS BENDING MACHINE(HUSTEEL)-(주)재원산업기계",
    date: "YYYY",
    description: "대형 강관(HUSTEEL)의 정밀 벤딩 가공을 가능케 하는 초대형 프레스 벤딩 머신의 뼈대 및 구동부 제작입니다.",
    thumbnail: "/images/press-bending-1.jpg",
    images: ["/images/press-bending-1.jpg", "/images/press-bending-2.jpg", "/images/press-bending-3.jpg", "/images/press-bending-4.jpg", "/images/press-bending-5.jpg", "/images/press-bending-6.jpg", "/images/press-bending-7.jpg", "/images/press-bending-8.jpg"]
  },
  {
    id: 18,
    title: "COOLING CONVEYOR-(주)일광메탈포밍",
    date: "YYYY",
    description: "고온 압연된 소재의 빠르고 균일한 온도 제어를 보장하는 맞춤형 쿨링 컨베이어 시스템입니다.",
    thumbnail: "/images/cooling-conveyor-1.jpg",
    images: ["/images/cooling-conveyor-1.jpg", "/images/cooling-conveyor-2.jpg", "/images/cooling-conveyor-3.jpg"]
  },
  {
    id: 19,
    title: "삼성전자 FAN&MOTOR BASE-(주)플랙트코리아",
    date: "YYYY",
    description: "삼성전자 첨단 설비에 들어가는 고속 회전체 모터와 팬의 진동을 완벽히 흡수하는 초정밀 베이스 프레임입니다.",
    thumbnail: "/images/samsung-base-1.jpg",
    images: ["/images/samsung-base-1.jpg", "/images/samsung-base-2.jpg", "/images/samsung-base-3.jpg", "/images/samsung-base-4.jpg", "/images/samsung-base-5.jpg"]
  },
  {
    id: 20,
    title: "DSMF Φ1350x560kw COLUMN PIPE-(주)대한중전기",
    date: "YYYY",
    description: "초고압 환경에서의 내구성을 보장하는 대구경(Φ1350) 중전기용 특수 컬럼 파이프(Column Pipe) 제작 납품입니다.",
    thumbnail: "/images/dsmf-pipe-1.jpg",
    images: ["/images/dsmf-pipe-1.jpg", "/images/dsmf-pipe-2.jpg", "/images/dsmf-pipe-3.jpg", "/images/dsmf-pipe-4.jpg"]
  }
];
// ────────────────────────────────────────────────────────────────────────

export default function PerformancePage() {
  const [selectedProject, setSelectedProject] = useState(null);
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
    <main className="min-h-screen bg-white pt-32 pb-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* 헤더 */}
        <div className="mb-14 border-b border-brand-red/20 pb-10">
          <Link
            href="/archives"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-brand-red transition-colors mb-6"
          >
            ← 기술자료실
          </Link>
          <div>
            <span className="text-xs font-bold tracking-widest text-brand-red uppercase block mb-3 bg-brand-red/10 w-fit px-3 py-1 rounded-full border border-brand-red/30">
              Performance
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              주요 납품 제작 실적
            </h1>
            <div className="w-16 h-[3px] bg-gradient-to-r from-brand-red to-red-500 mb-5" />
            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
              (주)두신이엔지가 지금까지 납품 및 제작한 주요 실적을 소개합니다.
              카드를 클릭하여 프로젝트 상세 사진 갤러리를 확인하세요.
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
                        <span className="text-xs font-semibold uppercase tracking-widest">No Image</span>
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
                        사진 {project.images.length}장
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
                      <span>사진 여러 장 보기</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))
            : (
                <div className="col-span-full py-20 text-center text-slate-400">
                  등록된 실적이 없습니다.
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
  );
}
