"use client";

import { useState } from "react";
import Link from "next/link";

export default function SessionsPage() {
  const [adminPin, setAdminPin] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [rows, setRows] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputCls = "rounded-lg border border-slate-300 px-3 py-2.5 text-base focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20";
  const mins = (s) => s.minutes != null ? s.minutes : Math.max(0, Math.round((Date.now() - new Date(s.started_at).getTime()) / 60000));
  const hhmm = (t) => t ? new Date(t).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }) : "";

  async function load(e) {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const r = await fetch("/api/worklog/admin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ adminPin, date, action: "sessions" }) });
      const d = await r.json();
      if (!r.ok) { setError(d.error || "조회 실패"); setRows(null); return; }
      setRows(d.sessions || []);
    } catch { setError("연결 실패"); } finally { setLoading(false); }
  }

  function csv() {
    if (!rows || !rows.length) return;
    const head = ["날짜", "직원", "동", "회사", "제품", "공정", "시작", "종료", "시간(분)"];
    const body = rows.map((s) => [date, s.workers?.name || "", s.zone || "", s.jobs?.company || "", s.jobs?.name || "", s.category || "", hhmm(s.started_at), s.ended_at ? hhmm(s.ended_at) : "진행중", mins(s)]);
    const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
    const text = [head, ...body].map((r) => r.map(esc).join(",")).join("\r\n");
    const blob = new Blob(["﻿" + text], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `작업기록_${date}.csv`; a.click();
  }

  // 제품별 합계
  const byJob = {};
  (rows || []).forEach((s) => { const k = s.jobs?.name || "(제품없음)"; byJob[k] = (byJob[k] || 0) + mins(s); });
  const jobSum = Object.entries(byJob).sort((a, b) => b[1] - a[1]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 pt-10 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-extrabold text-slate-900">작업 기록 조회</h1>
          <Link href="/worklog/admin" className="text-sm font-semibold text-slate-500 hover:text-brand-blue">← 관리자</Link>
        </div>

        <form onSubmit={load} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-wrap items-end gap-3 mb-6">
          <div><label className="text-xs font-bold text-slate-500 block mb-1">관리자 PIN</label><input type="password" value={adminPin} onChange={(e) => setAdminPin(e.target.value)} className={inputCls} required /></div>
          <div><label className="text-xs font-bold text-slate-500 block mb-1">날짜</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} /></div>
          <button type="submit" disabled={loading} className="py-2.5 px-6 rounded-lg bg-brand-blue text-white font-bold disabled:opacity-50">{loading ? "조회중" : "조회"}</button>
          {rows && rows.length > 0 && <button type="button" onClick={csv} className="py-2.5 px-6 rounded-lg border-2 border-slate-800 text-slate-800 font-bold hover:bg-slate-800 hover:text-white transition">엑셀 다운로드</button>}
        </form>

        {error && <p className="text-sm text-brand-red font-semibold mb-4">{error}</p>}

        {rows && (
          <>
            {/* 제품별 합계 */}
            {jobSum.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-4">
                <p className="text-sm font-bold text-slate-500 mb-2">제품별 합계 (오늘)</p>
                <div className="flex flex-col gap-1">
                  {jobSum.map(([name, m]) => (
                    <div key={name} className="flex justify-between text-sm border-b border-slate-100 py-1">
                      <span className="text-slate-700 line-clamp-1">{name}</span>
                      <span className="font-bold text-brand-blue whitespace-nowrap ml-3">{Math.floor(m / 60)}시간 {m % 60}분 <span className="text-slate-400 font-normal">({(m / 480).toFixed(2)}인일)</span></span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 상세 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
              {rows.length === 0 ? <p className="text-sm text-slate-400 text-center py-10">기록이 없습니다.</p> : (
                <table className="w-full text-sm">
                  <thead><tr className="bg-slate-50 text-slate-500 text-left">
                    <th className="px-3 py-3 font-bold">직원</th><th className="px-3 py-3 font-bold">동</th><th className="px-3 py-3 font-bold">제품</th><th className="px-3 py-3 font-bold">공정</th><th className="px-3 py-3 font-bold">시작</th><th className="px-3 py-3 font-bold">종료</th><th className="px-3 py-3 font-bold">분</th>
                  </tr></thead>
                  <tbody>
                    {rows.map((s) => (
                      <tr key={s.id} className="border-t border-slate-100">
                        <td className="px-3 py-2.5 font-semibold text-slate-800 whitespace-nowrap">{s.workers?.name}</td>
                        <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">{s.zone}</td>
                        <td className="px-3 py-2.5 text-slate-700">{s.jobs?.name}</td>
                        <td className="px-3 py-2.5 text-slate-600 whitespace-nowrap">{s.category}</td>
                        <td className="px-3 py-2.5 text-slate-500 whitespace-nowrap">{hhmm(s.started_at)}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap">{s.ended_at ? <span className="text-slate-500">{hhmm(s.ended_at)}</span> : <span className="text-green-600 font-bold">진행중</span>}</td>
                        <td className="px-3 py-2.5 font-bold text-slate-800 whitespace-nowrap">{mins(s)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
