"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldAlert, Clock, AlertTriangle } from "lucide-react";

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

  const problems = [
    {
      icon: <ShieldAlert className="w-8 h-8 text-neon-orange" />,
      title: "프레임 변형 & 품질 불일치",
      desc: "고하중 기계의 성형 및 압착 과정에서 프레임이 변형되거나 가공 편차가 발생하면 공장 전체의 생산 라인 정밀도가 붕괴되고 수명이 극도로 단축됩니다.",
      issue: "구조 해석 및 강성 설계 노하우가 부족한 업체의 제작 결함",
      neonColor: "neon-border-orange"
    },
    {
      icon: <Clock className="w-8 h-8 text-neon-orange" />,
      title: "약속 없는 납기 지연",
      desc: "제철 및 공장 설비는 조립 라인 셋업 시점이 고정되어 있어 단 며칠의 납기 지연도 수천만 원에서 수억 원에 달하는 공장 가동 정지 손실로 직결됩니다.",
      issue: "불투명한 공정 관리와 외주 가공에 의존한 일정 컨트롤 상실",
      neonColor: "neon-border-orange"
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-neon-orange" />,
      title: "재무 부실 및 지속 불가능성",
      desc: "수억 원대 이상의 중공업 및 대형 프레임 제작 프로젝트 중 제작 업체의 갑작스러운 재무 구조 악화 및 부도로 계약 이행이 불가해지는 치명적 리스크입니다.",
      issue: "불안정한 현금 흐름 및 외부 신용평가 미충족으로 인한 공급 중단",
      neonColor: "neon-border-orange"
    }
  ];

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative py-24 bg-[#08090d] border-y border-dark-border overflow-hidden"
    >
      {/* 장식용 네온 탑 레이저 라인 */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-orange/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* 헤더 타이틀 */}
        <div className="problem-title text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-neon-orange uppercase block mb-3">
            INDUSTRY PROBLEMS
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            중공업 및 설비 제작 시장의<br />
            <span className="text-neon-orange">3대 치명적 리스크</span>
          </h2>
          <div className="w-16 h-[2px] bg-neon-orange mx-auto mb-6 shadow-[0_0_8px_rgba(255,106,0,0.8)]" />
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            프레임 제작 및 철강 설비 조달 시, 품질과 일정 그리고 업체의 신뢰도는 사업 성공의 핵심 조건입니다. 타협할 수 없는 세 가지 리스크를 직시해야 합니다.
          </p>
        </div>

        {/* 3대 문제점 카드 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((prob, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group p-8 rounded-xl bg-dark-card border border-dark-border hover:bg-dark-card/80 transition-all duration-300 relative overflow-hidden"
            >
              {/* 마우스 호버 시 활성화되는 네온 글로우 오버레이 */}
              <div className="absolute inset-0 bg-neon-orange/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              {/* 탑 보더 네온 라이팅 효과 */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-neon-orange/20 group-hover:via-neon-orange group-hover:to-neon-orange/20 transition-all duration-500" />
              
              {/* 아이콘 */}
              <div className="w-16 h-16 rounded-xl bg-neon-orange/5 border border-neon-orange/20 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                {prob.icon}
              </div>

              {/* 제목 */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-neon-orange transition-colors duration-300">
                {prob.title}
              </h3>

              {/* 내용 */}
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {prob.desc}
              </p>

              {/* 원인 분석 */}
              <div className="border-t border-dark-border pt-4">
                <span className="text-xs font-semibold text-gray-500 block mb-1">원인 분석</span>
                <span className="text-xs text-gray-300 font-medium">
                  {prob.issue}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
