"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PenTool, Settings, SearchCheck, Truck, ArrowRight } from "lucide-react";

export default function Problem() {
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
      icon: <PenTool className="w-8 h-8 text-neon-orange" />,
      title: "정밀 설계 및 자재 검수",
      subtitle: "Design & Material",
      desc: "요구사항 분석 후 최적의 제작 방향을 위한 1차 검토 및 정밀 설계(CAD)를 완료하고, 소재 입고 시 엄격한 검수를 거칩니다.",
      flow: ["수주", "설계", "소재입고"]
    },
    {
      step: "STEP 02",
      icon: <Settings className="w-8 h-8 text-neon-orange" />,
      title: "정밀 가공 및 제관",
      subtitle: "Machining & Welding",
      desc: "고이께 모형 절단기(CNC)를 사용해 정밀 커팅을 거친 후, 당사 최고의 기술진이 베벨링, 가용접 및 정밀 용접을 완벽하게 수행합니다.",
      flow: ["CNC Cutting", "베벨링 및 가용접", "용접"]
    },
    {
      step: "STEP 03",
      icon: <SearchCheck className="w-8 h-8 text-neon-orange" />,
      title: "비파괴 검사 및 완벽 QC",
      subtitle: "QC & Inspection",
      desc: "무결점 품질을 위해 4대 비파괴검사(RT, UT, MT, PT)와 소둔·쇼트·페인팅 처리를 거치며, 정밀 기계가공 및 기상검사로 오차를 제로화합니다.",
      flow: ["비파괴검사", "소둔, 쇼트, 페인팅", "기계가공", "기상검사"]
    },
    {
      step: "STEP 04",
      icon: <Truck className="w-8 h-8 text-neon-orange" />,
      title: "최종 조립 및 시운전 납품",
      subtitle: "Assembly & Delivery",
      desc: "가공된 제관품들을 완벽하게 조립하고 자체 시운전 및 발주처 최종 검사를 거쳐 안전한 패킹을 통해 현장 설치 및 납품을 완료합니다.",
      flow: ["조립작업", "시운전", "최종검사", "포장 및 출하", "설치 및 시운전"]
    }
  ];

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative py-24 bg-white border-y border-slate-200/80 overflow-hidden"
    >
      {/* 장식용 네온 탑 레이저 라인 */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-orange/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* 헤더 타이틀 */}
        <div className="problem-title text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-neon-orange uppercase block mb-3">
            MANUFACTURING PROCESS
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            15단계 원스톱 공정을 압축한<br />
            <span className="text-neon-orange">4단계 핵심 제조 프로세스</span>
          </h2>
          <div className="w-16 h-[2px] bg-neon-orange mx-auto mb-6 shadow-[0_2px_8px_rgba(255,85,0,0.4)]" />
          <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
            설계부터 납품까지 외주 없이 공장 내부에서 완벽하게 제어되는 당사만의 철저한 공정 시스템을 소개합니다.
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
              {/* 마우스 호버 시 활성화되는 네온 글로우 오버레이 */}
              <div className="absolute inset-0 bg-neon-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              {/* 탑 보더 네온 라이팅 효과 */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:from-neon-orange/50 group-hover:via-neon-orange group-hover:to-neon-orange/50 transition-all duration-500" />
              
              {/* 상단 STEP 및 아이콘 */}
              <div className="flex justify-between items-start mb-6">
                <span className="text-2xl font-black text-slate-200 group-hover:text-neon-orange/20 transition-colors duration-300">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:bg-neon-orange/10 group-hover:border-neon-orange/30 transition-all duration-300">
                  {item.icon}
                </div>
              </div>

              {/* 제목 및 부제목 */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-neon-orange transition-colors duration-300">
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
                      <span className="text-xs font-semibold text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-100 group-hover:border-neon-orange/30 transition-colors">
                        {flowItem}
                      </span>
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
