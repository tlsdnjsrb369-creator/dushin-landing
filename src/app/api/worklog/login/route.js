import { NextResponse } from "next/server";
import { sb, signToken } from "@/lib/worklog";

export async function POST(req) {
  try {
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
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
