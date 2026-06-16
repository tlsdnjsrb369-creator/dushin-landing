const fs = require('fs');
const path = require('path');

const tFile = path.join(__dirname, '../src/locales/translations.js');
let content = fs.readFileSync(tFile, 'utf8');

const replacements = [
  // KO
  { search: 'hero_btn_inquiry: "견적 문의하기"', replace: 'hero_btn_inquiry: "제작 문의하기"' },
  { search: 'hero_btn_inquiry: "문의하기"', replace: 'hero_btn_inquiry: "제작 문의하기"' },
  { search: 'hero_btn_facilities: "보유 설비 보기"', replace: 'hero_btn_facilities: "회사 전경 및 설비"' },
  
  // EN
  { search: 'hero_btn_inquiry: "Request Quote"', replace: 'hero_btn_inquiry: "Contact Us"' },
  { search: 'hero_btn_facilities: "View Facilities"', replace: 'hero_btn_facilities: "Facilities & View"' },
  
  // JA (using regex for potential unicode variations in current translations)
];

// Instead of simple replace, let's just use regex to replace values
content = content.replace(/hero_btn_inquiry:\s*".*?"/g, (match, offset, str) => {
  if (offset < 1000) return 'hero_btn_inquiry: "제작 문의하기"'; // KO
  if (offset > 1000 && offset < 3000) return 'hero_btn_inquiry: "Contact Us"'; // EN
  return 'hero_btn_inquiry: "製作のお問い合わせ"'; // JA
});

content = content.replace(/hero_btn_facilities:\s*".*?"/g, (match, offset, str) => {
  if (offset < 1000) return 'hero_btn_facilities: "회사 전경 및 설비"'; // KO
  if (offset > 1000 && offset < 3000) return 'hero_btn_facilities: "Facilities & View"'; // EN
  return 'hero_btn_facilities: "会社全景及び設備"'; // JA
});

fs.writeFileSync(tFile, content);
console.log('Translations updated.');
