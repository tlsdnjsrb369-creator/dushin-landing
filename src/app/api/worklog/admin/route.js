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

    const d = date || new Date().toISOString().slice(0, 10);
    const logs = await sb(
      `work_logs?select=*,workers(name,team)&work_date=eq.${d}&order=worker_id,start_time`
    );
    return NextResponse.json({ logs });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
