import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/providers/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://dushin-landing.vercel.app"),
  title: "(주)두신이엔지 | 용접·제관 전문 | 철강 설비 & 성형기 프레임 정밀 제조",
  description: "용접·제관 전문기업 (주)두신이엔지. 20년 이상의 정밀 기계 엔지니어링 기술력과 80TON 크레인 가공 인프라로 제철 설비·대형 철구조물·성형기 프레임을 제관·용접·정밀가공합니다. 4대 비파괴검사(RT/UT/MT/PT)와 은행 신용등급 B+로 입증된 무결점 품질과 납기를 약속합니다.",
  keywords: ["두신이엔지", "용접", "제관", "용접제관", "철구조물 제작", "제철설비", "성형기프레임", "중공업기계", "비파괴검사", "80톤크레인", "신용등급B+", "인천 용접제관", "인천 정밀기계", "산업용 기계 제작"],
  authors: [{ name: "Dushin Engineering" }],
  openGraph: {
    title: "(주)두신이엔지 | 용접·제관 전문 | 철강 설비 & 성형기 프레임 정밀 제조",
    description: "용접·제관 전문기업 (주)두신이엔지. 제철 설비·대형 철구조물·성형기 프레임을 제관·용접·정밀가공합니다. 80TON 크레인 인프라와 신용등급 B+의 재무 안정성.",
    type: "website",
    locale: "ko_KR",
    images: [{ url: "/factory_exterior.jpg", width: 1200, height: 630, alt: "(주)두신이엔지 공장 전경" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-800 selection:bg-brand-blue selection:text-white">
        <Providers>
          <Navbar />
          <main className="flex-1 w-full flex flex-col">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
