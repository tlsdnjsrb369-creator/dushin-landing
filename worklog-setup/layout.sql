-- 배치도(동) 기록용 컬럼 추가 — Supabase SQL Editor에서 한 번 Run 하세요.
alter table work_sessions add column if not exists zone text;   -- A동 / B동 / C동
