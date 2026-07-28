import { NextResponse } from "next/server";
import { sb, signToken } from "@/lib/worklog";
import { rateLimit, clientIp } from "@/lib/ratelimit";

export async function POST(req) {
  try {
    // PIN 무차별 대입 방지: 같은 IP에서 1분에 10회까지
    if (!rateLimit(`worklog-login:${clientIp(req)}`, 10, 60_000)) {
      return NextResponse.json({ error: "시도 횟수가 많습니다. 잠시 후 다시 시도하세요." }, { status: 429 });
    }
    const { name, pin } = await req.json();
    if (!name || !pin) {
      return NextResponse.json({ error: "이름과 PIN을 입력하세요." }, { status: 400 });
    }
    const rows = await sb(
      `workers?select=id,name,team,pin&name=eq.${encodeURIComponent(name)}`
    );
    const w = rows[0];
    if (!w || String(w.pin) !== String(pin)) {
      return NextResponse.json({ error: "이름 또는 PIN이 올바르지 않습니다." }, { status: 401 });
    }
    const token = signToken(w.id);
    return NextResponse.json({ token, worker: { id: w.id, name: w.name, team: w.team } });
  } catch (e) {
    return NextResponse.json({ error: "요청 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}
