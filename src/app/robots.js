const BASE_URL = "https://dushin-landing.vercel.app";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/worklog", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
