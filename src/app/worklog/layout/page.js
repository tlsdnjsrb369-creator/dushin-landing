"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const CATEGORIES = ["제관", "용접", "사상", "절단", "조립", "보조"];
const ZONES = [
  { key: "A동", desc: "중형제작·조립", w: 14.5 },
  { key: "B동", desc: "CNC 절단", w: 10 },
  { key: "C동", desc: "대형제작", w: 14.5 },
];

export default function LayoutBoardPage() {
  const [adminPin, setAdminPin] = useState("");
  const [authed, setAuthed] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [open, setOpen] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [sel, setSel] = useState(null);
  const [drag, setDrag] = useState(null);
  const [modal, setModal] = useState(null); // { workerId, zone }
  const [q, setQ] = useState("");
  const [allJobs, setAllJobs] = useState([]);
  const [job, setJob] = useState(null);
  const [cat, setCat] = useState(CATEGORIES[0]);
  const [error, setError] = useState("");
  const [now, setNow] = useState(Date.now());

  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 30000); return () => clearInterval(t); }, []);

  const call = useCallback(async (body) => {
    const r = await fetch("/api/worklog/board", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ adminPin, ...body }) });
    return { ok: r.ok, data: await r.json() };
  }, [adminPin]);
  const reload = useCallback(async () => {
    const { ok, data } = await call({ action: "state", jobIds: [] });
    if (ok) { setWorkers(data.workers || []); setOpen(data.open || []); setJobs(data.jobs || []); }
  }, [call]);

  async function login(e) {
    e.preventDefault(); setError("");
    const { ok, data } = await call({ action: "state", jobIds: [] });
    if (!ok) { setError(data.error || "PIN 오류"); return; }
    setWorkers(data.workers || []); setOpen(data.open || []); setJobs(data.jobs || []); setAuthed(true);
    const aj = await call({ action: "alljobs" }); if (aj.ok) setAllJobs(aj.data.jobs || []);
  }
  function openModal(workerId, zone) { setModal({ workerId, zone }); setJob(null); setCat(CATEGORIES[0]); setQ(""); setResults([]); setSel(null); setDrag(null); }
  async function confirmAssign() {
    await call({ action: "assign", workerId: modal.workerId, jobId: job?.id || null, category: cat, zone: modal.zone });
    setModal(null); reload();
  }
  async function endWorker(wid) { await call({ action: "end", workerId: wid }); reload(); }
  async function endAll() { if (confirm("모든 배치를 종료할까요? (퇴근 시)")) { await call({ action: "endall" }); reload(); } }

  const assignedIds = new Set(open.map((s) => s.worker_id));
  const pool = workers.filter((w) => !assignedIds.has(w.id));
  const jobName = (id) => jobs.find((j) => j.id === id)?.name || "";
  const elapsed = (t) => Math.max(0, Math.round((now - new Date(t).getTime()) / 60000));

  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 pt-10">
        <form onSubmit={login} className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-lg p-7">
          <h1 className="text-2xl font-extrabold text-slate-900 text-center mb-5">공장 배치도</h1>
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
    <div className="min-h-screen bg-slate-50 px-4 pt-10 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-extrabold text-slate-900">공장 배치도</h1>
          <div className="flex gap-2">
            <button onClick={reload} className="text-sm font-semibold text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5">새로고침</button>
            <button onClick={endAll} className="text-sm font-semibold text-brand-red border border-brand-red/40 rounded-lg px-3 py-1.5">전체 종료</button>
          </div>
        </div>

        {/* 미배치 직원 */}
        <div className="bg-white rounded-xl border border-slate-200 p-3 mb-4">
          <p className="text-xs font-bold text-slate-500 mb-2">미배치 직원 — 카드를 끌어다 동에 놓거나, 눌러서 선택 후 동을 누르세요 {sel && <span className="text-brand-blue">(선택: {workers.find((w) => w.id === sel)?.name})</span>}</p>
          <div className="flex flex-wrap gap-2">
            {pool.map((w) => (
              <button key={w.id} draggable onDragStart={() => setDrag(w.id)} onClick={() => setSel(sel === w.id ? null : w.id)}
                className={`px-3 py-2 rounded-lg font-bold text-sm border cursor-grab active:cursor-grabbing ${sel === w.id ? "bg-brand-blue text-white border-brand-blue" : "bg-slate-50 text-slate-700 border-slate-200"}`}>
                {w.name}<span className="text-[10px] opacity-60 ml-1">{w.team}</span>
              </button>
            ))}
            {pool.length === 0 && <span className="text-sm text-slate-400">전원 배치됨</span>}
          </div>
        </div>

        {/* 배치도 (A/B/C 동, 실제 폭 비율) */}
        <div className="flex gap-2" style={{ minHeight: 420 }}>
          {ZONES.map((z) => {
            const here = open.filter((s) => s.zone === z.key);
            return (
              <div key={z.key} style={{ flexGrow: z.w, flexBasis: 0 }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => { if (drag) openModal(drag, z.key); }}
                onClick={() => { if (sel) openModal(sel, z.key); }}
                className={`rounded-xl border-2 p-3 bg-white flex flex-col ${(drag || sel) ? "border-brand-blue border-dashed cursor-pointer" : "border-slate-300"}`}>
                <div className="text-center mb-2 pb-2 border-b border-slate-100">
                  <p className="text-base font-extrabold text-slate-800">{z.key}</p>
                  <p className="text-[11px] text-slate-400">{z.desc} · {z.w}m</p>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  {here.map((s) => (
                    <button key={s.id} onClick={(e) => { e.stopPropagation(); if (confirm(`${workers.find((w) => w.id === s.worker_id)?.name} 종료할까요?`)) endWorker(s.worker_id); }}
                      className="text-left bg-green-50 border border-green-200 rounded px-2 py-1.5">
                      <div className="font-bold text-green-800 text-sm">{workers.find((w) => w.id === s.worker_id)?.name} <span className="text-xs font-normal">· {s.category} · {elapsed(s.started_at)}분</span></div>
                      {s.job_id && <div className="text-[11px] text-green-600 line-clamp-1">{jobName(s.job_id)}</div>}
                    </button>
                  ))}
                  {here.length === 0 && <span className="text-xs text-slate-300 text-center mt-4">여기로 끌어다 놓기</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 배치 모달 */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-5" onClick={(e) => e.stopPropagation()}>
            <p className="font-extrabold text-slate-900 mb-1">{workers.find((w) => w.id === modal.workerId)?.name} → {modal.zone}</p>
            <p className="text-xs text-slate-500 mb-3">공정을 고르고, 필요하면 제품도 선택하세요.</p>

            <p className="text-xs font-bold text-slate-500 mb-1">공정</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={`py-2.5 rounded-lg font-bold text-sm ${cat === c ? "bg-brand-blue text-white" : "bg-slate-100 text-slate-600"}`}>{c}</button>
              ))}
            </div>

            <p className="text-xs font-bold text-slate-500 mb-1">제품 (선택)</p>
            {job ? (
              <div className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 mb-3">
                <span className="text-sm font-semibold line-clamp-1">{job.name}</span>
                <button onClick={() => setJob(null)} className="text-xs text-slate-400">변경</button>
              </div>
            ) : (
              <>
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="제품명·수주번호로 좁히기 (또는 아래에서 선택)"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm mb-1" />
                <div className="border border-slate-200 rounded-lg mb-3 max-h-44 overflow-y-auto">
                  {allJobs.filter((j) => !q || (j.name || "").toLowerCase().includes(q.toLowerCase()) || (j.su_no || "").toLowerCase().includes(q.toLowerCase())).slice(0, 80).map((j) => (
                    <button key={j.id} onClick={() => { setJob(j); setQ(""); }} className="w-full text-left px-3 py-2 hover:bg-slate-50 border-b border-slate-100 text-sm">
                      {j.name} <span className="text-xs text-slate-400">{j.company} · {j.su_no}</span>
                    </button>
                  ))}
                  {allJobs.length === 0 && <p className="px-3 py-2 text-xs text-slate-400">제품 목록 불러오는 중...</p>}
                </div>
              </>
            )}

            <div className="flex gap-2 mt-2">
              <button onClick={() => setModal(null)} className="flex-1 py-3 rounded-lg border border-slate-300 text-slate-500 font-bold">취소</button>
              <button onClick={confirmAssign} className="flex-1 py-3 rounded-lg bg-brand-blue text-white font-bold">배치</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
