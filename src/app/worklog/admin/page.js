"use client";

import { useState } from "react";
import Link from "next/link";

export default function WorklogAdminPage() {
  const [adminPin, setAdminPin] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [logs, setLogs] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputCls = "rounded-lg border border-slate-300 px-3 py-2.5 text-base focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20";

  async function load(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const r = await fetch("/api/worklog/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminPin, date }),
      });
      const d = await r.json();
      if (!r.ok) { setError(d.error || "조회에 실패했습니다."); setLogs(null); return; }
      setLogs(d.logs || []);
    } catch {
      setError("연결에 실패했습니다.");
    } finally { setLoading(false); }
  }

  function downloadCsv() {
    if (!logs || logs.length === 0) return;
    const header = ["날짜", "이름", "소속", "시작", "종료", "업무 내용", "회사명", "작업 분류"];
    const rows = logs.map((l) => [
      l.work_date, l.workers?.name || "", l.workers?.team || "", l.start_time || "", l.end_time || "",
      l.task || "", l.site || "", l.category || "",
    ]);
    const escape = (v) => `"${String(v).replace(/"/g, '""')}"`;
    const csv = [header, ...rows].map((r) => r.map(escape).join(",")).join("\r\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `업무일지_${date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 pt-10 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-extrabold text-slate-900">업무일지 관리자</h1>
          <div className="flex gap-3">
            <Link href="/worklog/sessions" className="text-sm font-semibold text-brand-blue hover:underline">기록조회</Link>
            <Link href="/worklog/report" className="text-sm font-semibold text-brand-blue hover:underline">공수 집계</Link>
            <Link href="/worklog/layout" className="text-sm font-semibold text-brand-blue hover:underline">배치도</Link>
            <Link href="/worklog/board" className="text-sm font-semibold text-brand-blue hover:underline">배치판</Link>
            <Link href="/worklog/jobs" className="text-sm font-semibold text-slate-500 hover:text-brand-blue">작업 QR/NFC</Link>
            <Link href="/worklog/qr" className="text-sm font-semibold text-slate-500 hover:text-brand-blue">직원 QR</Link>
            <Link href="/worklog" className="text-sm font-semibold text-slate-500 hover:text-brand-blue">← 직원 화면</Link>
          </div>
        </div>

        <form onSubmit={load} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-wrap items-end gap-3 mb-6">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">관리자 PIN</label>
            <input type="password" value={adminPin} onChange={(e) => setAdminPin(e.target.value)} className={inputCls} required />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">날짜</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
          </div>
          <button type="submit" disabled={loading}
            className="py-2.5 px-6 rounded-lg bg-brand-blue text-white font-bold hover:bg-blue-700 active:scale-95 transition disabled:opacity-50">
            {loading ? "조회 중..." : "조회"}
          </button>
          {logs && logs.length > 0 && (
            <button type="button" onClick={downloadCsv}
              className="py-2.5 px-6 rounded-lg border-2 border-slate-800 text-slate-800 font-bold hover:bg-slate-800 hover:text-white transition">
              엑셀 다운로드
            </button>
          )}
        </form>

        {error && <p className="text-sm text-brand-red font-semibold mb-4">{error}</p>}

        {logs && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
            {logs.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-10">해당 날짜에 기록이 없습니다.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-left">
                    <th className="px-4 py-3 font-bold">이름</th>
                    <th className="px-4 py-3 font-bold">소속</th>
                    <th className="px-4 py-3 font-bold">시간</th>
                    <th className="px-4 py-3 font-bold">업무 내용</th>
                    <th className="px-4 py-3 font-bold">회사명</th>
                    <th className="px-4 py-3 font-bold">분류</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((l) => (
                    <tr key={l.id} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{l.workers?.name}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{l.workers?.team}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{l.start_time || "--"} ~ {l.end_time || "--"}</td>
                      <td className="px-4 py-3 text-slate-800">{l.task}</td>
                      <td className="px-4 py-3 text-slate-600">{l.site}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{l.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
