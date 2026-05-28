import { Geist, Geist_Mono } from "next/font/google";
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
        {children}
      </body>
    </html>
  );
}
