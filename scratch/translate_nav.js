const fs = require('fs');
const path = require('path');

const newStrings = {
  nav_archives_perf: { ko: "주요 납품 제작 실적", en: "Major Supply Performance", ja: "主要納品製作実績" },
  nav_archives_cert: { ko: "면허 및 자격증", en: "Licenses & Certificates", ja: "免許及び資格証" },
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
