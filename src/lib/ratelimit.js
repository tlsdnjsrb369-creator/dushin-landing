// 아주 단순한 메모리 기반 속도 제한 (봇·무차별 대입 방지용)
// 서버리스 환경에서 완벽하진 않지만, 자동화된 반복 시도를 크게 줄여줍니다.
const buckets = new Map();

export function clientIp(req) {
  const xff = req.headers.get("x-forwarded-for") || "";
  return xff.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
}

/**
 * @param {string} key   구분 키 (예: `login:1.2.3.4`)
 * @param {number} limit 허용 횟수
 * @param {number} windowMs 시간 창(ms)
 * @returns {boolean} true = 허용, false = 차단
 */
export function rateLimit(key, limit = 10, windowMs = 60_000) {
  const now = Date.now();
  const hits = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5000) buckets.clear(); // 메모리 보호
  return true;
}
