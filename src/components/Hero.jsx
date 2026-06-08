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
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-slate-900"
    >
      {/* 백그라운드 공장 외관 이미지 */}
      <Image
        src="/factory_exterior.jpg"
        alt="두신이엔지 공장 외관"
        fill
        priority
        className="object-cover opacity-30"
      />
      {/* 다크 네이비 오버레이 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center relative z-10">
        
        {/* 배지 */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-red/30 bg-brand-red/10 w-fit mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-white uppercase">
            {t('hero_badge')}
          </span>
        </div>

        {/* 타이틀 */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-lg"
        >
          {t('hero_title_1')}<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-blue-400 to-brand-red brand-text-blue">
            {t('hero_title_2')}
          </span>
        </h1>

        {/* 서브텍스트 */}
        <p
          ref={subtitleRef}
          className="text-base md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10 font-medium drop-shadow-md"
        >
          {t('hero_desc')}
        </p>

        {/* CTA 버튼 */}
        <div ref={buttonsRef} className="flex flex-wrap justify-center gap-4 mb-16">
          <Link
            href="/inquiry"
            className="px-8 py-4 bg-gradient-to-r from-brand-red to-red-600 text-white font-extrabold tracking-wider rounded-md hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_15px_rgba(229,9,20,0.3)]"
          >
            {t('hero_btn_inquiry')}
          </Link>
          <Link
            href="/facilities"
            className="px-8 py-4 border border-slate-500 bg-slate-900/50 backdrop-blur-sm text-white font-bold tracking-wider rounded-md hover:border-brand-blue hover:bg-brand-blue/20 transition-all duration-300 shadow-sm"
          >
            {t('hero_btn_facilities')}
          </Link>
        </div>

        {/* 핵심 스펙 요약 카드 (다크 톤 수정) */}
        <div
          ref={specCardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
        >
          {/* 80톤 크레인 카드 */}
          <div className="p-6 rounded-xl bg-slate-800/80 backdrop-blur-md border border-slate-700 shadow-lg hover:border-brand-blue/50 hover:shadow-[0_4px_20px_rgba(0,85,164,0.2)] transition-all duration-300 flex flex-col justify-between text-left">
            <span className="text-slate-400 text-sm font-bold mb-2">{t('hero_stat_infra')}</span>
            <div>
              <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                <span ref={count1Ref}>0</span>
              </span>
              <span className="text-brand-blue font-bold text-lg ml-1">TON</span>
            </div>
            <span className="text-slate-400 text-xs mt-3 border-t border-slate-700 pt-2 font-semibold">{t('hero_stat_infra_desc')}</span>
          </div>

          {/* 신용등급 카드 */}
          <div className="p-6 rounded-xl bg-slate-800/80 backdrop-blur-md border border-slate-700 shadow-lg hover:border-brand-red/50 hover:shadow-[0_4px_20px_rgba(229,9,20,0.2)] transition-all duration-300 flex flex-col justify-between text-left">
            <span className="text-slate-400 text-sm font-bold mb-2">{t('hero_stat_finance')}</span>
            <div>
              <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                B<span className="text-brand-red inline-block origin-center hover:scale-110 transition-transform cursor-default font-extrabold">+</span>
              </span>
            </div>
            <span className="text-slate-400 text-xs mt-3 border-t border-slate-700 pt-2 font-semibold">{t('hero_stat_finance_desc')}</span>
          </div>

          {/* 설립년도 카드 */}
          <div className="p-6 rounded-xl bg-slate-800/80 backdrop-blur-md border border-slate-700 shadow-lg hover:border-brand-blue/50 hover:shadow-[0_4px_20px_rgba(0,85,164,0.2)] transition-all duration-300 flex flex-col justify-between text-left">
            <span className="text-slate-400 text-sm font-bold mb-2">{t('hero_stat_exp')}</span>
            <div>
              <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                <span ref={count3Ref}>0</span>
              </span>
              <span className="text-brand-red font-bold text-lg ml-1">+</span>
            </div>
            <span className="text-slate-400 text-xs mt-3 border-t border-slate-700 pt-2 font-semibold">{t('hero_stat_exp_desc')}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
