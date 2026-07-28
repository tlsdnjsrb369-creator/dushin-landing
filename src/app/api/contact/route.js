import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { rateLimit, clientIp } from "@/lib/ratelimit";

// 메일 본문에 값을 넣기 전 HTML 특수문자 제거(피싱·태그 삽입 방지)
const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
// 제목에는 줄바꿈이 들어가면 안 됨(헤더 인젝션 방지)
const oneLine = (v) => String(v ?? "").replace(/[\r\n]+/g, " ").slice(0, 100);

const ALLOWED_EXT = ["pdf", "jpg", "jpeg", "png", "gif", "webp", "dwg", "dxf", "zip", "xlsx", "xls", "hwp", "hwpx", "pptx", "docx"];
const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // 총 4MB

export async function POST(req) {
  try {
    // 스팸·봇 방지: 같은 IP에서 10분에 5회까지
    if (!rateLimit(`contact:${clientIp(req)}`, 5, 10 * 60_000)) {
      return NextResponse.json(
        { success: false, error: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요." },
        { status: 429 }
      );
    }

    // 폼 데이터(첨부파일 포함) 수신
    const form = await req.formData();
    const company = form.get("company") || "";
    const name = form.get("name") || "";
    const phone = form.get("phone") || "";
    const email = form.get("email") || "";
    const message = form.get("message") || "";

    // 허니팟: 사람 눈에 안 보이는 칸이 채워져 있으면 봇 → 조용히 무시
    if (form.get("website")) {
      return NextResponse.json({ success: true });
    }

    if (!company || !name || !message) {
      return NextResponse.json(
        { success: false, error: "필수 항목이 누락되었습니다." },
        { status: 400 }
      );
    }

    // 첨부파일(도면·사양서) — 확장자·용량을 서버에서도 검증
    const attachments = [];
    let totalBytes = 0;
    for (const file of form.getAll("files")) {
      if (!file || typeof file === "string" || file.size === 0) continue;
      const ext = (file.name.split(".").pop() || "").toLowerCase();
      if (!ALLOWED_EXT.includes(ext)) {
        return NextResponse.json(
          { success: false, error: `허용되지 않는 파일 형식입니다: .${ext}` },
          { status: 400 }
        );
      }
      totalBytes += file.size;
      if (totalBytes > MAX_TOTAL_BYTES) {
        return NextResponse.json(
          { success: false, error: "첨부파일 총 용량은 4MB를 넘을 수 없습니다. 큰 도면은 이메일로 보내주세요." },
          { status: 413 }
        );
      }
      attachments.push({
        filename: file.name.replace(/[\r\n]/g, "").slice(0, 120),
        content: Buffer.from(await file.arrayBuffer()),
      });
    }

    // 1. SMTP Transporter 설정
    // 실제 서비스에서는 환경 변수(process.env)를 사용해야 합니다.
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.naver.com",
      port: process.env.EMAIL_PORT || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || "skj1994@naver.com",
        pass: process.env.EMAIL_PASS || "", // 앱 비밀번호 또는 계정 비밀번호
      },
    });

    // 2. 이메일 옵션
    const mailOptions = {
      from: process.env.EMAIL_USER || "skj1994@naver.com",
      to: "skj1994@naver.com", // 수신자
      // 메일에서 '답장'을 누르면 문의한 고객에게 바로 회신됩니다.
      replyTo: email || undefined,
      attachments,
      subject: `[(주)두신이엔지] 제작 문의 - ${oneLine(company)} (${oneLine(name)})${attachments.length ? ` [첨부 ${attachments.length}]` : ""}`,
      html: `
        <div style="font-family: 'Malgun Gothic', sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 600px;">
          <h2 style="color: #0055a4; border-bottom: 2px solid #0055a4; padding-bottom: 10px; margin-bottom: 20px;">
            홈페이지 제작·견적 문의 접수
          </h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tbody>
              <tr>
                <th style="width: 120px; padding: 10px; text-align: left; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">회사명</th>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${esc(company)}</td>
              </tr>
              <tr>
                <th style="padding: 10px; text-align: left; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">담당자명</th>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${esc(name)}</td>
              </tr>
              <tr>
                <th style="padding: 10px; text-align: left; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">연락처</th>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${esc(phone)}</td>
              </tr>
              <tr>
                <th style="padding: 10px; text-align: left; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">이메일</th>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${esc(email)}</td>
              </tr>
            </tbody>
          </table>
          
          <div style="margin-top: 20px;">
            <h3 style="font-size: 16px; color: #334155; margin-bottom: 10px;">문의 내용</h3>
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; white-space: pre-wrap; color: #475569; line-height: 1.6;">
              ${esc(message)}
            </div>
          </div>
          ${attachments.length ? `
          <div style="margin-top: 20px;">
            <h3 style="font-size: 16px; color: #334155; margin-bottom: 10px;">첨부 파일 (${attachments.length}건)</h3>
            <ul style="color: #475569; line-height: 1.8; padding-left: 18px; margin: 0;">
              ${attachments.map((a) => `<li>${esc(a.filename)}</li>`).join("")}
            </ul>
          </div>` : ""}
        </div>
      `,
    };

    // 메일 설정이 없으면 '성공'으로 속이지 않고 실패를 알립니다(문의 유실 방지).
    if (!process.env.EMAIL_PASS) {
      console.error("EMAIL_PASS 미설정: 문의 메일을 발송할 수 없습니다.");
      return NextResponse.json(
        { success: false, error: "메일 발송 설정이 완료되지 않았습니다. 전화 또는 이메일로 문의해 주세요." },
        { status: 500 }
      );
    }

    // 3. 이메일 발송
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("이메일 발송 에러:", error);
    return NextResponse.json(
      { success: false, error: "이메일 발송에 실패했습니다." },
      { status: 500 }
    );
  }
}
