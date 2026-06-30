import { NextResponse } from "next/server";
import { sb, verifyToken, bearer } from "@/lib/worklog";

function today() {
  return new Date().toISOString().slice(0, 10);
}

// 오늘(또는 지정일) 내 기록 조회
export async function GET(req) {
  const workerId = verifyToken(bearer(req));
  if (!workerId) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date") || today();
    const logs = await sb(
      `work_logs?select=*&worker_id=eq.${workerId}&work_date=eq.${date}&order=start_time`
    );
    return NextResponse.json({ logs });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// 기록 한 줄 추가
export async function POST(req) {
  const workerId = verifyToken(bearer(req));
  if (!workerId) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  try {
    const body = await req.json();
    const row = {
      worker_id: Number(workerId),
      work_date: body.work_date || today(),
      start_time: body.start_time || null,
      end_time: body.end_time || null,
      task: body.task || "",
      site: body.site || "",
      category: body.category || "",
    };
    const inserted = await sb("work_logs", {
      method: "POST",
      body: row,
      prefer: "return=representation",
    });
    return NextResponse.json({ log: inserted[0] });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// 내 기록 한 줄 삭제
export async function DELETE(req) {
  const workerId = verifyToken(bearer(req));
  if (!workerId) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id가 필요합니다." }, { status: 400 });
    await sb(`work_logs?id=eq.${id}&worker_id=eq.${workerId}`, {
      method: "DELETE",
      prefer: "return=minimal",
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
