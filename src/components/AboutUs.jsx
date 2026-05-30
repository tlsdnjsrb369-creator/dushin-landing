"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building, Target, Users, MapPin, SearchCheck, Calendar, ShieldCheck, Phone, Printer } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";

export default function AboutUs() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("ceo");
  const sectionRef = useRef(null);
  const tabContentRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      // 섹션 타이틀 애니메이션
      gsap.fromTo(
        ".about-title",
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

  // 탭 변경 시 애니메이션
  useEffect(() => {
    if (!tabContentRef.current) return;
    
    gsap.fromTo(
      tabContentRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [activeTab]);

  const tabs = [
    { id: "ceo", label: t('about_tab1'), icon: <Users className="w-4 h-4" /> },
    { id: "status", label: t('about_tab2'), icon: <Building className="w-4 h-4" /> },
    { id: "history", label: t('about_tab3'), icon: <Calendar className="w-4 h-4" /> },
    { id: "philosophy", label: t('about_tab4'), icon: <Target className="w-4 h-4" /> },
    { id: "location", label: t('about_tab5'), icon: <MapPin className="w-4 h-4" /> },
    { id: "facilities", label: t('about_tab6'), icon: <SearchCheck className="w-4 h-4" /> }
  ];

  const renderTabContent = () => {
    return (
      <div ref={tabContentRef}>
        {activeTab === "ceo" && (
          <div className="flex flex-col items-center justify-center text-center h-full min-h-[350px] bg-slate-50/50 rounded-xl border border-slate-100 p-8">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm border border-slate-200">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">{t('about_tab1')}</h3>
            <p className="text-slate-500 font-medium leading-relaxed max-w-lg">
              {t('about_ceo_desc')}
            </p>
          </div>
        )}

        {activeTab === "status" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {[
              { label: t('about_status_company'), value: t('about_status_company_val') },
              { label: t('about_status_date'), value: t('about_status_date_val') },
              { label: t('about_status_ceo'), value: t('about_status_ceo_val') },
              { label: t('about_status_addr'), value: t('about_status_addr_val') },
              { label: t('about_status_prod'), value: t('about_status_prod_val') },
              { label: t('about_status_size'), value: t('about_status_size_val') }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-slate-400 mb-1">{item.label}</span>
                <span className="text-base font-semibold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "history" && (
          <div className="relative pl-6 md:pl-8 py-4 before:absolute before:inset-y-0 before:left-[11px] md:before:left-[15px] before:w-[2px] before:bg-slate-200">
            {[
              { year: "2002", text: t('about_history_1') },
              { year: "2010", text: t('about_history_2') },
              { year: "2013", text: t('about_history_3') },
              { year: "2016", text: t('about_history_4') },
              { year: "2019", text: t('about_history_5') },
              { year: "2023", text: t('about_history_6') }
            ].map((item, idx) => (
              <div key={idx} className="relative mb-8 last:mb-0 group">
                <div className="absolute -left-[30px] md:-left-[34px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-neon-cyan group-hover:bg-neon-cyan transition-colors duration-300 shadow-[0_0_8px_rgba(0,210,222,0.4)]" />
                <span className="text-neon-cyan font-bold text-sm md:text-base tracking-wider block mb-1">
                  {item.year}
                </span>
                <p className="text-slate-700 font-medium text-sm md:text-base leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "philosophy" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: t('about_phil1_title'),
                desc: t('about_phil1_desc'),
                icon: <ShieldCheck className="w-8 h-8 text-neon-cyan" />
              },
              {
                title: t('about_phil2_title'),
                desc: t('about_phil2_desc'),
                icon: <Target className="w-8 h-8 text-neon-cyan" />
              },
              {
                title: t('about_phil3_title'),
                desc: t('about_phil3_desc'),
                icon: <Calendar className="w-8 h-8 text-neon-cyan" />
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:border-neon-cyan hover:shadow-md group flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-1">{item.title}</h4>
                <p className="text-sm text-slate-600 font-medium leading-relaxed mt-2">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "location" && (
          <div className="flex flex-col gap-6">
            {/* 구글 지도 iframe */}
            <div className="w-full h-72 md:h-80 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden relative group shadow-inner">
              <iframe 
                src="https://www.google.com/maps?q=인천광역시+서구+검단천로356번길+46&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="두신이엔지 오시는 길"
              />
            </div>
            
            {/* 주소 및 연락처 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <MapPin className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-400 block mb-1">상세 주소</span>
                  <span className="text-sm font-semibold text-slate-800">인천광역시 서구 검단천로356번길 46<br/>(검단일반산업단지 내)</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <Phone className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-400 block mb-1">전화번호</span>
                    <span className="text-sm font-semibold text-slate-800">032-562-5494</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <Printer className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-400 block mb-1">팩스번호</span>
                    <span className="text-sm font-semibold text-slate-800">032-568-5494</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "facilities" && (
          <div className="flex flex-col gap-8 h-full">
            {/* 상단: 전경 갤러리 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { src: "/view-1.jpg", title: "㈜두신이엔지 회사 전경 1" },
                { src: "/view-2.jpg", title: "㈜두신이엔지 회사 전경 2" },
                { src: "/factory-a.jpg", title: "A동 중형 제작 및 조립라인 전경" },
                { src: "/factory-c.jpg", title: "C동 대형 제작 및 공장 전경" }
              ].map((img, idx) => (
                <div key={idx} className="relative aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden group border border-slate-200">
                  <div className="absolute inset-0 bg-slate-200 animate-pulse" /> {/* 이미지 없을 시 로딩 스켈레톤 효과 */}
                  <img 
                    src={img.src} 
                    alt={img.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-10"
                    onError={(e) => {
                      // 이미지가 없을 경우 빈 공간 유지
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* 그라데이션 오버레이 및 텍스트 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-20" />
                  <div className="absolute bottom-0 left-0 w-full p-4 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-white font-bold text-sm md:text-base drop-shadow-md">
                      {img.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 하단: 공장 레이아웃 및 크레인 스펙 */}
            <div className="bg-slate-900 rounded-xl p-6 flex flex-col gap-5 border border-slate-800">
              <div className="text-center mb-1">
                <span className="text-neon-cyan font-bold tracking-widest text-xs mb-1 block">FACTORY SPECIFICATION</span>
                <h5 className="text-white font-black text-lg">전체 면적: 450평 (38m x 39m)</h5>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* A동 */}
                <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-700/50 flex flex-col gap-2 relative overflow-hidden group/card hover:bg-slate-800 transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full bg-neon-lime" />
                  <div className="flex flex-col sm:flex-row lg:flex-col sm:justify-between sm:items-center lg:items-start gap-2 mb-1">
                    <span className="text-white font-bold text-base md:text-lg">A동 <span className="text-xs sm:text-sm font-medium text-slate-400 ml-1 sm:ml-2 block sm:inline lg:block mt-1 sm:mt-0 lg:mt-1">중형 제작 및 조립작업장</span></span>
                    <span className="text-xs font-mono text-neon-lime bg-neon-lime/10 px-2 py-1 rounded w-fit">14.5m x 38m</span>
                  </div>
                  <div className="bg-slate-900/50 rounded p-3 border border-slate-800 mt-auto">
                    <span className="text-[10px] font-bold text-slate-500 block mb-1">HOIST SPEC</span>
                    <span className="text-sm text-neon-cyan font-bold">10TON*5TON 2대, 5TON 1대</span>
                  </div>
                </div>
                {/* B동 */}
                <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-700/50 flex flex-col gap-2 relative overflow-hidden group/card hover:bg-slate-800 transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full bg-neon-orange" />
                  <div className="flex flex-col sm:flex-row lg:flex-col sm:justify-between sm:items-center lg:items-start gap-2 mb-1">
                    <span className="text-white font-bold text-base md:text-lg">B동 <span className="text-xs sm:text-sm font-medium text-slate-400 ml-1 sm:ml-2 block sm:inline lg:block mt-1 sm:mt-0 lg:mt-1">CNC 모형 절단장</span></span>
                    <span className="text-xs font-mono text-neon-orange bg-neon-orange/10 px-2 py-1 rounded w-fit">10m x 38m</span>
                  </div>
                  <div className="bg-slate-900/50 rounded p-3 border border-slate-800 mt-auto">
                    <span className="text-[10px] font-bold text-slate-500 block mb-1">HOIST SPEC</span>
                    <span className="text-sm text-neon-cyan font-bold">10TON 1대, 5TON 1대</span>
                  </div>
                </div>
                {/* C동 */}
                <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-700/50 flex flex-col gap-2 relative overflow-hidden group/card hover:bg-slate-800 transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#00b4d8]" />
                  <div className="flex flex-col sm:flex-row lg:flex-col sm:justify-between sm:items-center lg:items-start gap-2 mb-1">
                    <span className="text-white font-bold text-base md:text-lg">C동 <span className="text-xs sm:text-sm font-medium text-slate-400 ml-1 sm:ml-2 block sm:inline lg:block mt-1 sm:mt-0 lg:mt-1">대형 제작 및 가공작업장</span></span>
                    <span className="text-xs font-mono text-[#00b4d8] bg-[#00b4d8]/10 px-2 py-1 rounded w-fit">14.5m x 38m</span>
                  </div>
                  <div className="bg-slate-900/50 rounded p-3 border border-slate-800 mt-auto">
                    <span className="text-[10px] font-bold text-slate-500 block mb-1">HOIST SPEC</span>
                    <span className="text-sm text-neon-cyan font-bold">20TON*20TON 2대, 10TON 1대</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="about" ref={sectionRef} className="relative py-28 bg-white border-y border-slate-200/80 overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] glow-radial opacity-30 pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] glow-radial opacity-20 pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* 헤더 타이틀 */}
        <div className="about-title text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-neon-cyan uppercase block mb-3">
            ABOUT US
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            끊임없는 혁신과 기술력으로<br />
            <span className="text-[#00b4d8]">미래를 창조하는 기업</span>
          </h2>
          <div className="w-16 h-[2px] bg-neon-cyan mx-auto mb-6 shadow-[0_2px_8px_rgba(0,210,222,0.4)]" />
          <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
            (주)두신이엔지는 2002년 설립 이래 정밀 기계 및 대형 제철 설비 분야에서 독보적인 기술력과 인프라를 구축해 왔습니다.
          </p>
        </div>

        {/* 탭 네비게이터 및 콘텐츠 영역 */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
          
          {/* 좌측 탭 메뉴 (모바일에서는 상단) */}
          <div className="w-full lg:w-1/4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`min-w-fit lg:min-w-full px-5 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 font-bold text-sm md:text-base ${
                  activeTab === tab.id
                    ? "bg-slate-800 text-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] lg:translate-x-2"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 border border-slate-200/60"
                }`}
              >
                <span className={`${activeTab === tab.id ? "text-neon-cyan" : "text-slate-400"}`}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* 우측 탭 상세 콘텐츠 */}
          <div 
            className="w-full lg:w-3/4 bg-white rounded-2xl border border-slate-200/80 shadow-lg p-6 md:p-10 min-h-[400px]"
          >
            {renderTabContent()}
          </div>

        </div>

      </div>
    </section>
  );
}
