const BASE_URL = "https://dushin-landing.vercel.app";

// 사이트 내 페이지 경로 (새 페이지를 추가하면 여기에도 추가하세요)
const routes = [
  "",
  "/about",
  "/services",
  "/inquiry",
  "/facilities",
  "/archives",
  "/archives/performance",
  "/archives/certificates",
];

export default function sitemap() {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
