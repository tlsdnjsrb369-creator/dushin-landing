# 직원 업무일지 — 설정 가이드

처음 한 번만 설정하면 됩니다. 천천히 따라 하세요.

---

## 1. 무료 데이터베이스(Supabase) 만들기

1. https://supabase.com 접속 → **Start your project** → GitHub 계정으로 가입(무료)
2. **New project** 클릭
   - Name: `dushin-worklog` (아무거나)
   - Database Password: 적당히 만들고 **메모해 두기**
   - Region: `Northeast Asia (Seoul)` 추천
3. 1~2분 기다리면 프로젝트 생성 완료

## 2. 표(테이블) 만들기

1. 왼쪽 메뉴 **SQL Editor** 클릭 → **New query**
2. 이 폴더의 `schema.sql` 내용을 전부 복사해 붙여넣기
3. 오른쪽 아래 **RUN** 클릭 → "Success" 나오면 완료
   - (직원 이름/PIN은 `schema.sql`의 마지막 부분을 실제 직원으로 바꾸면 돼요. 나중에 Table Editor에서 추가/수정도 가능합니다.)

## 3. 연결 키 3개 복사

왼쪽 메뉴 **Project Settings(톱니바퀴)** → **API** 에서:

- **Project URL** (예: `https://abcd1234.supabase.co`)
- **service_role** 키 (`Project API keys` 항목, "secret" 표시된 긴 문자열) — ⚠️ 절대 외부 공개 금지

## 4. 환경변수 등록

### 로컬(내 컴퓨터)에서 테스트하려면
프로젝트 폴더에 `.env.local` 파일을 만들고 아래를 채우세요:

```
SUPABASE_URL=여기에_Project_URL
SUPABASE_SERVICE_KEY=여기에_service_role_키
WORKLOG_SECRET=아무거나_긴_랜덤_문자열_입력
WORKLOG_ADMIN_PIN=9999
```

- `WORKLOG_SECRET`: 로그인 보안용. 아무 길고 복잡한 문자열(예: `dushin-2026-x9f3k...`)
- `WORKLOG_ADMIN_PIN`: 사무실에서 전체 조회·엑셀 받을 때 쓰는 관리자 비번

### 실제 사이트(Vercel)에 적용하려면
Vercel → 프로젝트 `dushin-landing` → **Settings → Environment Variables** 에서
위 4개를 똑같이 추가 → **Save** → 다음 배포부터 적용됩니다.
(이미 배포돼 있으면 Deployments에서 **Redeploy** 한 번)

---

## 5. 라이브러리 설치 (QR 기능용)

이 앱은 QR 생성을 위해 `qrcode` 라이브러리를 사용합니다.
- **실제 사이트(Vercel)**: 배포할 때 자동으로 설치되니 따로 할 일 없어요.
- **내 컴퓨터에서 테스트**할 때만: 프로젝트 폴더에서 터미널에 한 번 실행하세요.
  ```
  npm install
  ```

---

## 6. 사용 방법

- **직원 (QR)**: 관리자에게 받은 QR을 폰 카메라로 찍으면 → 자동 로그인 → 시간대별 업무 입력
- **직원 (PIN)**: `사이트주소/worklog` → 현장/사무 선택 → 이름 + 4자리 PIN
- **관리자(사무실)**: `사이트주소/worklog/admin` → 관리자 PIN + 날짜 → 조회 → **엑셀 다운로드**
- **QR 인쇄**: `사이트주소/worklog/qr` → 관리자 PIN → 직원별 QR 표시 → **인쇄** 후 나눠주기

## 직원 추가/변경
Supabase → **Table Editor → workers** 에서 이름·PIN·소속(team: `현장`/`사무`)을 직접 추가/수정하면 됩니다.
(`qr_token`은 자동 생성되니 비워두세요.)

## 보안 메모
- PIN은 4자리 간편 비번이라 "정밀 보안"용은 아니에요(내부 업무 기록용). 외부엔 로그인으로 막혀 있습니다.
- service_role 키와 `.env.local`은 절대 외부에 공유하지 마세요. (이미 `.gitignore`로 GitHub 업로드에서 제외돼 있습니다.)
