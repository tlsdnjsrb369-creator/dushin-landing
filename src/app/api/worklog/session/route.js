import { NextResponse } from "next/server";
import { sb, verifyToken, bearer } from "@/lib/worklog";

async function jobByToken(t) {
  if (!t) return null;
  const r = await sb(`jobs?select=id,name&qr_token=eq.${encodeURIComponent(t)}`);
  return r[0] || null;
}

// 현재 열려있는(미종료) 세션 조회
export async function GET(req) {
  const wid = verifyToken(bearer(req));
  if (!wid) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  try {
    const job = await jobByToken(new URL(req.url).searchParams.get("jobToken"));
    if (!job) return NextResponse.json({ error: "작업을 찾을 수 없습니다." }, { status: 404 });
    const rows = await sb(`work_sessions?select=*&worker_id=eq.${wid}&job_id=eq.${job.id}&ended_at=is.null&order=started_at.desc&limit=1`);
    return NextResponse.json({ open: rows[0] || null });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// 시작 / 종료
export async function POST(req) {
  const wid = verifyToken(bearer(req));
  if (!wid) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  try {
    const { jobToken, category, action } = await req.json();
    const job = await jobByToken(jobToken);
    if (!job) return NextResponse.json({ error: "작업을 찾을 수 없습니다." }, { status: 404 });

    if (action === "start") {
      // 한 번에 한 작업: 작업자의 기존 열린 세션 자동 종료
      const open = await sb(`work_sessions?select=id,started_at&worker_id=eq.${wid}&ended_at=is.null`);
      for (const s of open) {
        const m = Math.max(0, Math.round((Date.now() - new Date(s.started_at).getTime()) / 60000));
        await sb(`work_sessions?id=eq.${s.id}`, { method: "PATCH", body: { ended_at: new Date().toISOString(), minutes: m }, prefer: "return=minimal" });
      }
      const ins = await sb("work_sessions", { method: "POST", body: { worker_id: Number(wid), job_id: job.id, category: category || "" }, prefer: "return=representation" });
      return NextResponse.json({ session: ins[0] });
    } else {
      const open = await sb(`work_sessions?select=id,started_at&worker_id=eq.${wid}&job_id=eq.${job.id}&ended_at=is.null&order=started_at.desc&limit=1`);
      if (open[0]) {
        const m = Math.max(0, Math.round((Date.now() - new Date(open[0].started_at).getTime()) / 60000));
        await sb(`work_sessions?id=eq.${open[0].id}`, { method: "PATCH", body: { ended_at: new Date().toISOString(), minutes: m }, prefer: "return=minimal" });
      }
      return NextResponse.json({ ok: true });
    }
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
