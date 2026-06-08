"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, TrendingUp, Gem, ArrowRight, Award } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function Solution() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const tabContentRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      // 타이틀 애니메이션
      gsap.fromTo(
        ".solution-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 탭 변경 시 GSAP 전환 애니메이션
  useEffect(() => {
    if (!tabContentRef.current) return;
    
    gsap.fromTo(
      tabContentRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [activeTab]);

  const solutions = [
    {
      title: t('sol1_title'),
      badge: t('sol1_tag'),
      shortTitle: t('sol1_short'),
      icon: <Gem className="w-5 h-5" />,
      tagline: t('sol1_tagline'),
      desc: t('sol1_desc'),
      highlights: [
        t('sol1_h1'),
        t('sol1_h2'),
        t('sol1_h3')
      ],
      image: "/dushin_crane.png"
    },
    {
      title: t('sol2_title'),
      badge: t('sol2_tag'),
      shortTitle: t('sol2_short'),
      icon: <TrendingUp className="w-5 h-5" />,
      tagline: t('sol2_tagline'),
      desc: t('sol2_desc'),
      highlights: [
        t('sol2_h1'),
        t('sol2_h2'),
        t('sol2_h3')
      ],
      svgGraphic: true
    },
    {
      title: t('sol3_title'),
      badge: t('sol3_tag'),
      shortTitle: t('sol3_short'),
      icon: <ShieldCheck className="w-5 h-5" />,
      tagline: t('sol3_tagline'),
      desc: t('sol3_desc'),
      highlights: [
        t('sol3_h1'),
        t('sol3_h2'),
        t('sol3_h3')
      ],
      image: "/dushin_factory.png"
    }
  ];

  return (
    <section
      id="solution"
      ref={sectionRef}
      className="relative py-28 bg-white overflow-hidden"
    >
      {/* 장식용 배경 광원 */}
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] glow-radial opacity-40 pointer-events-none rounded-full" />
      <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] glow-orange-radial opacity-15 pointer-events-none rounded-full" />
      
      {/* 뒷배경 테크니컬 격자무늬 */}
      <div className="absolute inset-0 tech-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* 헤더 타이틀 */}
        <div className="solution-title text-center max-w-3xl mx-auto mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl" />
          <span className="relative z-10 text-xs font-bold tracking-widest text-brand-blue uppercase block mb-3">
            {t('solution_badge')}
          </span>
          <h2 className="relative z-10 text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            {t('solution_title_1')}<br />
            <span className="text-brand-blue">{t('solution_title_2')}</span>
          </h2>
          <div className="w-16 h-[2px] bg-brand-blue mx-auto mb-6 shadow-[0_2px_8px_rgba(0,85,164,0.4)] relative z-10" />
          <p className="relative z-10 text-slate-600 text-sm md:text-base leading-relaxed font-medium">
            {t('solution_desc')}
          </p>
        </div>

        {/* 대형 솔루션 탭 및 내용 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* 탭 네비게이터 (왼쪽 4열 차지) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {solutions.map((sol, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full p-5 rounded-xl border flex items-center gap-4 text-left transition-all duration-300 ${
                  activeTab === idx
                    ? "bg-white border-brand-red shadow-md translate-x-2 text-slate-800"
                    : "bg-slate-50/80 border-slate-200/80 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    activeTab === idx
                      ? "bg-brand-red text-white shadow-sm"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {sol.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 block mb-1">
                    {sol.badge}
                  </span>
                  <span className={`font-bold text-sm md:text-base ${activeTab === idx ? "text-slate-800" : "text-slate-500"}`}>
                    {sol.shortTitle}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* 탭 내용 상세 영역 (오른쪽 8열 차지) */}
          <div
            ref={tabContentRef}
            className="lg:col-span-8 p-8 md:p-10 rounded-2xl bg-slate-50 border border-slate-200/85 min-h-[500px] flex flex-col justify-between shadow-md"
          >
            <div>
              {/* 상단 레이아웃 배지 */}
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-6 mb-6">
                <div>
                  <span className="text-xs font-mono text-brand-red tracking-widest uppercase block mb-1">
                    {solutions[activeTab].badge}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-800">
                    {solutions[activeTab].title}
                  </h3>
                </div>
                <span className="text-3xl font-mono font-bold text-slate-300">
                  0{activeTab + 1}
                </span>
              </div>

              {/* 솔루션 태그라인 */}
              <h4 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
                <ArrowRight className="w-5 h-5" />
                {solutions[activeTab].tagline}
              </h4>

              {/* 솔루션 상세 설명 */}
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 font-medium">
                {solutions[activeTab].desc}
              </p>

              {/* 핵심 강점 리스트 */}
              <div className="flex flex-col gap-3 mb-8">
                {solutions[activeTab].highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm md:text-base font-semibold">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 비주얼 에셋 영역 */}
            <div className="w-full h-72 md:h-80 relative rounded-xl overflow-hidden border border-slate-200 shadow-inner group">
              {solutions[activeTab].svgGraphic ? (
                /* 신용등급 카드 그래픽 (SVG 기반) */
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200/50 flex items-center justify-center p-6">
                  <div className="text-center flex flex-col items-center">
                    {/* 방패와 등급 */}
                    <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                      <div className="absolute inset-0 border-2 border-dashed border-brand-red rounded-full animate-spin [animation-duration:15s]" />
                      <div className="w-16 h-16 rounded-full bg-white border border-brand-red/30 flex items-center justify-center shadow-sm">
                        <span className="text-3xl font-black text-slate-800 leading-none">B+</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-500 tracking-wider">
                      한국기업데이터 공인 신용평가결과
                    </span>
                    <span className="text-[10px] text-brand-red mt-1 font-mono tracking-widest font-bold">
                      FINANCIAL RATING: SECURE (B+)
                    </span>
                  </div>
                </div>
              ) : (
                /* 80TON 크레인 및 공장 가공 이미지 */
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10" />
                  <Image
                    src={solutions[activeTab].image}
                    alt={solutions[activeTab].title}
                    fill
                    sizes="(max-w-7xl) 60vw, 800px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* 정밀 가이드 스캔 라인 */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-brand-red shadow-[0_0_8px_rgba(229,9,20,0.8)] animate-pulse" />
                </>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
