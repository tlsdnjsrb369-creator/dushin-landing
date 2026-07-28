"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react";

// 화면 우측 하단 — 맨 위 / 맨 아래로 이동
export default function ScrollButtons() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 업무일지(내부 도구)에서는 숨김
  if (pathname?.startsWith("/worklog")) return null;

  const to = (top) => window.scrollTo({ top, behavior: "smooth" });

  return (
    <div
      className={`fixed right-4 md:right-6 bottom-6 z-40 flex flex-col gap-2 transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={() => to(0)}
        aria-label="맨 위로"
        className="w-11 h-11 rounded-full bg-white border border-slate-300 text-slate-700 shadow-lg flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-colors"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
      <button
        onClick={() => to(document.body.scrollHeight)}
        aria-label="맨 아래로"
        className="w-11 h-11 rounded-full bg-white border border-slate-300 text-slate-700 shadow-lg flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-colors"
      >
        <ChevronDown className="w-5 h-5" />
      </button>
    </div>
  );
}
