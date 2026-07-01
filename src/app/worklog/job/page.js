"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const CATEGORIES = ["제관", "용접", "사상", "조립", "보조"];

export default function JobTapPage() {
  const [jobToken, setJobToken] = useState(null);
  const [job, setJob] = useState(null);
  const [token, setToken] = useState(null);
  const [worker, setWorker] = useState(null);
  const [open, setOpen] = useState(null);
  const [cat, setCat] = useState(CATEGORIES[0]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const loadOpen = useCallback((tk, jt) => {
    if (!tk || !jt) return;
    fetch(`/api/worklog/session?jobToken=${jt}`, { headers: { Authorization: `Bearer ${tk}` } })
      .then((r) => r.json()).then((d) => { setOpen(d.open || null); if (d.open?.category) setCat(d.open.category); }).catch(() => {});
  }, []);

  useEffect(() => {
    const jt = new URLSearchParams(window.location.search).get("token");
    setJobToken(jt);
    const wt = localStorage.getItem("worklog_token");
    const ww = localStorage.getItem("worklog_worker");
    if (wt && ww) { setToken(wt); setWorker(JSON.parse(ww)); }
    if (jt) fetch(`/api/worklog/job?token=${jt}`).then((r) => r.json()).then((d) => setJob(d.job || null)).catch(() => {});
    if (wt && jt) loadOpen(wt, jt);
  }, [loadOpen]);

  async function act(action) {
    setLoading(true); setMsg("");
    try {
      const r = await fetch("/api/worklog/session", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ jobToken, category: cat, action }),
      });
      const d = await r.json();
      if (!r.ok) { setMsg(d.error || "오류가 발생했습니다."); return; }
      setMsg(action === "start" ? "✓ 작업 시작이 기록됐어요" : "✓ 작업 종료가 기록됐어요");
      loadOpen(token, jobToken);
    } finally { setLoading(false); }
  }

  const Box = ({ children }) => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 pt-10 pb-12">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-lg p-7 text-center">{children}</div>
    </div>
  );

  if (!jobToken) return <Box><p className="text-slate-600">잘못된 접근이에요. 제품 QR을 다시 찍어주세요.</p></Box>;
  if (!token) return <Box>
    <p className="text-slate-700 font-semibold mb-3">먼저 본인 QR로 로그인하세요.</p>
    <Link href="/worklog" className="inline-block px-6 py-3 rounded-lg bg-brand-blue text-white font-bold">로그인하러 가기</Link>
  </Box>;
  if (!job) return <Box><p className="text-slate-500">작업 정보를 불러오는 중...</p></Box>;

  const isOpen = !!open;
  return (
    <div className="min-h-screen bg-slate-50 px-4 pt-10 pb-16">
      <div className="max-w-sm mx-auto">
        <p className="text-sm text-slate-500 mb-1">{worker?.name} 님 · {job.company || ""}</p>
        <h1 className="text-xl font-extrabold text-slate-900 mb-1 leading-snug">{job.name}</h1>
        <p className="text-xs text-slate-400 mb-5">{job.su_no}</p>

        {/* 진행상태 */}
        <div className={`rounded-xl p-4 mb-5 text-center font-bold ${isOpen ? "bg-green-50 text-green-700 border border-green-200" : "bg-slate-100 text-slate-500"}`}>
          {isOpen ? `작업 중 · ${open.category} (시작 ${new Date(open.started_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})})` : "대기 중"}
        </div>

        {/* 공정 선택 */}
        <p className="text-xs font-bold text-slate-500 mb-2">공정 선택</p>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)} disabled={isOpen}
              className={`py-3 rounded-lg font-bold text-sm transition ${cat === c ? "bg-brand-blue text-white" : "bg-white border border-slate-200 text-slate-600"} ${isOpen ? "opacity-50" : ""}`}>
              {c}
            </button>
          ))}
        </div>

        {/* 시작/종료 큰 버튼 */}
        {!isOpen ? (
          <button onClick={() => act("start")} disabled={loading}
            className="w-full py-5 rounded-2xl bg-brand-blue text-white text-xl font-extrabold active:scale-95 transition disabled:opacity-50">
            ▶ 작업 시작
          </button>
        ) : (
          <button onClick={() => act("end")} disabled={loading}
            className="w-full py-5 rounded-2xl bg-brand-red text-white text-xl font-extrabold active:scale-95 transition disabled:opacity-50">
            ■ 작업 종료
          </button>
        )}

        {msg && <p className="text-center mt-4 font-semibold text-slate-700">{msg}</p>}
        <p className="text-center mt-6 text-xs text-slate-400">
          <Link href="/worklog" className="hover:text-slate-600">업무일지 홈</Link>
        </p>
      </div>
    </div>
  );
}
