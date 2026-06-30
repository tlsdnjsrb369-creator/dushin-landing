"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const CATEGORIES = ["용접", "사상", "제관", "조립", "보조"];
const WORK_ITEMS = ["S-90 COMPOST Ass'y 제작"];
const COMPANIES = ["용운", "재원", "일광", "심팩"];
const TEAMS = ["현장", "사무"];
const CUSTOM = "__custom__";

const emptyForm = { start_time: "", end_time: "", taskSel: "", taskCustom: "", companySel: "", companyCustom: "", category: CATEGORIES[0] };

export default function WorklogPage() {
  const [workers, setWorkers] = useState([]);
  const [team, setTeam] = useState("현장");
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [token, setToken] = useState(null);
  const [worker, setWorker] = useState(null);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const today = new Date().toISOString().slice(0, 10);

  const loadLogs = useCallback(async (tk) => {
    const r = await fetch(`/api/worklog/logs?date=${today}`, { headers: { Authorization: `Bearer ${tk}` } });
    if (r.status === 401) { logout(); return; }
    const d = await r.json();
    setLogs(d.logs || []);
  }, [today]);

  const applyLogin = useCallback((d) => {
    setToken(d.token); setWorker(d.worker);
    localStorage.setItem("worklog_token", d.token);
    localStorage.setItem("worklog_worker", JSON.stringify(d.worker));
    loadLogs(d.token);
  }, [loadLogs]);

  useEffect(() => {
    fetch("/api/worklog/workers").then((r) => r.json()).then((d) => setWorkers(d.workers || [])).catch(() => {});

    const k = new URLSearchParams(window.location.search).get("k");
    if (k) {
      fetch("/api/worklog/qr-login", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ k }),
      }).then((r) => r.json()).then((d) => {
        if (d.token) applyLogin(d);
        window.history.replaceState({}, "", "/worklog");
      }).catch(() => {});
      return;
    }

    const savedToken = localStorage.getItem("worklog_token");
    const savedWorker = localStorage.getItem("worklog_worker");
    if (savedToken && savedWorker) {
      // 새로고침 시 로그인 유지 — localStorage(외부 저장소) 복원이라 effect 사용이 적절
      /* eslint-disable react-hooks/set-state-in-effect */
      setToken(savedToken);
      setWorker(JSON.parse(savedWorker));
      /* eslint-enable react-hooks/set-state-in-effect */
      loadLogs(savedToken);
    }
  }, [loadLogs, applyLogin]);

  async function login(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const r = await fetch("/api/worklog/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, pin }),
      });
      const d = await r.json();
      if (!r.ok) { setError(d.error || "로그인에 실패했습니다."); return; }
      applyLogin(d);
    } catch {
      setError("연결에 실패했습니다. 잠시 후 다시 시도하세요.");
    } finally { setLoading(false); }
  }

  function logout() {
    setToken(null); setWorker(null); setLogs([]); setPin(""); setName("");
    localStorage.removeItem("worklog_token");
    localStorage.removeItem("worklog_worker");
  }

  async function addLog(e) {
    e.preventDefault();
    const task = form.taskSel === CUSTOM ? form.taskCustom.trim() : form.taskSel;
    const company = form.companySel === CUSTOM ? form.companyCustom.trim() : form.companySel;
    if (!task) { setError("업무 내용을 선택하세요."); return; }
    setError(""); setLoading(true);
    try {
      const r = await fetch("/api/worklog/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ start_time: form.start_time, end_time: form.end_time, task, site: company, category: form.category, work_date: today }),
      });
      const d = await r.json();
      if (!r.ok) { setError(d.error || "저장에 실패했습니다."); return; }
      setForm(emptyForm);
      loadLogs(token);
    } finally { setLoading(false); }
  }

  async function delLog(id) {
    await fetch(`/api/worklog/logs?id=${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    loadLogs(token);
  }

  const inputCls = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20";
  const teamWorkers = workers.filter((w) => w.team === team);

  // ── 로그인 화면 ──
  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 pt-10 pb-12">
        <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-lg p-7">
          <h1 className="text-2xl font-extrabold text-slate-900 text-center mb-1">업무일지</h1>
          <p className="text-sm text-slate-500 text-center mb-6">QR을 찍거나, 이름·PIN으로 로그인하세요</p>

          <div className="flex gap-2 mb-4">
            {TEAMS.map((tm) => (
              <button key={tm} type="button" onClick={() => { setTeam(tm); setName(""); }}
                className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition ${team === tm ? "bg-brand-blue text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                {tm}
              </button>
            ))}
          </div>

          <form onSubmit={login} className="flex flex-col gap-4">
            <select value={name} onChange={(e) => setName(e.target.value)} className={inputCls} required>
              <option value="">이름 선택 ({team})</option>
              {teamWorkers.map((w) => <option key={w.id} value={w.name}>{w.name}</option>)}
            </select>
            <input
              type="password" inputMode="numeric" maxLength={4} placeholder="4자리 PIN"
              value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} className={inputCls} required
            />
            {error && <p className="text-sm text-brand-red font-semibold">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-lg bg-brand-blue text-white font-bold text-base hover:bg-blue-700 active:scale-95 transition disabled:opacity-50">
              {loading ? "확인 중..." : "로그인"}
            </button>
          </form>
          <p className="text-center mt-5 text-xs text-slate-400">
            <Link href="/worklog/admin" className="hover:text-slate-600">관리자 페이지</Link>
          </p>
        </div>
      </div>
    );
  }

  // ── 기록 화면 ──
  return (
    <div className="min-h-screen bg-slate-50 px-4 pt-10 pb-16">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              {worker.name} 님
              {worker.team && <span className="ml-2 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded align-middle">{worker.team}</span>}
            </h1>
            <p className="text-sm text-slate-500">{today} 업무일지</p>
          </div>
          <button onClick={logout} className="text-sm font-semibold text-slate-500 hover:text-brand-red px-3 py-1.5 rounded-lg border border-slate-200">로그아웃</button>
        </div>

        {/* 기록 추가 폼 */}
        <form onSubmit={addLog} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-3 mb-6">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs font-bold text-slate-500 block mb-1">시작</label>
              <input type="time" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} className={inputCls} />
            </div>
            <div className="flex-1">
              <label className="text-xs font-bold text-slate-500 block mb-1">종료</label>
              <input type="time" value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} className={inputCls} />
            </div>
          </div>

          {/* 업무 내용 (선택 + 직접입력) */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">업무 내용</label>
            <select value={form.taskSel} onChange={(e) => setForm({ ...form, taskSel: e.target.value })} className={inputCls}>
              <option value="">선택하세요</option>
              {WORK_ITEMS.map((w) => <option key={w} value={w}>{w}</option>)}
              <option value={CUSTOM}>기타 (직접 입력)</option>
            </select>
            {form.taskSel === CUSTOM && (
              <input type="text" placeholder="업무 내용 직접 입력" value={form.taskCustom}
                onChange={(e) => setForm({ ...form, taskCustom: e.target.value })} className={`${inputCls} mt-2`} />
            )}
          </div>

          {/* 회사명 + 작업 분류 */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs font-bold text-slate-500 block mb-1">회사명</label>
              <select value={form.companySel} onChange={(e) => setForm({ ...form, companySel: e.target.value })} className={inputCls}>
                <option value="">선택</option>
                {COMPANIES.map((c) => <option key={c} value={c}>{c}</option>)}
                <option value={CUSTOM}>기타</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs font-bold text-slate-500 block mb-1">작업 분류</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          {form.companySel === CUSTOM && (
            <input type="text" placeholder="회사명 직접 입력" value={form.companyCustom}
              onChange={(e) => setForm({ ...form, companyCustom: e.target.value })} className={inputCls} />
          )}

          {error && <p className="text-sm text-brand-red font-semibold">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-lg bg-brand-blue text-white font-bold text-base hover:bg-blue-700 active:scale-95 transition disabled:opacity-50">
            + 기록 추가
          </button>
        </form>

        {/* 오늘 기록 목록 */}
        <h2 className="text-sm font-bold text-slate-500 mb-2">오늘 기록 ({logs.length}건)</h2>
        <div className="flex flex-col gap-2">
          {logs.length === 0 && <p className="text-sm text-slate-400 text-center py-6 bg-white rounded-xl border border-slate-200">아직 기록이 없어요. 위에서 추가하세요.</p>}
          {logs.map((log) => (
            <div key={log.id} className="bg-white rounded-xl border border-slate-200 p-4 flex justify-between items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-brand-blue">{log.start_time || "--"} ~ {log.end_time || "--"}</span>
                  {log.category && <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{log.category}</span>}
                  {log.site && <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{log.site}</span>}
                </div>
                <p className="text-base text-slate-800 font-medium">{log.task}</p>
              </div>
              <button onClick={() => delLog(log.id)} className="text-sm text-slate-400 hover:text-brand-red font-semibold shrink-0">삭제</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
