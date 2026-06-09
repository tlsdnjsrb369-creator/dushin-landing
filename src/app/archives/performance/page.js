import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "주요 납품 제작 실적 | (주)두신이엔지",
  description: "(주)두신이엔지의 주요 납품 및 제작 실적을 확인하세요.",
};

// ── 실적 사진이 준비되면 아래 배열에 항목을 추가하세요 ──────────────────
// 예시:
// { src: "/performance_001.jpg", title: "00제철소 설비 납품", year: "2024" }
const PERFORMANCE_ITEMS = [];
// ────────────────────────────────────────────────────────────────────────

const PLACEHOLDER_COUNT = 6; // 표시할 플레이스홀더 개수

export default function PerformancePage() {
  const hasItems = PERFORMANCE_ITEMS.length > 0;

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* 헤더 */}
        <div className="mb-14 border-b border-slate-200 pb-10">
          <Link
            href="/archives"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-brand-blue transition-colors mb-6"
          >
            ← 기술자료실
          </Link>
          <div>
            <span className="text-xs font-bold tracking-widest text-brand-blue uppercase block mb-3">
              Performance
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              주요 납품 제작 실적
            </h1>
            <div className="w-16 h-[2px] bg-brand-blue mb-5" />
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl">
              (주)두신이엔지가 지금까지 납품 및 제작한 주요 실적을 소개합니다.
              사진 등록은 아래 카드 영역에 이미지를 추가하여 업데이트할 수 있습니다.
            </p>
          </div>
        </div>

        {/* 갤러리 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasItems
            ? PERFORMANCE_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-bold text-brand-blue">{item.year}</span>
                    <h3 className="mt-1 font-bold text-slate-800 text-base">{item.title}</h3>
                  </div>
                </div>
              ))
            : Array.from({ length: PLACEHOLDER_COUNT }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 aspect-[4/3] p-8 text-center hover:border-brand-blue hover:bg-brand-blue/5 transition-all duration-300 group"
                >
                  {/* 이미지 아이콘 */}
                  <svg
                    className="w-12 h-12 text-slate-300 group-hover:text-brand-blue transition-colors duration-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm font-semibold text-slate-400 group-hover:text-brand-blue transition-colors duration-300">
                    이곳에 실적 사진을 등록하세요
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    ({idx + 1}번 슬롯)
                  </p>
                </div>
              ))}
        </div>

        {/* 안내 배너 */}
        {!hasItems && (
          <div className="mt-14 rounded-2xl bg-slate-900 text-white p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">📋 사진 등록 방법</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                <code className="text-brand-blue font-mono text-xs bg-slate-800 px-2 py-0.5 rounded">
                  src/app/archives/performance/page.js
                </code>{" "}
                파일 상단의 <code className="text-brand-blue font-mono text-xs bg-slate-800 px-2 py-0.5 rounded">PERFORMANCE_ITEMS</code> 배열에 항목을 추가하고, 해당 이미지 파일을{" "}
                <code className="text-brand-blue font-mono text-xs bg-slate-800 px-2 py-0.5 rounded">public/</code> 폴더에 업로드하면 자동으로 갤러리에 표시됩니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
