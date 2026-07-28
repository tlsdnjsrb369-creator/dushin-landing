"use client";

import { useState } from "react";
import { Send, FileText, Phone, Mail, Building, Printer, MapPin, Paperclip } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function CTA() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    message: "",
    agree: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState([]);
  const [honeypot, setHoneypot] = useState("");

  const MAX_TOTAL = 4 * 1024 * 1024; // 4MB (서버 전송 한도)

  const handleFileChange = (e) => {
    const picked = Array.from(e.target.files || []);
    const total = picked.reduce((s, f) => s + f.size, 0);
    if (total > MAX_TOTAL) {
      alert(t('cta_file_toobig') || "첨부파일 용량이 너무 큽니다(총 4MB 이하). 큰 도면은 skj1994@naver.com 으로 보내주세요.");
      e.target.value = "";
      setFiles([]);
      return;
    }
    setFiles(picked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const body = new FormData();
      Object.entries(formData).forEach(([k, v]) => body.append(k, v));
      if (honeypot) body.append("website", honeypot);
      files.forEach((f) => body.append("files", f));

      const res = await fetch("/api/contact", { method: "POST", body });

      // 서버가 JSON이 아닌 오류(용량 초과 등)를 돌려줄 수 있으므로 방어
      const data = await res.json().catch(() => ({ success: false }));
      if (!res.ok) {
        alert(
          data.error ||
            (res.status === 413
              ? (t('cta_file_toobig') || "첨부파일 용량이 너무 큽니다. 큰 도면은 skj1994@naver.com 으로 보내주세요.")
              : (t('contact_fail') || "이메일 전송에 실패했습니다. 다시 시도해 주세요."))
        );
        return;
      }
      if (data.success) {
        alert(t('contact_success') || "문의가 성공적으로 접수되었습니다. 확인 후 연락드리겠습니다.");
        setSubmitted(true);
        setFiles([]);
        setFormData({
          company: "",
          name: "",
          phone: "",
          email: "",
          message: "",
          agree: false
        });
      } else {
        alert(t('contact_fail') || "이메일 전송에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error(error);
      alert(t('contact_fail') || "이메일 전송에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <section id="cta" className="relative py-28 bg-transparent overflow-hidden">
      {/* 백그라운드 광원 효과 */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] glow-radial opacity-20 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* 왼쪽 안내 텍스트 (12열 중 5열) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-bold tracking-widest text-brand-blue uppercase block mb-3">
              {t('cta_badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              {t('cta_title_1')}<br />
              <span className="text-brand-blue">{t('cta_title_2')}</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 font-medium">
              {t('cta_desc')}
            </p>

            {/* 신뢰 배지 그룹 */}
            <div className="flex flex-col gap-4 border-t border-slate-200/80 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-brand-blue">BB</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-800 block">{t('cta_badge1_title')}</span>
                  <span className="text-xs text-slate-500 font-medium">{t('cta_badge1_desc')}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-brand-red">80T</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-800 block">{t('cta_badge2_title')}</span>
                  <span className="text-xs text-slate-500 font-medium">{t('cta_badge2_desc')}</span>
                </div>
              </div>
            </div>

            {/* 직접 연락 카드 — 폼이 부담스러운 방문자용 */}
            <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-sm font-bold text-slate-800 block mb-4">{t('cta_contact_title')}</span>
              <div className="flex flex-col gap-3">
                <a href="tel:032-562-5494" className="flex items-center gap-3 group">
                  <Phone className="w-4 h-4 text-brand-blue shrink-0" />
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-brand-blue transition-colors">032-562-5494</span>
                </a>
                <div className="flex items-center gap-3">
                  <Printer className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-sm font-medium text-slate-600">FAX 032-568-5494</span>
                </div>
                <a href="mailto:skj1994@naver.com" className="flex items-center gap-3 group">
                  <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-brand-blue transition-colors">skj1994@naver.com</span>
                </a>
                <a
                  href="https://maps.google.com/?q=인천광역시 서구 검단천로356번길 46"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-brand-blue transition-colors">{t('cta_contact_addr')}</span>
                </a>
              </div>
              <p className="text-xs text-slate-500 mt-4 leading-relaxed border-t border-slate-200 pt-3">
                {t('cta_drawing_note')}
              </p>
            </div>
          </div>

          {/* 오른쪽 문의하기 폼 (12열 중 7열) */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-2xl bg-white border border-slate-200/80 shadow-xl relative overflow-hidden">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-brand-blue/10 border border-brand-blue flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <Send className="w-6 h-6 text-brand-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{t('cta_success')}</h3>
                  <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed font-medium">
                    {t('cta_success_desc')}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 px-6 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-brand-blue rounded transition-all duration-300"
                  >
                    {t('cta_reset')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-blue" />
                    {t('cta_form_title')}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 회사명 */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-slate-400" /> {t('cta_form_company')}
                      </label>
                      <input
                        required
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={t('cta_form_company_ph')}
                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-brand-blue focus:shadow-[0_0_10px_rgba(0,85,164,0.1)] transition-all"
                      />
                    </div>

                    {/* 담당자명 */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500">{t('cta_form_name')}</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('cta_form_name_ph')}
                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-brand-blue focus:shadow-[0_0_10px_rgba(0,85,164,0.1)] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 연락처 */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" /> {t('cta_form_phone')}
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t('cta_form_phone_ph')}
                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-brand-blue focus:shadow-[0_0_10px_rgba(0,85,164,0.1)] transition-all"
                      />
                    </div>

                    {/* 이메일 */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" /> {t('cta_form_email')}
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('cta_form_email_ph')}
                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-brand-blue focus:shadow-[0_0_10px_rgba(0,85,164,0.1)] transition-all"
                      />
                    </div>
                  </div>

                  {/* 문의 내용 */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500">{t('cta_form_msg')}</label>
                    <textarea
                      required
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('cta_form_msg_ph')}
                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-brand-blue focus:shadow-[0_0_10px_rgba(0,85,164,0.1)] transition-all resize-none"
                    />
                  </div>

                  {/* 봇 감지용 숨은 칸 — 사람에게는 보이지 않습니다 */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                    onChange={(e) => setHoneypot(e.target.value)}
                  />

                  {/* 도면·사양서 첨부 */}
                  <div>
                    <label htmlFor="files" className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2">
                      <Paperclip className="w-3.5 h-3.5" />
                      {t('cta_form_file_label')}
                    </label>
                    <input
                      id="files"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.dwg,.dxf,.zip,.xlsx,.hwp"
                      onChange={handleFileChange}
                      className="w-full text-sm text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 file:cursor-pointer cursor-pointer"
                    />
                    {files.length > 0 && (
                      <ul className="mt-2 flex flex-col gap-1">
                        {files.map((f, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                            <FileText className="w-3 h-3 text-brand-blue shrink-0" />
                            <span className="truncate">{f.name}</span>
                            <span className="text-slate-400 shrink-0">({(f.size / 1024 / 1024).toFixed(1)}MB)</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                      {t('cta_form_file_note')}
                    </p>
                  </div>

                  {/* 약관 동의 */}
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      id="agree"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleChange}
                      className="w-4 h-4 accent-brand-blue border-slate-200 rounded cursor-pointer"
                    />
                    <label htmlFor="agree" className="text-xs text-slate-500 select-none cursor-pointer font-semibold">
                      {t('cta_form_agree')}
                    </label>
                  </div>

                  {/* 전송 버튼 */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-brand-blue to-blue-600 text-white font-extrabold tracking-wider rounded-lg hover:scale-[1.02] active:scale-98 transition-all duration-300 shadow-[0_4px_15px_rgba(0,85,164,0.15)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">전송 중...</span>
                    ) : (
                      <>
                        {t('cta_form_submit')}
                        <Send className="w-4 h-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
