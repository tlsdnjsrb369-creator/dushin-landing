import { NextResponse } from "next/server";
import { sb } from "@/lib/worklog";

function checkPin(adminPin) {
  return process.env.WORKLOG_ADMIN_PIN && String(adminPin) === String(process.env.WORKLOG_ADMIN_PIN);
}

// 관리자: PIN 확인 후 지정일의 전체 직원 기록 조회 (action 미지정)
//         action=qrlist 이면 직원별 QR키 목록 반환 (QR 인쇄용)
export async function POST(req) {
  try {
    const { adminPin, date, action } = await req.json();
    if (!checkPin(adminPin)) {
      return NextResponse.json({ error: "관리자 PIN이 올바르지 않습니다." }, { status: 401 });
    }

    if (action === "qrlist") {
      const workers = await sb("workers?select=id,name,team,qr_token&order=team,name");
      return NextResponse.json({ workers });
    }

    if (action === "joblist") {
      const jobs = await sb("jobs?select=id,su_no,name,company,qr_token&active=eq.true&order=su_no.desc");
      return NextResponse.json({ jobs });
    }

    if (action === "sessions") {
      const d = date || new Date().toISOString().slice(0, 10);
      const sessions = await sb(
        `work_sessions?select=*,workers(name),jobs(su_no,name,company)&started_at=gte.${d}T00:00:00&started_at=lte.${d}T23:59:59&order=started_at`
      );
      return NextResponse.json({ sessions });
    }

    const d = date || new Date().toISOString().slice(0, 10);
    const logs = await sb(
      `work_logs?select=*,workers(name,team)&work_date=eq.${d}&order=worker_id,start_time`
    );
    return NextResponse.json({ logs });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
