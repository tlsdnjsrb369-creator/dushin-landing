import { NextResponse } from "next/server";
import { sb } from "@/lib/worklog";

// 로그인 화면 드롭다운용 — 이름·소속만 반환 (PIN/QR키 노출 안 함)
export async function GET() {
  try {
    const workers = await sb("workers?select=id,name,team&order=team,name");
    return NextResponse.json({ workers });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
