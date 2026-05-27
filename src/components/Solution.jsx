"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Anchor, HardHat, Award, ArrowRight } from "lucide-react";

export default function Solution() {
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
      title: "80TON 크레인 메가 인프라",
      badge: "INFRASTRUCTURE",
      shortTitle: "80TON 인프라",
      icon: <Anchor className="w-5 h-5" />,
      tagline: "초대형 제철 설비 및 프레임 자체 핸들링",
      desc: "외주 처리가 불가능한 수십 톤 단위의 대형 성형기 프레임과 철강 가공품을 공장 내부에서 80TON 크레인 설비로 직접 핸들링합니다. 공장 내부에서 조립, 가공, 검사까지 원스톱으로 이루어져 외주 이동에 따른 단차 손실이나 불필요한 물류 지연을 원천 차단합니다.",
      highlights: [
        "80TON 중량 리프팅 크레인 시스템 상시 가동",
        "외주 의존 없는 원스톱 인하우스(In-house) 생산 체계",
        "초대형 공작기계(MCT) 및 대형 베드 가공 장비 조화"
      ],
      image: "/dushin_crane.png"
    },
    {
      title: "은행 신용평가등급 B+ 재무안정성",
      badge: "FINANCIAL TRUST",
      shortTitle: "신용등급 B+",
      icon: <ShieldCheck className="w-5 h-5" />,
      tagline: "장기 대형 프로젝트 계약 이행력 100% 보장",
      desc: "공인 신용평가기관을 통해 획득한 은행 신용평가등급 B+ 보유. 이는 중소 제조 기업군 내에서 최우수 수준의 현금 흐름과 부채 관리력을 의미합니다. 대기업 및 공공 조달 납품 시 요구되는 최상위 자격을 충족하여 장기 기계 제작 중도금이나 선급금 리스크가 전혀 없습니다.",
      highlights: [
        "은행 신용등급평가 B+의 견고한 재무건전성",
        "기성금 유용 없는 100% 투명한 자금 운용 약속",
        "대형 조달 프로젝트의 안정적 이행 보증 및 책임감"
      ],
      svgGraphic: true
    },
    {
      title: "무결점 품질 & 칼날 같은 납기 보장",
      badge: "QUALITY & DELIVERY",
      shortTitle: "품질 & 납기 보장",
      icon: <HardHat className="w-5 h-5" />,
      tagline: "3D 시뮬레이션 설계 및 전수 검사 시스템",
      desc: "20년 기계 제작 원천 기술로 3D CAD/CAE 구조 해석을 진행하여 정밀 오차를 사전에 검증합니다. 실시간 공정 관리 소프트웨어로 단계별 일정을 체계적으로 보고하며, 조립 완료 후 ISO 기준에 의거한 레이저 얼라인먼트 전수 검사를 실행하여 약속된 일자에 완벽한 장비를 인도합니다.",
      highlights: [
        "자체 3D CAD/CAE 시뮬레이션을 통한 구조적 응력 사전 계산",
        "공정 단계별 실시간 모니터링을 통한 납기 지연 제로화",
        "출하 전 정밀 레이저 정밀도 테스트 및 성적서 발행"
      ],
      image: "/dushin_factory.png"
    }
  ];

  return (
    <section
      id="solution"
      ref={sectionRef}
      className="relative py-28 bg-dark-bg overflow-hidden"
    >
      {/* 장식용 배경 광원 */}
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] glow-radial opacity-50 pointer-events-none rounded-full" />
      <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] glow-orange-radial opacity-20 pointer-events-none rounded-full" />
      
      {/* 뒷배경 테크니컬 격자무늬 */}
      <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* 헤더 타이틀 */}
        <div className="solution-title text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-neon-lime uppercase block mb-3">
            DUSHIN SOLUTIONS
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            품질·납기·신용의 결합,<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-lime to-neon-cyan neon-text-lime">
              두신이엔지 엔지니어링 솔루션
            </span>
          </h2>
          <div className="w-16 h-[2px] bg-neon-lime mx-auto mb-6 shadow-[0_0_8px_rgba(57,255,20,0.8)]" />
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            축적된 20년 역량과 대형 설비 인프라, 든든한 재무 신용도로 고객사가 직면한 제조 및 공급망 리스크에 정답을 제시합니다.
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
                    ? "bg-dark-card border-neon-lime shadow-[0_0_15px_rgba(57,255,20,0.1)] translate-x-2"
                    : "bg-dark-card/40 border-dark-border text-gray-500 hover:border-gray-700 hover:text-gray-300"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    activeTab === idx
                      ? "bg-neon-lime text-black"
                      : "bg-dark-border text-gray-500"
                  }`}
                >
                  {sol.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-gray-500 block mb-1">
                    {sol.badge}
                  </span>
                  <span className={`font-bold text-sm md:text-base ${activeTab === idx ? "text-white" : "text-gray-400"}`}>
                    {sol.shortTitle}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* 탭 내용 상세 영역 (오른쪽 8열 차지) */}
          <div
            ref={tabContentRef}
            className="lg:col-span-8 p-8 md:p-10 rounded-2xl bg-dark-card border border-dark-border min-h-[500px] flex flex-col justify-between"
          >
            <div>
              {/* 상단 레이아웃 배지 */}
              <div className="flex items-center justify-between border-b border-dark-border pb-6 mb-6">
                <div>
                  <span className="text-xs font-mono text-neon-lime tracking-widest uppercase block mb-1">
                    {solutions[activeTab].badge}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    {solutions[activeTab].title}
                  </h3>
                </div>
                <span className="text-3xl font-mono font-bold text-gray-700">
                  0{activeTab + 1}
                </span>
              </div>

              {/* 솔루션 태그라인 */}
              <h4 className="text-lg font-bold text-neon-cyan mb-4 flex items-center gap-2">
                <ArrowRight className="w-5 h-5" />
                {solutions[activeTab].tagline}
              </h4>

              {/* 솔루션 상세 설명 */}
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
                {solutions[activeTab].desc}
              </p>

              {/* 핵심 강점 리스트 */}
              <div className="flex flex-col gap-3 mb-8">
                {solutions[activeTab].highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-neon-lime shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm md:text-base font-medium">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 비주얼 에셋 영역 */}
            <div className="w-full h-56 relative rounded-xl overflow-hidden border border-dark-border group">
              {solutions[activeTab].svgGraphic ? (
                /* 신용등급 카드 그래픽 (SVG 기반) */
                <div className="absolute inset-0 bg-gradient-to-br from-[#0c1424] to-[#07080b] flex items-center justify-center p-6">
                  <div className="text-center flex flex-col items-center">
                    {/* 방패와 등급 */}
                    <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                      <div className="absolute inset-0 border-2 border-dashed border-neon-lime rounded-full animate-spin [animation-duration:15s]" />
                      <div className="w-16 h-16 rounded-full bg-neon-lime/10 border border-neon-lime/40 flex items-center justify-center">
                        <span className="text-3xl font-black text-white leading-none">B+</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-400 tracking-wider">
                      한국기업데이터 공인 신용평가결과
                    </span>
                    <span className="text-[10px] text-neon-lime mt-1 font-mono tracking-widest">
                      FINANCIAL RATING: SECURE (B+)
                    </span>
                  </div>
                </div>
              ) : (
                /* 80TON 크레인 및 공장 가공 이미지 */
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent z-10" />
                  <Image
                    src={solutions[activeTab].image}
                    alt={solutions[activeTab].title}
                    fill
                    sizes="(max-w-7xl) 60vw, 800px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* 정밀 가이드 스캔 라인 */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-neon-lime shadow-[0_0_8px_rgba(57,255,20,0.8)] animate-pulse" />
                </>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
