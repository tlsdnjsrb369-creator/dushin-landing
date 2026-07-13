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
  description: "용접·제관 전문기업 (주)두신이엔지. 2002년 설립 이래 축적된 용접·제관 기술로 제철 설비·대형 철구조물·성형기 프레임을 제작합니다. 절단·제관·용접·비파괴검사(RT/UT/MT/PT)는 자체 수행하고, 정밀가공은 검증된 협력사와 함께 일괄 책임집니다. 은행 기업신용평가 BB의 재무 건전성.",
  keywords: ["두신이엔지", "용접", "제관", "용접제관", "철구조물 제작", "제철설비", "성형기프레임", "대형중량물제작", "중공업기계", "비파괴검사", "신용등급BB", "인천 용접제관", "인천 제관", "산업용 기계 제작"],
  authors: [{ name: "Dushin Engineering" }],
  openGraph: {
    title: "(주)두신이엔지 | 용접·제관 전문 | 철강 설비 & 성형기 프레임 정밀 제조",
    description: "용접·제관 전문기업 (주)두신이엔지. 제철 설비·대형 철구조물·성형기 프레임을 용접·제관 자체 기술로 제작하고, 정밀가공은 검증된 협력사와 함께 책임집니다.",
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
