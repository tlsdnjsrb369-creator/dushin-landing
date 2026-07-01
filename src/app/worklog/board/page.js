"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const CATEGORIES = ["제관", "용접", "사상", "절단", "조립", "보조"];

export default function BoardPage() {
  const [adminPin, setAdminPin] = useState("");
  const [authed, setAuthed] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [open, setOpen] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [boardIds, setBoardIds] = useState([]);
  const [sel, setSel] = useState(null);        // 선택된 직원 id
  const [pendingJob, setPendingJob] = useState(null);
  const [searchQ, setSearchQ] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [now, setNow] = useState(Date.now());

  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 30000); return () => clearInterval(t); }, []);

  const call = useCallback(async (body) => {
    const r = await fetch("/api/worklog/board", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ adminPin, ...body }) });
    return { ok: r.ok, data: await r.json() };
  }, [adminPin]);

  const reload = useCallback(async (ids) => {
    const { ok, data } = await call({ action: "state", jobIds: ids });
    if (ok) { setWorkers(data.workers || []); setOpen(data.open || []); setJobs(data.jobs || []); }
  }, [call]);

  async function login(e) {
    e.preventDefault(); setError("");
    let ids = [];
    try { ids = JSON.parse(localStorage.getItem("board_jobs") || "[]"); } catch { ids = []; }
    const { ok, data } = await fetch("/api/worklog/board", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ adminPin, action: "state", jobIds: ids }) }).then(async (r) => ({ ok: r.ok, data: await r.json() }));
    if (!ok) { setError(data.error || "PIN 오류"); return; }
    setBoardIds(ids); setWorkers(data.workers || []); setOpen(data.open || []); setJobs(data.jobs || []); setAuthed(true);
  }

  function persist(ids) { setBoardIds(ids); localStorage.setItem("board_jobs", JSON.stringify(ids)); }

  async function addJob(job) {
    const ids = [...new Set([...boardIds, job.id])]; persist(ids); setSearchQ(""); setResults([]); reload(ids);
  }
  async function doSearch(q) {
    setSearchQ(q);
    if (q.length < 1) { setResults([]); return; }
    const { ok, data } = await call({ action: "search", q }); if (ok) setResults(data.jobs || []);
  }
  async function assign(jobId, category) {
    await call({ action: "assign", workerId: sel, jobId, category }); setSel(null); setPendingJob(null); reload(boardIds);
  }
  async function endWorker(wid) { await call({ action: "end", workerId: wid }); reload(boardIds); }
  async function endAll() { if (confirm("모든 작업을 종료할까요? (퇴근 시)")) { await call({ action: "endall" }); reload(boardIds); } }

  const assignedIds = new Set(open.map((s) => s.worker_id));
  const pool = workers.filter((w) => !assignedIds.has(w.id));
  const elapsed = (t) => Math.max(0, Math.round((now - new Date(t).getTime()) / 60000));

  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 pt-10">
        <form onSubmit={login} className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-lg p-7">
          <h1 className="text-2xl font-extrabold text-slate-900 text-center mb-5">작업 배치판</h1>
          <input type="password" placeholder="관리자 PIN" value={adminPin} onChange={(e) => setAdminPin(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base mb-3" required />
          {error && <p className="text-sm text-brand-red font-semibold mb-2">{error}</p>}
          <button className="w-full py-3 rounded-lg bg-brand-blue text-white font-bold">열기</button>
          <p className="text-center mt-4 text-xs text-slate-400"><Link href="/worklog/admin" className="hover:text-slate-600">관리자</Link></p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 pt-10 pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-extrabold text-slate-900">작업 배치판</h1>
          <div className="flex gap-2">
            <button onClick={() => reload(boardIds)} className="text-sm font-semibold text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5">새로고침</button>
            <button onClick={endAll} className="text-sm font-semibold text-brand-red border border-brand-red/40 rounded-lg px-3 py-1.5">전체 종료(퇴근)</button>
          </div>
        </div>

        {/* 미배치 직원 풀 */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
          <p className="text-xs font-bold text-slate-500 mb-2">미배치 직원 — 한 명 누르고 → 아래 작업을 누르세요 {sel && <span className="text-brand-blue">(선택됨: {workers.find((w) => w.id === sel)?.name})</span>}</p>
          <div className="flex flex-wrap gap-2">
            {pool.map((w) => (
              <button key={w.id} onClick={() => setSel(sel === w.id ? null : w.id)}
                className={`px-3 py-2 rounded-lg font-bold text-sm border ${sel === w.id ? "bg-brand-blue text-white border-brand-blue" : "bg-slate-50 text-slate-700 border-slate-200"}`}>
                {w.name}<span className="text-[10px] opacity-60 ml-1">{w.team}</span>
              </button>
            ))}
            {pool.length === 0 && <span className="text-sm text-slate-400">전원 배치됨</span>}
          </div>
        </div>

        {/* 작업 추가 */}
        <div className="mb-4">
          <input value={searchQ} onChange={(e) => doSearch(e.target.value)} placeholder="+ 작업 추가 (제품명·수주번호 검색)"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base" />
          {results.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-lg mt-1 max-h-56 overflow-y-auto">
              {results.map((j) => (
                <button key={j.id} onClick={() => addJob(j)} className="w-full text-left px-3 py-2 hover:bg-slate-50 border-b border-slate-100 text-sm">
                  <span className="font-semibold">{j.name}</span> <span className="text-slate-400 text-xs">{j.company} · {j.su_no}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 작업 카드들 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {jobs.map((j) => {
            const here = open.filter((s) => s.job_id === j.id);
            return (
              <div key={j.id} onClick={() => { if (sel) setPendingJob(j.id); }}
                className={`bg-white rounded-xl border p-4 ${sel ? "border-brand-blue cursor-pointer hover:bg-blue-50/40" : "border-slate-200"}`}>
                <p className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">{j.name}</p>
                <p className="text-xs text-slate-400 mb-3">{j.company} · {j.su_no}</p>
                <div className="flex flex-col gap-1.5">
                  {here.map((s) => (
                    <button key={s.id} onClick={(e) => { e.stopPropagation(); if (confirm(`${workers.find((w) => w.id === s.worker_id)?.name} 종료할까요?`)) endWorker(s.worker_id); }}
                      className="flex justify-between items-center bg-green-50 border border-green-200 rounded px-2.5 py-1.5 text-sm">
                      <span className="font-bold text-green-800">{workers.find((w) => w.id === s.worker_id)?.name}</span>
                      <span className="text-xs text-green-700">{s.category} · {elapsed(s.started_at)}분</span>
                    </button>
                  ))}
                  {here.length === 0 && <span className="text-xs text-slate-300">배치된 직원 없음</span>}
                </div>
              </div>
            );
          })}
          {jobs.length === 0 && <p className="text-sm text-slate-400 col-span-full text-center py-8">위에서 "작업 추가"로 진행 중인 작업을 올리세요.</p>}
        </div>
      </div>

      {/* 공정 선택 바 (직원→작업 배치 시) */}
      {pendingJob && sel && (
        <div className="fixed inset-x-0 bottom-0 bg-white border-t border-slate-200 shadow-2xl p-4 z-50">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm font-bold text-slate-700 mb-2">{workers.find((w) => w.id === sel)?.name} → 공정 선택</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => assign(pendingJob, c)} className="flex-1 min-w-[80px] py-3 rounded-lg bg-brand-blue text-white font-bold text-sm">{c}</button>
              ))}
              <button onClick={() => setPendingJob(null)} className="py-3 px-4 rounded-lg border border-slate-300 text-slate-500 font-bold text-sm">취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
