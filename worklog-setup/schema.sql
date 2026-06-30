-- ───────────────────────────────────────────────
-- 두신이엔지 업무일지 - 데이터베이스 설정
-- Supabase → SQL Editor 에 그대로 붙여넣고 RUN 하세요.
-- ───────────────────────────────────────────────

-- 1) 직원 테이블
create table if not exists workers (
  id       bigint generated always as identity primary key,
  name     text not null,
  pin      text not null,
  team     text not null default '현장',                       -- '현장' 또는 '사무'
  qr_token text not null default gen_random_uuid()::text unique -- QR 로그인용 비밀키(자동 생성)
);

-- 2) 업무일지 테이블
create table if not exists work_logs (
  id         bigint generated always as identity primary key,
  worker_id  bigint not null references workers(id) on delete cascade,
  work_date  date   not null default current_date,
  start_time text,
  end_time   text,
  task       text,
  site       text,
  category   text,
  created_at timestamptz default now()
);

-- 3) 보안: RLS 켜기 (서버의 서비스 키로만 접근 가능)
alter table workers   enable row level security;
alter table work_logs enable row level security;

-- 4) 직원 등록 (이름/PIN/소속을 실제 직원으로 바꿔서 추가하세요)
--    qr_token 은 자동 생성되므로 입력하지 않아도 됩니다.
insert into workers (name, pin, team) values
  ('홍길동', '1234', '현장'),
  ('김철수', '5678', '현장'),
  ('이영희', '4321', '사무');

-- ───────────────────────────────────────────────
-- 이미 예전 버전으로 만들었던 경우에만: 아래 두 줄을 실행해 컬럼을 추가하세요.
-- alter table workers add column if not exists team text not null default '현장';
-- alter table workers add column if not exists qr_token text not null default gen_random_uuid()::text;
