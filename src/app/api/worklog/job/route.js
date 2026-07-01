import { NextResponse } from "next/server";
import { sb } from "@/lib/worklog";

// QR/NFC 토큰으로 작업(제품) 조회
export async function GET(req) {
  try {
    const token = new URL(req.url).searchParams.get("token");
    if (!token) return NextResponse.json({ error: "토큰이 없습니다." }, { status: 400 });
    const rows = await sb(`jobs?select=id,su_no,name,company&qr_token=eq.${encodeURIComponent(token)}`);
    if (!rows[0]) return NextResponse.json({ error: "작업을 찾을 수 없습니다." }, { status: 404 });
    return NextResponse.json({ job: rows[0] });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
