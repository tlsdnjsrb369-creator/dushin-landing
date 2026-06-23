"use client";
import { Suspense } from "react";
import SubPageBackground from "@/components/SubPageBackground";
import AboutUs from "@/components/AboutUs";

export default function AboutPage() {
  return (
    <>
      <SubPageBackground />
      <Suspense fallback={null}>
        <AboutUs />
      </Suspense>
    </>
  );
}
