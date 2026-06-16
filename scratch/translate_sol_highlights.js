const fs = require('fs');
const path = require('path');

const newStrings = {
  // solution highlights + short titles + taglines for all 3 solutions
  sol1_short: { ko: "80TON 크레인 인프라", en: "80TON Crane Infrastructure", ja: "80TONクレーンインフラ" },
  sol1_tagline: { ko: "초대형 설비, 자체 처리 능력 보유", en: "In-house capability for ultra-large facilities", ja: "超大型設備を自社で対応" },
  sol1_h1: { ko: "80TON 크레인 자체 인프라", en: "80TON crane in-house infrastructure", ja: "80TONクレーン 自社インフラ" },
  sol1_h2: { ko: "수십 톤 단위 대형 제철 설비 핸들링", en: "Handling large steel facilities of tens of tons", ja: "数十トン単位の大型製鉄設備のハンドリング" },
  sol1_h3: { ko: "외주 없는 독립적 공장 내 처리", en: "Independent in-factory processing without outsourcing", ja: "外注なしの独立した工場内処理" },

  sol2_short: { ko: "재무안정성 B+", en: "Financial Stability B+", ja: "財務安定性 B+" },
  sol2_tagline: { ko: "장기 프로젝트를 완주하는 재무 체력", en: "Financial strength to complete long-term projects", ja: "長期プロジェクトを完遂する財務体力" },
  sol2_h1: { ko: "은행 신용평가등급 B+", en: "Bank credit rating B+", ja: "銀行信用格付けB+" },
  sol2_h2: { ko: "부실 리스크 없는 견고한 재무건전성 보장", en: "Solid financial soundness with no default risk", ja: "不実リスクのない強固な財務健全性の保証" },
  sol2_h3: { ko: "장기 대형 프로젝트 계약 이행력 100%", en: "100% long-term large project contract fulfillment", ja: "長期大型プロジェクト契約の履行力100%" },

  sol3_short: { ko: "무결점 품질 & 납기", en: "Flawless Quality & Delivery", ja: "無欠点品質＆納期" },
  sol3_tagline: { ko: "오차 제로, 납기 지연 제로 시스템", en: "Zero error, zero delivery delay system", ja: "誤差ゼロ、納期遅延ゼロのシステム" },
  sol3_h1: { ko: "4대 비파괴검사(RT/UT/MT/PT) 전수 실시", en: "4 major NDTs (RT/UT/MT/PT) applied to all products", ja: "4大非破壊検査（RT/UT/MT/PT）の全数実施" },
  sol3_h2: { ko: "3D 시뮬레이션 기반 정밀 설계 오류 차단", en: "Precision design error prevention based on 3D simulation", ja: "3Dシミュレーションによる精密設計エラーの遮断" },
  sol3_h3: { ko: "ISO 9001 기반 품질경영 시스템 인증", en: "ISO 9001-based quality management system certified", ja: "ISO 9001基盤の品質経営システム認証" }
};

const tFile = path.join(__dirname, '../src/locales/translations.js');
let content = fs.readFileSync(tFile, 'utf8');

function injectData(lang) {
  let langData = '';
  for (const [key, obj] of Object.entries(newStrings)) {
    langData += `    ${key}: ${JSON.stringify(obj[lang])},\n`;
  }
  
  const searchStr = `${lang}: {`;
  const idx = content.indexOf(searchStr);
  if (idx !== -1) {
    const insertIdx = idx + searchStr.length + 1;
    content = content.slice(0, insertIdx) + '\n' + langData + content.slice(insertIdx);
  }
}

injectData('ko');
injectData('en');
injectData('ja');

fs.writeFileSync(tFile, content);
console.log('Solution highlights added to all 3 language blocks.');
