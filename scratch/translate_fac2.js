const fs = require('fs');
const path = require('path');

const newStrings = {
  about_fac_a_badge: { ko: "A동", en: "Building A", ja: "A棟" },
  about_fac_b_badge: { ko: "B동", en: "Building B", ja: "B棟" },
  about_fac_c_badge: { ko: "C동", en: "Building C", ja: "C棟" },
  
  about_fac_a_hoist: { ko: "10TON*5TON 2대, 5TON 1대", en: "10TON*5TON 2 units, 5TON 1 unit", ja: "10TON*5TON 2台, 5TON 1台" },
  about_fac_b_hoist: { ko: "10TON 1대, 5TON 1대", en: "10TON 1 unit, 5TON 1 unit", ja: "10TON 1台, 5TON 1台" },
  about_fac_c_hoist: { ko: "20TON*20TON 2대, 10TON 1대", en: "20TON*20TON 2 units, 10TON 1 unit", ja: "20TON*20TON 2台, 10TON 1台" }
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
