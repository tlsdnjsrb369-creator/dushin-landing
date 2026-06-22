"use client";
import SubPageBackground from "@/components/SubPageBackground";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Archive, Image as ImageIcon } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

const projects = [
  { id: 1, client: "SPCO 일본공사", name: "훼로코크스설비 / MNM GUIDE RAIL" },
  { id: 2, client: "JFE 일본공사", name: "프라이머리 쿨러" },
  { id: 3, client: "인도네시아 MHI", name: "LF ROOF 제작" },
  { id: 4, client: "금수산업", name: "제강설비 일본 NSE / ECO ARC로" },
  { id: 5, client: "㈜한일너클프레스", name: "1200ton, 300ton, 400ton, 500ton FRAME" },
  { id: 6, client: "㈜썸백", name: "VACUUM HOT PRESS / STC 고순화로" },
  { id: 7, client: "남양기공㈜", name: "HYD PRESS" },
  { id: 8, client: "미래특장차㈜", name: "특장 차량 프레임 설비" },
  { id: 9, client: "용운중공업㈜", name: "Tundish, 완충통 상하부" },
  { id: 10, client: "㈜대우건설", name: "필리핀 할루어 댐 STEEL PENSTOCK" },
  { id: 11, client: "㈜재원산업기계", name: "RCP 제작조립" },
  { id: 12, client: "㈜일광메탈포밍", name: "COOLING CONVEYOR" },
  { id: 13, client: "㈜플랙트코리아 삼성전자", name: "FAN & MOTOR BASE" },
  { id: 14, client: "㈜대한중전기", name: "COLUMN PIPE / DISCHARGE CASING" }
];

export default function ArchivesPage() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen py-24 bg-transparent overflow-hidden" ref={containerRef}>
      {/* 장식용 배경 요소 제거하여 극도의 미니멀리즘 유지 */}
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* 헤더 섹션 */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="w-16 h-16 rounded-none bg-white border border-black flex items-center justify-center mx-auto mb-8 transition-transform hover:scale-105 duration-300">
            <Archive className="w-8 h-8 text-black" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] sm:text-xs font-black tracking-[0.3em] text-black uppercase block mb-4">
            {t('archives_badge')}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-black mb-8 tracking-tighter uppercase leading-none">
            {t('archives_title_1')}<br/><span className="font-light">{t('archives_title_2')}</span>
          </h1>
          <div className="w-24 h-[1px] bg-black mx-auto mb-8" />
          <p className="text-black/70 text-sm md:text-base leading-relaxed font-light tracking-wide max-w-xl mx-auto">
            {t('archives_desc')}
          </p>
        </div>

        {/* 갤러리 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="project-card flex flex-col bg-white border border-black overflow-hidden group hover:-translate-y-1 transition-transform duration-500"
            >
              {/* 프로젝트 헤더 정보 */}
              <div className="p-6 border-b border-black bg-white group-hover:bg-black group-hover:text-white transition-colors duration-500">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-mono font-bold px-2 py-1 border border-current">
                    PROJ-{String(project.id).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">
                    {project.client}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black leading-tight tracking-tight">
                  {project.name}
                </h3>
              </div>

              {/* 이미지 슬롯 2장 구획 */}
              <div className="grid grid-cols-2 gap-px bg-black p-px">
                {/* 첫 번째 이미지 슬롯 */}
                <div className="relative aspect-[4/3] bg-white overflow-hidden flex items-center justify-center group/img">
                  <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                  <Image 
                    src={`/project${project.id}_1.jpg`} 
                    alt={`${project.name} 사진 1`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover z-10 transition-transform duration-700 group-hover/img:scale-105 grayscale group-hover/img:grayscale-0"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="z-0 flex flex-col items-center gap-2 text-black/20">
                    <ImageIcon className="w-6 h-6" strokeWidth={1} />
                    <span className="text-[10px] font-bold tracking-widest uppercase">Image 01</span>
                  </div>
                </div>

                {/* 두 번째 이미지 슬롯 */}
                <div className="relative aspect-[4/3] bg-white overflow-hidden flex items-center justify-center group/img">
                  <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                  <Image 
                    src={`/project${project.id}_2.jpg`} 
                    alt={`${project.name} 사진 2`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover z-10 transition-transform duration-700 group-hover/img:scale-105 grayscale group-hover/img:grayscale-0"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="z-0 flex flex-col items-center gap-2 text-black/20">
                    <ImageIcon className="w-6 h-6" strokeWidth={1} />
                    <span className="text-[10px] font-bold tracking-widest uppercase">Image 02</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
