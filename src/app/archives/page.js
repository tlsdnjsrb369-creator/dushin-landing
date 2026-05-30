"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Archive, Image as ImageIcon } from "lucide-react";

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
    <section className="relative min-h-screen py-24 bg-slate-50 overflow-hidden" ref={containerRef}>
      {/* 장식용 배경 요소 */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] glow-radial opacity-30 pointer-events-none rounded-full" />
      <div className="absolute bottom-[20%] right-[-15%] w-[600px] h-[600px] glow-orange-radial opacity-20 pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* 헤더 섹션 */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <Archive className="w-8 h-8 text-neon-cyan" />
          </div>
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase block mb-3">
            PORTFOLIO & ARCHIVES
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            2025/2026 주요 <span className="text-[#0077b6]">납품 실적</span>
          </h1>
          <div className="w-16 h-[2px] bg-neon-cyan mx-auto mb-6 shadow-[0_2px_8px_rgba(0,210,222,0.4)]" />
          <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
            (주)두신이엔지가 성공적으로 수행한 국내외 대형 프로젝트 갤러리입니다. 철저한 품질과 신뢰를 바탕으로 산업의 핵심 설비를 책임지고 있습니다.
          </p>
        </div>

        {/* 갤러리 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="project-card flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* 프로젝트 헤더 정보 */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 group-hover:bg-neon-cyan/5 transition-colors duration-300">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono font-bold text-neon-cyan bg-neon-cyan/10 px-2 py-1 rounded">
                    PROJ-{String(project.id).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-bold text-slate-400 tracking-wider">
                    {project.client}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800 leading-tight">
                  {project.name}
                </h3>
              </div>

              {/* 이미지 슬롯 2장 구획 */}
              <div className="grid grid-cols-2 gap-1 p-4 bg-white">
                {/* 첫 번째 이미지 슬롯 */}
                <div className="relative aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center group/img">
                  <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                  <Image 
                    src={`/project${project.id}_1.jpg`} 
                    alt={`${project.name} 사진 1`}
                    fill
                    sizes="(max-w-768px) 50vw, 25vw"
                    className="object-cover z-10 transition-transform duration-500 group-hover/img:scale-110"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="z-0 flex flex-col items-center gap-2 text-slate-400 opacity-50">
                    <ImageIcon className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Image 1</span>
                  </div>
                </div>

                {/* 두 번째 이미지 슬롯 */}
                <div className="relative aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center group/img">
                  <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                  <Image 
                    src={`/project${project.id}_2.jpg`} 
                    alt={`${project.name} 사진 2`}
                    fill
                    sizes="(max-w-768px) 50vw, 25vw"
                    className="object-cover z-10 transition-transform duration-500 group-hover/img:scale-110"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="z-0 flex flex-col items-center gap-2 text-slate-400 opacity-50">
                    <ImageIcon className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Image 2</span>
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
