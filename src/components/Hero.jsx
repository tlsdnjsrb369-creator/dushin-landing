"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ShieldCheck, Truck, Cpu } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const specCardsRef = useRef(null);
  const visualRef = useRef(null);

  // 카운터 숫자 엘리먼트 참조
  const count1Ref = useRef(null);
  const count2Ref = useRef(null);
  const count3Ref = useRef(null);

  useEffect(() => {
    // 진입 페이드인 애니메이션
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 }
      )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0 },
        "-=0.8"
      )
      .fromTo(
        buttonsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        specCardsRef.current.children,
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15 },
        "-=0.4"
      )
      .fromTo(
        visualRef.current,
        { opacity: 0, scale: 0.9, rotateY: 15 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 1.5, ease: "back.out(1.2)" },
        "-=0.8"
      );

      // 숫자 카운팅 업 애니메이션
      const countUp = (ref, targetValue, duration = 2) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetValue,
          duration: duration,
          ease: "power2.out",
          onUpdate: () => {
            if (ref.current) {
              // 80톤 및 20년 처럼 숫자로만 표현되는 경우와 신용등급 같은 문자 처리 구별
              ref.current.innerText = Math.floor(obj.val);
            }
          }
        });
      };

      countUp(count1Ref, 80, 2.5);
      countUp(count3Ref, 24, 2.2); // 2002년 설립 기준 24년 업력
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center tech-grid overflow-hidden"
    >
      {/* 백그라운드 빛 발산 효과 */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] glow-radial opacity-70 pointer-events-none rounded-full" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] glow-orange-radial opacity-40 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* 히어로 텍스트 영역 (12열 중 7열 차지) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* 배지 */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 w-fit mb-6">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-neon-cyan uppercase">
              Heavy Industry Engineering Leader
            </span>
          </div>

          {/* 타이틀 */}
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6"
          >
            철강 설비와 프레임의<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-[#00c6ff] to-neon-lime neon-text-cyan">
              미래를 포징(Forging)하다
            </span>
          </h1>

          {/* 서브텍스트 */}
          <p
            ref={subtitleRef}
            className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed mb-8"
          >
            (주)두신이엔지는 20년 이상의 축적된 엔지니어링 업력과 독보적인 가공 인프라를 바탕으로 제철 설비 및 성형기 프레임을 정밀 설계·제작합니다. 철저한 품질 경영과 칼날 같은 납기 준수로 파트너사에게 두터운 신뢰를 약속합니다.
          </p>

          {/* CTA 버튼 */}
          <div ref={buttonsRef} className="flex flex-wrap gap-4 mb-12">
            <a
              href="#cta"
              className="px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-lime text-black font-bold tracking-wider rounded-md hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(0,242,254,0.3)]"
            >
              프로젝트 의뢰
            </a>
            <a
              href="#solution"
              className="px-8 py-4 border border-gray-700 text-gray-300 font-semibold tracking-wider rounded-md hover:border-neon-cyan hover:text-white transition-all duration-300"
            >
              보유 설비 보기
            </a>
          </div>

          {/* 핵심 스펙 요약 카드 */}
          <div
            ref={specCardsRef}
            className="grid grid-cols-3 gap-4"
          >
            {/* 80톤 크레인 카드 */}
            <div className="p-4 rounded-xl bg-dark-card/60 border border-dark-border hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(0,242,254,0.1)] transition-all duration-300 flex flex-col justify-between">
              <span className="text-gray-500 text-xs font-semibold mb-1">인프라 역량</span>
              <div>
                <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  <span ref={count1Ref}>0</span>
                </span>
                <span className="text-neon-cyan font-bold text-sm ml-0.5">TON</span>
              </div>
              <span className="text-gray-400 text-xs mt-2 border-t border-dark-border pt-1 font-medium">대형 크레인 가공 인프라</span>
            </div>

            {/* 신용등급 카드 */}
            <div className="p-4 rounded-xl bg-dark-card/60 border border-dark-border hover:border-neon-lime/50 hover:shadow-[0_0_15px_rgba(57,255,20,0.1)] transition-all duration-300 flex flex-col justify-between">
              <span className="text-gray-500 text-xs font-semibold mb-1">재무 안정성</span>
              <div>
                <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  B<span className="text-neon-lime inline-block origin-center hover:scale-110 transition-transform cursor-default font-extrabold">+</span>
                </span>
              </div>
              <span className="text-gray-400 text-xs mt-2 border-t border-dark-border pt-1 font-medium">은행 기업신용등급평가</span>
            </div>

            {/* 설립년도 카드 */}
            <div className="p-4 rounded-xl bg-dark-card/60 border border-dark-border hover:border-neon-orange/50 hover:shadow-[0_0_15px_rgba(255,106,0,0.1)] transition-all duration-300 flex flex-col justify-between">
              <span className="text-gray-500 text-xs font-semibold mb-1">업력</span>
              <div>
                <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  <span ref={count3Ref}>0</span>
                </span>
                <span className="text-neon-orange font-bold text-sm ml-0.5">년+</span>
              </div>
              <span className="text-gray-400 text-xs mt-2 border-t border-dark-border pt-1 font-medium">2002년 설립 장기 신뢰</span>
            </div>
          </div>

        </div>

        {/* 히어로 비주얼 이미지 영역 (12열 중 5열 차지) */}
        <div ref={visualRef} className="lg:col-span-5 relative flex items-center justify-center perspective-1000">
          <div className="relative w-full aspect-square max-w-[450px] rounded-2xl overflow-hidden neon-border-cyan group border-2">
            
            {/* 오버레이 효과 */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-neon-cyan/5 mix-blend-overlay" />
            
            {/* 이미지 */}
            <Image
              src="/dushin_factory.png"
              alt="두신이엔지 미래형 스마트 팩토리 가공"
              fill
              priority
              sizes="(max-w-7xl) 40vw, 450px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* 이미지 위 오버레이 그리드 스캐너 가이드 */}
            <div className="absolute inset-0 border border-neon-cyan/20 pointer-events-none z-20 m-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="w-4 h-4 border-t-2 border-l-2 border-neon-cyan" />
                <div className="w-4 h-4 border-t-2 border-r-2 border-neon-cyan" />
              </div>
              
              {/* 스캐닝 레이저 라인 애니메이션 */}
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-neon-lime to-transparent opacity-80 shadow-[0_0_10px_rgba(57,255,20,0.8)] animate-bounce" />

              <div className="flex justify-between">
                <div className="w-4 h-4 border-b-2 border-l-2 border-neon-cyan" />
                <div className="w-4 h-4 border-b-2 border-r-2 border-neon-cyan" />
              </div>
            </div>

            {/* 상태 텍스트 배지 */}
            <div className="absolute bottom-4 left-4 z-20 flex gap-2">
              <span className="px-2 py-1 text-[10px] font-mono tracking-widest bg-dark-bg/80 border border-neon-lime/40 text-neon-lime rounded-md backdrop-blur">
                SYSTEM: ACTIVE
              </span>
              <span className="px-2 py-1 text-[10px] font-mono tracking-widest bg-dark-bg/80 border border-neon-cyan/40 text-neon-cyan rounded-md backdrop-blur">
                INFRA: CRANE_80T
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
