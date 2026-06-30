import { NextResponse } from "next/server";
import { sb, signToken } from "@/lib/worklog";

// QR 스캔 자동 로그인 — QR에 담긴 비밀키(k)로 직원 확인
export async function POST(req) {
  try {
    const { k } = await req.json();
    if (!k) return NextResponse.json({ error: "QR 코드가 없습니다." }, { status: 400 });
    const rows = await sb(
      `workers?select=id,name,team&qr_token=eq.${encodeURIComponent(k)}`
    );
    const w = rows[0];
    if (!w) return NextResponse.json({ error: "QR 코드가 올바르지 않습니다." }, { status: 401 });
    const token = signToken(w.id);
    return NextResponse.json({ token, worker: { id: w.id, name: w.name, team: w.team } });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
