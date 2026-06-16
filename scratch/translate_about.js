const fs = require('fs');
const path = require('path');

const newStrings = {
  about_badge: { ko: "ABOUT US", en: "ABOUT US", ja: "ABOUT US" },
  about_title_1: { ko: "끊임없는 혁신과 기술력으로", en: "With relentless innovation and technology", ja: "絶え間ない革新と技術力で" },
  about_title_2: { ko: "미래를 창조하는 기업", en: "A company creating the future", ja: "未来を創造する企業" },
  about_desc: { 
    ko: "(주)두신이엔지는 2002년 설립 이래 정밀 기계 및 대형 제철 설비 분야에서 독보적인 기술력과 인프라를 구축해 왔습니다.", 
    en: "Since its establishment in 2002, Dooshin Engineering has built unrivaled technology and infrastructure in the fields of precision machinery and large-scale steel facilities.", 
    ja: "（株）斗信エンジは2002年の設立以来、精密機械および大型製鉄設備分野で圧倒的な技術力とインフラを構築してきました。" 
  },
  about_fac_img1: { ko: "압도적 스케일의 대형 제철 설비 제작 전경", en: "Panoramic view of large-scale steel facility manufacturing of overwhelming scale", ja: "圧倒的スケールの大型製鉄設備製作の全景" },
  about_fac_img2: { ko: "최첨단 인프라를 갖춘 (주)두신이엔지 외관", en: "Exterior of Dooshin Engineering equipped with state-of-the-art infrastructure", ja: "最先端インフラを備えた（株）斗信エンジの外観" },
  about_fac_area: { ko: "전체 면적: 450평 (38m x 39m)", en: "Total Area: 450 Pyeong (1,487㎡ / 38m x 39m)", ja: "全体面積：450坪（1,487㎡ / 38m x 39m）" },
  about_fac_a: { ko: "A동 (제작/제조 라인)", en: "Building A (Manufacturing/Production Line)", ja: "A棟（製作/製造ライン）" },
  about_fac_b: { ko: "B동 절단반", en: "Building B (Cutting Section)", ja: "B棟（切断班）" },
  about_fac_c: { ko: "C동 대형 프레스 및 용접", en: "Building C (Large Press & Welding)", ja: "C棟（大型プレスおよび溶接）" },
  about_fac_size_label: { ko: "규격", en: "Size", ja: "規格" },
  about_fac_hoist_label: { ko: "호이스트", en: "Hoist", ja: "ホイスト" }
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
console.log('Translations updated.');
