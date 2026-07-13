"use client";

import { useState } from "react";
import Link from "next/link";

export default function ReportPage() {
  const [adminPin, setAdminPin] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [sessions, setSessions] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const r = await fetch("/api/worklog/admin", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminPin, date, action: "sessions" }),
      });
      const d = await r.json();
      if (!r.ok) { setError(d.error || "조회 실패"); setSessions(null); return; }
      setSessions(d.sessions || []);
    } catch { setError("연결 실패"); }
    finally { setLoading(false); }
  }

  const dur = (s) => s.minutes != null ? s.minutes : Math.max(0, Math.round((Date.now() - new Date(s.started_at).getTime()) / 60000));
  const hm = (m) => `${Math.floor(m / 60)}시간 ${m % 60}분`;
  const time = (t) => t ? new Date(t).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }) : "진행중";

  // 집계
  const byWorker = {}, byJob = {};
  (sessions || []).forEach((s) => {
    const wn = s.workers?.name || "-";
    byWorker[wn] = (byWorker[wn] || 0) + dur(s);
    const jn = s.jobs ? `${s.jobs.name} (${s.jobs.company || ""})` : "(제품없음)";
    byJob[jn] = (byJob[jn] || 0) + dur(s);
  });
  const workerRows = Object.entries(byWorker).sort((a, b) => b[1] - a[1]);
  const jobRows = Object.entries(byJob).sort((a, b) => b[1] - a[1]);

  function csv() {
    if (!sessions || sessions.length === 0) return;
    const head = ["날짜", "직원", "동", "공정", "제품", "회사", "수주번호", "시작", "종료", "분"];
    const rows = sessions.map((s) => [date, s.workers?.name || "", s.zone || "", s.category || "",
      s.jobs?.name || "", s.jobs?.company || "", s.jobs?.su_no || "", time(s.started_at), s.ended_at ? time(s.ended_at) : "진행중", dur(s)]);
    const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
    const c = [head, ...rows].map((r) => r.map(esc).join(",")).join("\r\n");
    const blob = new Blob(["﻿" + c], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `공수_${date}.csv`; a.click();
  }

  const inp = "rounded-lg border border-slate-300 px-3 py-2.5 text-base focus:border-brand-blue focus:outline-none";

  return (
    <div className="min-h-screen bg-slate-50 px-4 pt-10 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-extrabold text-slate-900">공수 집계</h1>
          <Link href="/worklog/admin" className="text-sm font-semibold text-slate-500 hover:text-brand-blue">← 관리자</Link>
        </div>

        <form onSubmit={load} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-wrap items-end gap-3 mb-6">
          <div><label className="text-xs font-bold text-slate-500 block mb-1">관리자 PIN</label><input type="password" value={adminPin} onChange={(e) => setAdminPin(e.target.value)} className={inp} required /></div>
          <div><label className="text-xs font-bold text-slate-500 block mb-1">날짜</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inp} /></div>
          <button type="submit" disabled={loading} className="py-2.5 px-6 rounded-lg bg-brand-blue text-white font-bold disabled:opacity-50">{loading ? "조회중..." : "조회"}</button>
          {sessions && sessions.length > 0 && <button type="button" onClick={csv} className="py-2.5 px-6 rounded-lg border-2 border-slate-800 text-slate-800 font-bold">엑셀 다운로드</button>}
        </form>

        {error && <p className="text-sm text-brand-red font-semibold mb-4">{error}</p>}

        {sessions && (sessions.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-10 bg-white rounded-xl border border-slate-200">이 날짜에 기록이 없어요.</p>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <h2 className="font-bold text-slate-700 mb-2">제품별 공수</h2>
                {jobRows.map(([k, m]) => (
                  <div key={k} className="flex justify-between text-sm py-1.5 border-b border-slate-50">
                    <span className="text-slate-700 line-clamp-1 mr-2">{k}</span><span className="font-bold text-brand-blue whitespace-nowrap">{hm(m)}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <h2 className="font-bold text-slate-700 mb-2">직원별 공수</h2>
                {workerRows.map(([k, m]) => (
                  <div key={k} className="flex justify-between text-sm py-1.5 border-b border-slate-50">
                    <span className="text-slate-700">{k}</span><span className="font-bold text-brand-blue">{hm(m)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-slate-50 text-slate-500 text-left">
                  <th className="px-3 py-2.5 font-bold">직원</th><th className="px-3 py-2.5 font-bold">동</th><th className="px-3 py-2.5 font-bold">공정</th>
                  <th className="px-3 py-2.5 font-bold">제품</th><th className="px-3 py-2.5 font-bold">시간</th><th className="px-3 py-2.5 font-bold">분</th>
                </tr></thead>
                <tbody>
                  {sessions.map((s) => (
                    <tr key={s.id} className="border-t border-slate-100">
                      <td className="px-3 py-2.5 font-semibold whitespace-nowrap">{s.workers?.name}</td>
                      <td className="px-3 py-2.5 text-slate-500">{s.zone}</td>
                      <td className="px-3 py-2.5 text-slate-600">{s.category}</td>
                      <td className="px-3 py-2.5 text-slate-600 line-clamp-1">{s.jobs?.name}</td>
                      <td className="px-3 py-2.5 text-slate-500 whitespace-nowrap">{time(s.started_at)}~{s.ended_at ? time(s.ended_at) : "진행중"}</td>
                      <td className="px-3 py-2.5 font-bold whitespace-nowrap">{dur(s)}분</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
