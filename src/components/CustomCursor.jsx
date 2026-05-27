"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // 터치 기기에서는 커스텀 커서 비활성화
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;

    if (!cursor || !dot) return;

    // 마우스 위치 초기화
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e) => {
      // 마우스 위치로 부드럽게 이동 (GSAP quickTo 활용)
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(cursor, {
        scale: 2,
        backgroundColor: "rgba(0, 242, 254, 0.1)",
        borderColor: "#39ff14",
        duration: 0.3
      });
      gsap.to(dot, {
        scale: 0.5,
        backgroundColor: "#00f2fe",
        duration: 0.3
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "#00f2fe",
        duration: 0.3
      });
      gsap.to(dot, {
        scale: 1,
        backgroundColor: "#39ff14",
        duration: 0.3
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    // 호버 애니메이션을 줄 요소들 탐색
    const links = document.querySelectorAll("a, button, [role='button'], input, textarea, select");
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={dotRef} className="custom-cursor-dot hidden md:block" />
    </>
  );
}
