"use client";

import { useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";

export default function WorklogQrPage() {
  const [adminPin, setAdminPin] = useState("");
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const r = await fetch("/api/worklog/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminPin, action: "qrlist" }),
      });
      const d = await r.json();
      if (!r.ok) { setError(d.error || "조회에 실패했습니다."); setItems(null); return; }
      const origin = window.location.origin;
      const withQr = await Promise.all(
        (d.workers || []).map(async (w) => ({
          ...w,
          qr: await QRCode.toDataURL(`${origin}/worklog?k=${w.qr_token}`, { width: 240, margin: 1 }),
        }))
      );
      setItems(withQr);
    } catch {
      setError("QR 생성에 실패했습니다.");
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 pt-24 pb-16">
      <style>{"@media print{header,footer,.no-print{display:none!important}body{background:#fff!important}}"}</style>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-5 no-print">
          <h1 className="text-2xl font-extrabold text-slate-900">직원 QR 코드</h1>
          <Link href="/worklog/admin" className="text-sm font-semibold text-slate-500 hover:text-brand-blue">← 관리자</Link>
        </div>

        {!items && (
          <form onSubmit={load} className="no-print bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-wrap items-end gap-3 mb-6 max-w-md">
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">관리자 PIN</label>
              <input type="password" value={adminPin} onChange={(e) => setAdminPin(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-base focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20" required />
            </div>
            <button type="submit" disabled={loading}
              className="py-2.5 px-6 rounded-lg bg-brand-blue text-white font-bold hover:bg-blue-700 active:scale-95 transition disabled:opacity-50">
              {loading ? "생성 중..." : "QR 불러오기"}
            </button>
          </form>
        )}

        {error && <p className="text-sm text-brand-red font-semibold mb-4 no-print">{error}</p>}

        {items && (
          <>
            <div className="flex justify-between items-center mb-4 no-print">
              <p className="text-sm text-slate-500">직원에게 출력해 나눠주세요. 폰 카메라로 찍으면 자동 로그인됩니다.</p>
              <button onClick={() => window.print()}
                className="py-2.5 px-6 rounded-lg border-2 border-slate-800 text-slate-800 font-bold hover:bg-slate-800 hover:text-white transition">
                인쇄
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {items.map((w) => (
                <div key={w.id} className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col items-center text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.qr} alt={`${w.name} QR`} width={180} height={180} className="w-full max-w-[180px] h-auto" />
                  <p className="mt-2 text-base font-bold text-slate-900">{w.name}</p>
                  <p className="text-xs font-semibold text-slate-500">{w.team}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
