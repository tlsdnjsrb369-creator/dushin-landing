const fs = require('fs');
const path = require('path');

const newStrings = {
  cta_badge1_title: { ko: "은행 신용평가등급 B+", en: "Bank Credit Rating B+", ja: "銀行格付け B+" },
  cta_badge1_desc: { ko: "부실 리스크 없는 견고한 재무건전성 보장", en: "Guaranteed solid financial stability", ja: "不渡りリスクのない強固な財務健全性を保証" },
  cta_badge2_title: { ko: "80TON 크레인 자체 인프라", en: "80TON Crane Infrastructure", ja: "80TONクレーン自社インフラ" },
  cta_badge2_desc: { ko: "초대형 구조물 및 성형기 프레임 원스톱 가공", en: "One-stop machining for ultra-large structures", ja: "超大型構造物および成形機フレームのワンストップ加工" }
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
console.log('CTA badges added.');
