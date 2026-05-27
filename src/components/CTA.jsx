"use client";

import { useState } from "react";
import { Send, FileText, Phone, Mail, Building } from "lucide-react";

export default function CTA() {
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
    // 여기에 전송 로직 추가 가능
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
    <section id="cta" className="relative py-28 bg-[#08090d] border-t border-dark-border overflow-hidden">
      {/* 백그라운드 광원 효과 */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] glow-radial opacity-30 pointer-events-none rounded-full" />
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* 왼쪽 안내 텍스트 (12열 중 5열) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-bold tracking-widest text-neon-cyan uppercase block mb-3">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
              귀사의 성공적인 기계 제작,<br />
              <span className="text-neon-cyan">두신이엔지가 함께합니다.</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
              설계 도면 분석부터 80TON 가공 인프라 활용, 최종 품질 검사까지 당사의 전문 엔지니어가 직접 상담해 드립니다. 신뢰할 수 있는 파트너십의 첫걸음을 떼어보십시오.
            </p>

            {/* 신뢰 배지 그룹 */}
            <div className="flex flex-col gap-4 border-t border-dark-border pt-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center">
                  <span className="text-xs font-bold text-neon-cyan">B+</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-white block">은행 신용평가등급 B+</span>
                  <span className="text-xs text-gray-500">부실 리스크 없는 견고한 재무건전성 보장</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neon-lime/10 border border-neon-lime/30 flex items-center justify-center">
                  <span className="text-xs font-bold text-neon-lime">80T</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-white block">80TON 크레인 자체 인프라</span>
                  <span className="text-xs text-gray-500">초대형 구조물 및 성형기 프레임 원스톱 가공</span>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 문의하기 폼 (12열 중 7열) */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-2xl bg-dark-card border border-dark-border shadow-2xl relative overflow-hidden">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-neon-cyan/10 border border-neon-cyan flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <Send className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">문의가 성공적으로 접수되었습니다.</h3>
                  <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
                    작성해주신 연락처와 이메일로 24시간 이내에 담당 엔지니어가 검토 보고서와 함께 안내 전화를 드리겠습니다.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 px-6 py-2.5 text-xs font-semibold text-gray-400 hover:text-white border border-dark-border hover:border-neon-cyan rounded transition-all duration-300"
                  >
                    새로 작성하기
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-neon-cyan" />
                    프로젝트 상세 문의
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 회사명 */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5" /> 회사명
                      </label>
                      <input
                        required
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="예: (주)두신이엔지"
                        className="w-full px-4 py-3 text-sm bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,242,254,0.15)] transition-all"
                      />
                    </div>

                    {/* 담당자명 */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-400">담당자명</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="성함을 입력해주세요"
                        className="w-full px-4 py-3 text-sm bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,242,254,0.15)] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 연락처 */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" /> 연락처
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="예: 010-0000-0000"
                        className="w-full px-4 py-3 text-sm bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,242,254,0.15)] transition-all"
                      />
                    </div>

                    {/* 이메일 */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> 이메일
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@company.com"
                        className="w-full px-4 py-3 text-sm bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,242,254,0.15)] transition-all"
                      />
                    </div>
                  </div>

                  {/* 문의 내용 */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-400">문의 내용</label>
                    <textarea
                      required
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="제작하시려는 프레임 규격이나 설비 사양, 요청 일정 등을 자유롭게 적어주세요."
                      className="w-full px-4 py-3 text-sm bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,242,254,0.15)] transition-all resize-none"
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
                      className="w-4 h-4 accent-neon-cyan bg-dark-bg border-dark-border rounded cursor-pointer"
                    />
                    <label htmlFor="agree" className="text-xs text-gray-400 select-none cursor-pointer">
                      개인정보 수집 및 이용 동의 (필수)
                    </label>
                  </div>

                  {/* 전송 버튼 */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-neon-cyan to-neon-lime text-black font-bold tracking-wider rounded-lg hover:scale-[1.02] active:scale-98 transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.2)] flex items-center justify-center gap-2"
                  >
                    상담 신청서 전송
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
