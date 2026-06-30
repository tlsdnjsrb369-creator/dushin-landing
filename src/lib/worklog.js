import crypto from "crypto";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const SECRET = process.env.WORKLOG_SECRET || "change-me-please";

// Supabase REST(PostgREST) 호출 헬퍼 — 서버에서만 사용 (서비스 키)
export async function sb(path, { method = "GET", body, prefer } = {}) {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    throw new Error("Supabase 환경변수(SUPABASE_URL / SUPABASE_SERVICE_KEY)가 설정되지 않았습니다.");
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase ${res.status}: ${text}`);
  }
  return res.status === 204 ? null : res.json();
}

// 로그인 토큰 (HMAC 서명) — 12시간 유효
export function signToken(workerId) {
  const exp = Date.now() + 1000 * 60 * 60 * 12;
  const payload = `${workerId}.${exp}`;
  const sig = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyToken(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [workerId, exp, sig] = parts;
  const expected = crypto.createHmac("sha256", SECRET).update(`${workerId}.${exp}`).digest("hex");
  if (sig !== expected) return null;
  if (Date.now() > Number(exp)) return null;
  return workerId;
}

export function bearer(req) {
  const auth = req.headers.get("authorization") || "";
  return auth.startsWith("Bearer ") ? auth.slice(7) : null;
}
