"use client";

import { useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";

export default function WorklogJobsPage() {
  const [adminPin, setAdminPin] = useState("");
  const [jobs, setJobs] = useState(null);
  const [q, setQ] = useState("");
  const [qrs, setQrs] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const r = await fetch("/api/worklog/admin", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminPin, action: "joblist" }),
      });
      const d = await r.json();
      if (!r.ok) { setError(d.error || "조회 실패"); return; }
      setJobs(d.jobs || []);
    } catch { setError("연결 실패"); }
    finally { setLoading(false); }
  }

  const filtered = (jobs || []).filter((j) =>
    !q || (j.name || "").toLowerCase().includes(q.toLowerCase()) || (j.su_no || "").toLowerCase().includes(q.toLowerCase()) || (j.company || "").includes(q)
  ).slice(0, 60);

  async function genQrs() {
    const origin = window.location.origin;
    const out = {};
    for (const j of filtered) {
      out[j.id] = await QRCode.toDataURL(`${origin}/worklog/job?token=${j.qr_token}`, { width: 220, margin: 1 });
    }
    setQrs(out);
  }

  async function writeNfc(j) {
    if (typeof window === "undefined" || !("NDEFReader" in window)) {
      alert("이 기기는 NFC 쓰기를 지원하지 않아요. 안드로이드 크롬에서 가능합니다.");
      return;
    }
    try {
      const url = `${window.location.origin}/worklog/job?token=${j.qr_token}`;
      const w = new window.NDEFReader();
      await w.write({ records: [{ recordType: "url", data: url }] });
      alert("NFC 태그에 구웠어요! 태그를 폰 뒤에 대고 계세요.");
    } catch (e) { alert("NFC 쓰기 실패: " + e.message); }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 pt-10 pb-16">
      <style>{"@media print{header,footer,.no-print{display:none!important}body{background:#fff!important}}"}</style>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-5 no-print">
          <h1 className="text-2xl font-extrabold text-slate-900">작업 QR / NFC</h1>
          <Link href="/worklog/admin" className="text-sm font-semibold text-slate-500 hover:text-brand-blue">← 관리자</Link>
        </div>

        {!jobs && (
          <form onSubmit={load} className="no-print bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-end gap-3 max-w-md">
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">관리자 PIN</label>
              <input type="password" value={adminPin} onChange={(e) => setAdminPin(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-base focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20" required />
            </div>
            <button type="submit" disabled={loading} className="py-2.5 px-6 rounded-lg bg-brand-blue text-white font-bold disabled:opacity-50">
              {loading ? "..." : "불러오기"}
            </button>
          </form>
        )}
        {error && <p className="text-sm text-brand-red font-semibold no-print">{error}</p>}

        {jobs && (
          <>
            <div className="no-print flex flex-wrap gap-3 items-center mb-4">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="제품명·수주번호·업체 검색"
                className="flex-1 min-w-[200px] rounded-lg border border-slate-300 px-3 py-2.5 text-base" />
              <button onClick={genQrs} className="py-2.5 px-5 rounded-lg bg-brand-blue text-white font-bold">QR 생성</button>
              <button onClick={() => window.print()} className="py-2.5 px-5 rounded-lg border-2 border-slate-800 text-slate-800 font-bold">인쇄</button>
              <span className="text-sm text-slate-500">검색결과 {filtered.length}건(최대 60)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filtered.map((j) => (
                <div key={j.id} className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col items-center text-center">
                  {qrs[j.id]
                    ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={qrs[j.id]} alt="QR" className="w-full max-w-[160px] h-auto" />
                    : <div className="w-full max-w-[160px] aspect-square bg-slate-100 rounded flex items-center justify-center text-xs text-slate-400">QR 생성 누르기</div>}
                  <p className="mt-2 text-sm font-bold text-slate-900 leading-snug line-clamp-2">{j.name}</p>
                  <p className="text-xs text-slate-500">{j.company} · {j.su_no}</p>
                  <button onClick={() => writeNfc(j)} className="no-print mt-2 text-xs font-bold text-brand-blue border border-brand-blue/40 rounded px-3 py-1">NFC 굽기</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
