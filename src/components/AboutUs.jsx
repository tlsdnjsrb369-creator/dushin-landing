"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building, Target, Users, MapPin, SearchCheck, Calendar, ShieldCheck, Phone, Printer } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";

const WeatherBadge = () => {
  const [weather, setWeather] = useState({ temp: null, icon: null });

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=37.58&longitude=126.63&current=temperature_2m,weather_code")
      .then(res => res.json())
      .then(data => {
        if (!data || !data.current) return;
        const temp = Math.round(data.current.temperature_2m);
        const code = data.current.weather_code;
        
        let icon = "☀️";
        if (code === 1 || code === 2 || code === 3) icon = "⛅";
        else if (code >= 45 && code <= 48) icon = "🌫️";
        else if (code >= 51 && code <= 67) icon = "🌧️";
        else if (code >= 71 && code <= 77) icon = "❄️";
        else if (code >= 80 && code <= 82) icon = "🌦️";
        else if (code >= 85 && code <= 86) icon = "🌨️";
        else if (code >= 95) icon = "⛈️";

        setWeather({ temp, icon });
      })
      .catch(err => console.error("Weather fetch failed", err));
  }, []);

  if (weather.temp === null) return null;

  return (
    <div className="bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-white/60 inline-flex items-center gap-1.5 self-start pointer-events-auto">
      <span className="text-sm leading-none">{weather.icon}</span>
      <span className="text-xs font-bold text-slate-800 tracking-tight">{weather.temp}°C</span>
      <span className="text-[10px] text-slate-500 font-semibold ml-0.5 tracking-wide">인천 검단</span>
    </div>
  );
};

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
                <div className="absolute -left-[30px] md:-left-[34px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-brand-blue group-hover:bg-brand-blue transition-colors duration-300 shadow-[0_0_8px_rgba(0,85,164,0.4)]" />
                <span className="text-brand-blue font-bold text-sm md:text-base tracking-wider block mb-1">
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
                icon: <ShieldCheck className="w-8 h-8 text-brand-blue" />
              },
              {
                title: t('about_phil2_title'),
                desc: t('about_phil2_desc'),
                icon: <Target className="w-8 h-8 text-brand-blue" />
              },
              {
                title: t('about_phil3_title'),
                desc: t('about_phil3_desc'),
                icon: <Calendar className="w-8 h-8 text-brand-blue" />
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:border-brand-blue hover:shadow-md group flex flex-col items-center text-center">
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
            {/* 구글 지도 iframe 및 오버레이 */}
            <div className="w-full h-[500px] md:h-[600px] bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200/80 overflow-hidden relative group shadow-sm p-1.5 md:p-2.5">
              <div className="w-full h-full relative rounded-lg overflow-hidden bg-slate-100">
                <iframe 
                  src="https://www.google.com/maps?q=인천광역시+서구+검단천로356번길+46&output=embed&z=15" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  title="두신이엔지 오시는 길"
                />
                
                {/* 커스텀 오버레이 (기존 구글맵 라벨 가리기 및 커스텀 정보 제공) */}
                <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-2 pointer-events-none">
                  <div 
                    className="bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-slate-100/50 flex flex-col pointer-events-auto cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => window.open('https://maps.google.com/?q=인천광역시 서구 검단천로356번길 46', '_blank')}
                  >
                    <h3 className="font-black text-slate-800 text-sm md:text-base mb-0.5 tracking-tight">(주)두신이엔지</h3>
                    <span className="text-[11px] text-slate-500 font-semibold tracking-wide">인천 서구 검단천로356번길 46</span>
                  </div>
                  <WeatherBadge />
                </div>
              </div>
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
          <div className="flex flex-col gap-12 h-full">
            {/* 상단: 대형 외부 전경 갤러리 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { src: "/factory_exterior.jpg", title: t('about_fac_img1') },
                { src: "/factory_exterior2.jpg", title: t('about_fac_img2') }
              ].map((img, idx) => (
                <div key={idx} className="relative aspect-video lg:aspect-[21/9] bg-slate-100 rounded-2xl overflow-hidden group border border-slate-200 shadow-md">
                  <div className="absolute inset-0 bg-slate-200 animate-pulse" /> {/* 로딩 스켈레톤 */}
                  <img 
                    src={img.src} 
                    alt={img.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-10"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  {/* 다크 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-20" />
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="w-10 h-1 bg-brand-red mb-3" />
                    <h4 className="text-white font-extrabold text-xl md:text-2xl drop-shadow-lg">
                      {img.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 하단: 3단 공장 레이아웃 (A, B, C동) */}
            <div className="flex flex-col gap-6 border-t border-slate-100 pt-8">
              <div className="text-left mb-2">
                <span className="text-brand-blue font-bold tracking-widest text-xs mb-2 block uppercase">Factory Facilities</span>
                <h5 className="text-slate-900 font-black text-2xl">{t('about_fac_area')}</h5>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    id: t('about_fac_a_badge'),
                    name: t('about_fac_a'),
                    img: "/factory_a.jpg",
                    size: "14.5m x 38m",
                    hoist: t('about_fac_a_hoist'),
                    colorClass: "bg-brand-red",
                    textClass: "text-brand-red"
                  },
                  {
                    id: t('about_fac_b_badge'),
                    name: t('about_fac_b'),
                    img: "/factory_b.jpg",
                    size: "10m x 38m",
                    hoist: t('about_fac_b_hoist'),
                    colorClass: "bg-slate-700",
                    textClass: "text-slate-700"
                  },
                  {
                    id: t('about_fac_c_badge'),
                    name: t('about_fac_c'),
                    img: "/factory_c.jpg",
                    size: "14.5m x 38m",
                    hoist: t('about_fac_c_hoist'),
                    colorClass: "bg-brand-blue",
                    textClass: "text-brand-blue"
                  }
                ].map((bldg, idx) => (
                  <div key={idx} className="group flex flex-col bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 relative">
                    <div className={`absolute top-0 left-0 w-full h-1 z-20 ${bldg.colorClass}`} />
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
                      <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                      <img 
                        src={bldg.img} 
                        alt={bldg.name} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 z-10"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div className="absolute top-3 left-3 z-20">
                        <span className="px-3 py-1.5 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold rounded shadow-sm border border-slate-700">
                          {bldg.id}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="font-extrabold text-slate-800 text-lg mb-4">{bldg.name}</h4>
                      <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-slate-100">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-400">{t('about_fac_size_label')}</span>
                          <span className="text-sm font-mono font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded">{bldg.size}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-400">{t('about_fac_hoist_label')}</span>
                          <span className={`text-sm font-bold ${bldg.textClass}`}>{bldg.hoist}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="about" ref={sectionRef} className="relative py-28 bg-transparent border-y border-slate-200/80 overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] glow-radial opacity-30 pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] glow-radial opacity-20 pointer-events-none rounded-full" />
      
      <div className={`mx-auto px-6 md:px-12 relative z-10 transition-all duration-700 ease-in-out ${activeTab === 'facilities' ? 'max-w-[100rem]' : 'max-w-7xl'}`}>
        
        {/* 헤더 타이틀 */}
        <div className="about-title text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-brand-blue uppercase block mb-3">
            {t('about_badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            {t('about_title_1')}<br />
            <span className="text-brand-blue">{t('about_title_2')}</span>
          </h2>
          <div className="w-16 h-[2px] bg-brand-blue mx-auto mb-6 shadow-[0_2px_8px_rgba(0,85,164,0.4)]" />
          <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
            {t('about_desc')}
          </p>
        </div>

        {/* 탭 네비게이터 및 콘텐츠 영역 */}
        <div className={`flex flex-col gap-10 lg:gap-12 items-start ${activeTab === 'facilities' ? 'lg:flex-col lg:items-center' : 'lg:flex-row'}`}>
          
          {/* 좌측 탭 메뉴 (모바일에서는 상단) */}
          <div className={`w-full flex gap-2 pb-4 lg:pb-0 hide-scrollbar ${
            activeTab === 'facilities' 
              ? 'flex-row overflow-x-auto justify-start lg:justify-center' 
              : 'lg:w-1/4 flex-row lg:flex-col overflow-x-auto lg:overflow-visible'
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`min-w-fit ${activeTab === 'facilities' ? 'px-6 py-4' : 'lg:min-w-full px-5 py-4'} rounded-xl flex items-center gap-3 transition-all duration-300 font-bold text-sm md:text-base ${
                  activeTab === tab.id
                    ? `bg-slate-900 text-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] ${activeTab === 'facilities' ? 'lg:-translate-y-1' : 'lg:translate-x-2'}`
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 border border-slate-200/60"
                }`}
              >
                <span className={`${activeTab === tab.id ? "text-brand-blue" : "text-slate-400"}`}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* 우측 탭 상세 콘텐츠 */}
          <div 
            className={`w-full bg-white rounded-2xl border border-slate-200/80 shadow-lg p-6 md:p-10 min-h-[400px] transition-all duration-500 ${
              activeTab === 'facilities' ? 'lg:w-full' : 'lg:w-3/4'
            }`}
          >
            {renderTabContent()}
          </div>

        </div>

      </div>
    </section>
  );
}
