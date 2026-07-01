import { NextResponse } from "next/server";
import { sb } from "@/lib/worklog";

function checkPin(p) {
  return process.env.WORKLOG_ADMIN_PIN && String(p) === String(process.env.WORKLOG_ADMIN_PIN);
}
async function endWorkerOpen(wid) {
  const open = await sb(`work_sessions?select=id,started_at&worker_id=eq.${wid}&ended_at=is.null`);
  for (const s of open) {
    const m = Math.max(0, Math.round((Date.now() - new Date(s.started_at).getTime()) / 60000));
    await sb(`work_sessions?id=eq.${s.id}`, { method: "PATCH", body: { ended_at: new Date().toISOString(), minutes: m }, prefer: "return=minimal" });
  }
}

export async function POST(req) {
  try {
    const b = await req.json();
    if (!checkPin(b.adminPin)) return NextResponse.json({ error: "관리자 PIN이 올바르지 않습니다." }, { status: 401 });

    if (b.action === "state") {
      const workers = await sb("workers?select=id,name,team&order=team,name");
      const open = await sb("work_sessions?select=id,worker_id,job_id,category,zone,started_at&ended_at=is.null");
      const ids = [...new Set([...(b.jobIds || []), ...open.map((s) => s.job_id)])].filter((x) => x != null);
      let jobs = [];
      if (ids.length) jobs = await sb(`jobs?select=id,su_no,name,company&id=in.(${ids.join(",")})`);
      return NextResponse.json({ workers, open, jobs });
    }
    if (b.action === "alljobs") {
      const jobs = await sb("jobs?select=id,su_no,name,company&active=eq.true&order=su_no.desc&limit=500");
      return NextResponse.json({ jobs });
    }
    if (b.action === "search") {
      const q = encodeURIComponent((b.q || "").replace(/[%,()*]/g, ""));
      const jobs = await sb(`jobs?select=id,su_no,name,company&or=(name.ilike.*${q}*,su_no.ilike.*${q}*)&active=eq.true&order=su_no.desc&limit=20`);
      return NextResponse.json({ jobs });
    }
    if (b.action === "assign") {
      await endWorkerOpen(b.workerId);
      const ins = await sb("work_sessions", { method: "POST", body: { worker_id: Number(b.workerId), job_id: b.jobId ? Number(b.jobId) : null, category: b.category || "", zone: b.zone || null }, prefer: "return=representation" });
      return NextResponse.json({ session: ins[0] });
    }
    if (b.action === "end") {
      await endWorkerOpen(b.workerId);
      return NextResponse.json({ ok: true });
    }
    if (b.action === "endall") {
      const open = await sb("work_sessions?select=id,started_at&ended_at=is.null");
      for (const s of open) {
        const m = Math.max(0, Math.round((Date.now() - new Date(s.started_at).getTime()) / 60000));
        await sb(`work_sessions?id=eq.${s.id}`, { method: "PATCH", body: { ended_at: new Date().toISOString(), minutes: m }, prefer: "return=minimal" });
      }
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "알 수 없는 요청" }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
