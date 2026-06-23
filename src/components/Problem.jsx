"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PenTool, Settings, SearchCheck, Truck, ArrowRight, ClipboardList, Monitor, Package, Scissors, Hammer, Flame, Paintbrush, Ruler, PlayCircle, CheckCircle, MapPin, Wrench } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function Problem() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // GSAP ScrollTrigger 등록
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const cards = cardsRef.current;
    if (!cards || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // 제목 페이드인 및 타이틀 네온 바 애니메이션
      gsap.fromTo(
        ".problem-title",
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

      // 카드들이 스크롤됨에 따라 하나씩 페이드인 & 올라옴
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      step: "STEP 01",
      icon: <PenTool className="w-8 h-8 text-brand-red" />,
      title: t('problem_step1'),
      subtitle: "Design & Material",
      desc: t('problem_step1_desc'),
      flow: [
        { label: t('process_01'), icon: <ClipboardList className="w-5 h-5" /> },
        { label: t('process_02'), icon: <Monitor className="w-5 h-5" /> },
        { label: t('process_03'), icon: <Package className="w-5 h-5" /> }
      ]
    },
    {
      step: "STEP 02",
      icon: <Settings className="w-8 h-8 text-brand-red" />,
      title: t('problem_step2'),
      subtitle: "Machining & Welding",
      desc: t('problem_step2_desc'),
      flow: [
        { label: t('process_04'), icon: <Scissors className="w-5 h-5" /> },
        { label: t('process_05'), icon: <Hammer className="w-5 h-5" /> },
        { label: t('process_06'), icon: <Flame className="w-5 h-5" /> }
      ]
    },
    {
      step: "STEP 03",
      icon: <SearchCheck className="w-8 h-8 text-brand-red" />,
      title: t('problem_step3'),
      subtitle: "QC & Inspection",
      desc: t('problem_step3_desc'),
      flow: [
        { label: t('process_07'), icon: <SearchCheck className="w-5 h-5" /> },
        { label: t('process_08'), icon: <Paintbrush className="w-5 h-5" /> },
        { label: t('process_09'), icon: <Settings className="w-5 h-5" /> },
        { label: t('process_10'), icon: <Ruler className="w-5 h-5" /> }
      ]
    },
    {
      step: "STEP 04",
      icon: <Truck className="w-8 h-8 text-brand-red" />,
      title: t('problem_step4'),
      subtitle: "Assembly & Delivery",
      desc: t('problem_step4_desc'),
      flow: [
        { label: t('process_11'), icon: <Wrench className="w-5 h-5" /> },
        { label: t('process_12'), icon: <PlayCircle className="w-5 h-5" /> },
        { label: t('process_13'), icon: <CheckCircle className="w-5 h-5" /> },
        { label: t('process_14'), icon: <Truck className="w-5 h-5" /> },
        { label: t('process_15'), icon: <MapPin className="w-5 h-5" /> }
      ]
    }
  ];

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative py-24 bg-transparent border-y border-slate-200/80 overflow-hidden"
    >
      {/* 장식용 탑 레이저 라인 */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="problem-title text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase block mb-3">
            {t('problem_badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            {t('problem_title_1')}<br />
            <span className="text-brand-red">{t('problem_title_2')}</span>
          </h2>
          <div className="w-16 h-[2px] bg-brand-red mx-auto mb-6 shadow-[0_2px_8px_rgba(229,9,20,0.4)]" />
          <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
            {t('problem_desc')}
          </p>
        </div>

        {/* 4단계 공정 카드 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group p-6 rounded-xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col"
            >
              {/* 마우스 호버 시 활성화되는 오버레이 */}
              <div className="absolute inset-0 bg-brand-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              {/* 탑 보더 라이팅 효과 */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:from-brand-red/50 group-hover:via-brand-red group-hover:to-brand-red/50 transition-all duration-500" />
              
              {/* 상단 STEP 및 아이콘 */}
              <div className="flex justify-between items-start mb-6">
                <span className="text-2xl font-black text-slate-200 group-hover:text-brand-red/20 transition-colors duration-300">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:bg-brand-red/10 group-hover:border-brand-red/30 transition-all duration-300">
                  {item.icon}
                </div>
              </div>

              {/* 제목 및 부제목 */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-brand-red transition-colors duration-300">
                  {item.title}
                </h3>
                <span className="text-xs font-bold text-slate-400 tracking-wider block uppercase">
                  {item.subtitle}
                </span>
              </div>

              {/* 내용 */}
              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium flex-grow">
                {item.desc}
              </p>

              {/* 세부 공정 흐름 */}
              <div className="border-t border-slate-100 pt-4 mt-auto">
                <span className="text-[10px] font-bold text-slate-400 block mb-3">상세 공정 흐름</span>
                <div className="flex flex-wrap gap-2 items-center">
                  {item.flow.map((flowItem, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <div className="group/btn flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-brand-red bg-slate-50 hover:bg-red-50/50 px-3 py-2 rounded border border-slate-100 hover:border-brand-red/50 transition-colors duration-300 cursor-default">
                        <div className="w-5 h-5 flex items-center justify-center opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 flex-shrink-0">
                          {flowItem.icon}
                        </div>
                        <span className="whitespace-nowrap">{flowItem.label}</span>
                      </div>
                      {fIdx < item.flow.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-slate-300" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
