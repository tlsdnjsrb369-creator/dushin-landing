"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ShieldCheck, Truck, Cpu } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const specCardsRef = useRef(null);
  const visualRef = useRef(null);

  // 카운터 숫자 엘리먼트 참조
  const count1Ref = useRef(null);
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
              ref.current.innerText = Math.floor(obj.val);
            }
          }
        });
      };

      countUp(count1Ref, 80, 2.5);
      countUp(count3Ref, 24, 2.2); // 현재 기준 24년+ 업력
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center tech-grid overflow-hidden bg-white"
    >
      {/* 백그라운드 빛 발산 효과 */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] glow-radial opacity-60 pointer-events-none rounded-full" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] glow-orange-radial opacity-30 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* 히어로 텍스트 영역 (12열 중 7열 차지) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* 배지 */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 w-fit mb-6">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-slate-700 uppercase">
              {t('hero_badge')}
            </span>
          </div>

          {/* 타이틀 */}
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 mb-6"
          >
            {t('hero_title_1')}<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-blue-600 to-[#10b981] neon-text-cyan">
              {t('hero_title_2')}
            </span>
          </h1>

          {/* 서브텍스트 */}
          <p
            ref={subtitleRef}
            className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed mb-8 font-medium"
          >
            {t('hero_desc')}
          </p>

          {/* CTA 버튼 */}
          <div ref={buttonsRef} className="flex flex-wrap gap-4 mb-12">
            <Link
              href="/inquiry"
              className="px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-lime text-slate-900 font-extrabold tracking-wider rounded-md hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_15px_rgba(0,210,222,0.2)]"
            >
              {t('hero_btn_inquiry')}
            </Link>
            <Link
              href="/facilities"
              className="px-8 py-4 border border-slate-300 bg-white text-slate-700 font-bold tracking-wider rounded-md hover:border-neon-cyan hover:text-slate-900 transition-all duration-300 shadow-sm"
            >
              {t('hero_btn_facilities')}
            </Link>
          </div>

          {/* 핵심 스펙 요약 카드 (라이트 톤 수정) */}
          <div
            ref={specCardsRef}
            className="grid grid-cols-3 gap-4"
          >
            {/* 80톤 크레인 카드 */}
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-md hover:border-neon-cyan/50 hover:shadow-[0_4px_20px_rgba(0,210,222,0.1)] transition-all duration-300 flex flex-col justify-between">
              <span className="text-slate-400 text-xs font-bold mb-1">{t('hero_stat_infra')}</span>
              <div>
                <span className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                  <span ref={count1Ref}>0</span>
                </span>
                <span className="text-[#00b4d8] font-bold text-sm ml-0.5">TON</span>
              </div>
              <span className="text-slate-500 text-xs mt-2 border-t border-slate-100 pt-1 font-semibold">{t('hero_stat_infra_desc')}</span>
            </div>

            {/* 신용등급 카드 */}
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-md hover:border-neon-lime/50 hover:shadow-[0_4px_20px_rgba(46,220,16,0.1)] transition-all duration-300 flex flex-col justify-between">
              <span className="text-slate-400 text-xs font-bold mb-1">{t('hero_stat_finance')}</span>
              <div>
                <span className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                  B<span className="text-neon-lime inline-block origin-center hover:scale-110 transition-transform cursor-default font-extrabold">+</span>
                </span>
              </div>
              <span className="text-slate-500 text-xs mt-2 border-t border-slate-100 pt-1 font-semibold">{t('hero_stat_finance_desc')}</span>
            </div>

            {/* 설립년도 카드 */}
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-md hover:border-neon-orange/50 hover:shadow-[0_4px_20px_rgba(255,85,0,0.1)] transition-all duration-300 flex flex-col justify-between">
              <span className="text-slate-400 text-xs font-bold mb-1">{t('hero_stat_exp')}</span>
              <div>
                <span className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                  <span ref={count3Ref}>0</span>
                </span>
                <span className="text-neon-orange font-bold text-sm ml-0.5">+</span>
              </div>
              <span className="text-slate-500 text-xs mt-2 border-t border-slate-100 pt-1 font-semibold">{t('hero_stat_exp_desc')}</span>
            </div>
          </div>

        </div>

        {/* 히어로 비주얼 이미지 영역 (12열 중 5열 차지) */}
        <div ref={visualRef} className="lg:col-span-5 relative flex items-center justify-center perspective-1000">
          <div className="relative w-full aspect-square max-w-[450px] rounded-2xl overflow-hidden neon-border-cyan group border-2 bg-white shadow-xl">
            
            {/* 오버레이 효과 (라이트 모드용 화이트 그라데이션) */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-neon-cyan/2 mix-blend-overlay" />
            
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
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-neon-lime to-transparent opacity-80 shadow-[0_0_10px_rgba(46,220,16,0.8)] animate-bounce" />

              <div className="flex justify-between">
                <div className="w-4 h-4 border-b-2 border-l-2 border-neon-cyan" />
                <div className="w-4 h-4 border-b-2 border-r-2 border-neon-cyan" />
              </div>
            </div>

            {/* 상태 텍스트 배지 */}
            <div className="absolute bottom-4 left-4 z-20 flex gap-2">
              <span className="px-2 py-1 text-[10px] font-mono tracking-widest bg-white/95 border border-neon-lime/40 text-slate-800 rounded-md backdrop-blur shadow-sm">
                SYSTEM: ACTIVE
              </span>
              <span className="px-2 py-1 text-[10px] font-mono tracking-widest bg-white/95 border border-neon-cyan/40 text-slate-800 rounded-md backdrop-blur shadow-sm">
                INFRA: CRANE_80T
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
