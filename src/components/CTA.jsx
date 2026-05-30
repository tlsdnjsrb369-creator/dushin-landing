"use client";

import { useState } from "react";
import { Send, FileText, Phone, Mail, Building } from "lucide-react";
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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }
    setSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <section id="cta" className="relative py-28 bg-white border-t border-slate-200/80 overflow-hidden">
      {/* 백그라운드 광원 효과 */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] glow-radial opacity-20 pointer-events-none rounded-full" />
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* 왼쪽 안내 텍스트 (12열 중 5열) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-bold tracking-widest text-neon-cyan uppercase block mb-3">
              {t('cta_badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              {t('cta_title_1')}<br />
              <span className="text-[#00b4d8]">{t('cta_title_2')}</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 font-medium">
              {t('cta_desc')}
            </p>

            {/* 신뢰 배지 그룹 */}
            <div className="flex flex-col gap-4 border-t border-slate-200/80 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-[#0096c7]">B+</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-800 block">은행 신용평가등급 B+</span>
                  <span className="text-xs text-slate-500 font-medium">부실 리스크 없는 견고한 재무건전성 보장</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neon-lime/10 border border-neon-lime/30 flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-[#21b009]">80T</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-800 block">80TON 크레인 자체 인프라</span>
                  <span className="text-xs text-slate-500 font-medium">초대형 구조물 및 성형기 프레임 원스톱 가공</span>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 문의하기 폼 (12열 중 7열) */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-2xl bg-white border border-slate-200/80 shadow-xl relative overflow-hidden">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-neon-cyan/10 border border-neon-cyan flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <Send className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{t('cta_success')}</h3>
                  <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed font-medium">
                    {t('cta_success_desc')}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 px-6 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-neon-cyan rounded transition-all duration-300"
                  >
                    {t('cta_reset')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-neon-cyan" />
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
                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,210,222,0.1)] transition-all"
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
                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,210,222,0.1)] transition-all"
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
                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,210,222,0.1)] transition-all"
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
                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,210,222,0.1)] transition-all"
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
                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,210,222,0.1)] transition-all resize-none"
                    />
                  </div>

                  {/* 약관 동의 */}
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      id="agree"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleChange}
                      className="w-4 h-4 accent-neon-cyan border-slate-200 rounded cursor-pointer"
                    />
                    <label htmlFor="agree" className="text-xs text-slate-500 select-none cursor-pointer font-semibold">
                      {t('cta_form_agree')}
                    </label>
                  </div>

                  {/* 전송 버튼 */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-neon-cyan to-neon-lime text-slate-800 font-extrabold tracking-wider rounded-lg hover:scale-[1.02] active:scale-98 transition-all duration-300 shadow-[0_4px_15px_rgba(0,210,222,0.15)] flex items-center justify-center gap-2"
                  >
                    {t('cta_form_submit')}
                    <Send className="w-4 h-4 stroke-[2.5]" />
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
