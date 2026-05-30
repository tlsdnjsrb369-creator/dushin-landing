import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Link from "next/link";
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
  title: "(주)두신이엔지 | 프리미엄 철강 설비 & 성형기 프레임 정밀 제조",
  description: "20년 이상의 정밀 기계 엔지니어링 기술력, 80TON 크레인 보유 가공 인프라, 은행 신용등급 B+로 입증된 재무 안정성. 무결점 품질과 철저한 납기 준수를 약속하는 두신이엔지입니다.",
  keywords: ["두신이엔지", "제철설비", "성형기프레임", "중공업기계", "80톤크레인", "신용등급B+", "인천 정밀기계", "산업용 기계 제작"],
  authors: [{ name: "Dushin Engineering" }],
  openGraph: {
    title: "(주)두신이엔지 | 프리미엄 철강 설비 & 성형기 프레임 정밀 제조",
    description: "20년 이상의 정밀 기계 엔지니어링 기술력, 80TON 크레인 가공 인프라, 은행 신용등급 B+로 입증된 재무 안정성.",
    type: "website",
    locale: "ko_KR",
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
      <body className="min-h-full flex flex-col bg-white text-slate-800 selection:bg-neon-cyan selection:text-black">
        <Navbar />
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
        {/* 푸터 영역 */}
        <footer className="bg-dark-bg border-t border-dark-border py-12 relative z-10 mt-auto">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {/* 기업 정보 */}
            <div className="flex flex-col gap-2">
              <span className="font-bold text-lg text-white tracking-wider">
                (주)두신<span className="text-neon-cyan">이엔지</span>
              </span>
              <p className="text-xs text-gray-500 leading-relaxed max-w-md">
                주소: 인천광역시 서구 검단천로356번길 46 (오류동)<br />
                대표번호: 032-562-5494 | 팩스: 032-562-5495<br />
                이메일: skj1994@naver.com | 사업자등록번호: 137-81-94279
              </p>
            </div>

            {/* 링크 및 저작권 */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="flex gap-4">
                <Link href="/" className="text-xs text-gray-400 hover:text-neon-cyan transition-colors">홈</Link>
                <Link href="/about" className="text-xs text-gray-400 hover:text-neon-cyan transition-colors">회사소개</Link>
                <Link href="/services" className="text-xs text-gray-400 hover:text-neon-cyan transition-colors">제공 서비스</Link>
                <Link href="/inquiry" className="text-xs text-gray-400 hover:text-neon-cyan transition-colors">문의하기</Link>
              </div>
              <p className="text-[10px] text-gray-600">
                Copyright © {new Date().getFullYear()} Dushin Engineering. All Rights Reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
