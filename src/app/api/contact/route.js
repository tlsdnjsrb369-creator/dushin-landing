import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { company, name, phone, email, message } = await req.json();

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
      subject: `[(주)두신이엔지] 홈페이지 제작 문의 - ${company} (${name})`,
      html: `
        <div style="font-family: 'Malgun Gothic', sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 600px;">
          <h2 style="color: #0055a4; border-bottom: 2px solid #0055a4; padding-bottom: 10px; margin-bottom: 20px;">
            홈페이지 신규 상담 문의
          </h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tbody>
              <tr>
                <th style="width: 120px; padding: 10px; text-align: left; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">회사명</th>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${company}</td>
              </tr>
              <tr>
                <th style="padding: 10px; text-align: left; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">담당자명</th>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${name}</td>
              </tr>
              <tr>
                <th style="padding: 10px; text-align: left; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">연락처</th>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${phone}</td>
              </tr>
              <tr>
                <th style="padding: 10px; text-align: left; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">이메일</th>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${email}</td>
              </tr>
            </tbody>
          </table>
          
          <div style="margin-top: 20px;">
            <h3 style="font-size: 16px; color: #334155; margin-bottom: 10px;">문의 내용</h3>
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; white-space: pre-wrap; color: #475569; line-height: 1.6;">
              ${message}
            </div>
          </div>
        </div>
      `,
    };

    // 비밀번호가 설정되어 있지 않은 로컬 테스트 환경 예외처리
    if (!process.env.EMAIL_PASS) {
      console.log("Email Pass is missing. Simulating successful email send in development.");
      console.log("Simulated Email Content:", mailOptions.html);
      return NextResponse.json({ success: true, simulated: true });
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
