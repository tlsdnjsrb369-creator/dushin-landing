"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useTranslation } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const titleRef   = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef  = useRef(null);
  const specCardsRef = useRef(null);

  // 숫자 카운터 참조
  const count1Ref = useRef(null);
  const count3Ref = useRef(null);

  useEffect(() => {
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
      );

      // 카운팅 업 애니메이션
      const countUp = (ref, target, dur = 2) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: dur,
          ease: "power2.out",
          onUpdate: () => {
            if (ref.current) ref.current.innerText = Math.floor(obj.val);
          },
        });
      };

      countUp(count1Ref, 80, 2.5);
      countUp(count3Ref, 24, 2.2);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-white"
    >
      {/* 배경 공장 사진 — opacity-25 (이전 0.10 대비 약 15% 더 선명) */}
      <Image
        src="/factory_exterior.jpg"
        alt="두신이엔지 공장 외관"
        fill
        priority
        className="object-cover opacity-25"
      />

      {/* 오버레이 — 이전 대비 불투명도를 낮춰 사진이 더 잘 비치도록 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/25 to-white/55 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center relative z-10">

        {/* 배지 */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-red/40 bg-brand-red/10 w-fit mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-brand-red uppercase">
            {t('hero_badge')}
          </span>
        </div>

        {/* 메인 타이틀 — 첫 줄 검은색, 두 번째 줄 블루→레드 그라디언트 유지 */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight text-slate-900 mb-6"
        >
          {t('hero_title_1')}<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-blue-500 to-brand-red">
            {t('hero_title_2')}
          </span>
        </h1>

        {/* 설명글 — 흰 배경에 어두운 회색 */}
        <p
          ref={subtitleRef}
          className="text-base md:text-xl text-slate-600 max-w-2xl leading-relaxed mb-10 font-medium"
        >
          {t('hero_desc')}
        </p>

        {/* CTA 버튼 2개 */}
        <div ref={buttonsRef} className="flex flex-wrap justify-center gap-4 mb-16">
          {/* 제작 문의하기 — 빨간 버튼 유지 */}
          <Link
            href="/inquiry"
            className="px-8 py-4 bg-gradient-to-r from-brand-red to-red-600 text-white font-extrabold tracking-wider rounded-md hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_15px_rgba(229,9,20,0.3)]"
          >
            {t('hero_btn_inquiry')}
          </Link>
          {/* 회사 전경 및 설비 — 흰 배경 친화적으로 어두운 테두리/글자색 */}
          <Link
            href="/about"
            className="px-8 py-4 border-2 border-slate-800 bg-white/70 backdrop-blur-sm text-slate-800 font-bold tracking-wider rounded-md hover:bg-slate-800 hover:text-white transition-all duration-300 shadow-sm"
          >
            {t('hero_btn_facilities')}
          </Link>
        </div>

        {/* 하단 정보 카드 3개 — 흰 배경 라이트 카드 스타일 */}
        <div
          ref={specCardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
        >
          {/* 80TON 크레인 */}
          <div className="p-6 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200 shadow-md hover:border-brand-blue/60 hover:shadow-[0_4px_20px_rgba(0,85,164,0.15)] transition-all duration-300 flex flex-col justify-between text-left">
            <span className="text-slate-500 text-sm font-bold mb-2">{t('hero_stat_infra')}</span>
            <div>
              <span className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                <span ref={count1Ref}>80</span>
              </span>
              <span className="text-brand-blue font-bold text-lg ml-1">TON</span>
            </div>
            <span className="text-slate-400 text-xs mt-3 border-t border-slate-200 pt-2 font-semibold">
              {t('hero_stat_infra_desc')}
            </span>
          </div>

          {/* 신용등급 B+ */}
          <div className="p-6 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200 shadow-md hover:border-brand-red/60 hover:shadow-[0_4px_20px_rgba(229,9,20,0.15)] transition-all duration-300 flex flex-col justify-between text-left">
            <span className="text-slate-500 text-sm font-bold mb-2">{t('hero_stat_finance')}</span>
            <div>
              <span className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                B<span className="text-brand-red inline-block origin-center hover:scale-110 transition-transform cursor-default font-extrabold">+</span>
              </span>
            </div>
            <span className="text-slate-400 text-xs mt-3 border-t border-slate-200 pt-2 font-semibold">
              {t('hero_stat_finance_desc')}
            </span>
          </div>

          {/* 업력 24+ */}
          <div className="p-6 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200 shadow-md hover:border-brand-blue/60 hover:shadow-[0_4px_20px_rgba(0,85,164,0.15)] transition-all duration-300 flex flex-col justify-between text-left">
            <span className="text-slate-500 text-sm font-bold mb-2">{t('hero_stat_exp')}</span>
            <div>
              <span className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                <span ref={count3Ref}>24</span>
              </span>
              <span className="text-brand-red font-bold text-lg ml-1">+</span>
            </div>
            <span className="text-slate-400 text-xs mt-3 border-t border-slate-200 pt-2 font-semibold">
              {t('hero_stat_exp_desc')}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
