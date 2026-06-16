const fs = require('fs');
const path = require('path');

const certData = {
  cert_badge: { ko: "Certificates", en: "Certificates", ja: "Certificates" },
  cert_title: { ko: "면허 및 자격증", en: "Licenses & Certificates", ja: "免許および資格証" },
  cert_desc: {
    ko: "(주)두신이엔지가 보유한 각종 면허, 인증서 및 자격증입니다. 카드를 클릭하면 상세 이미지를 확인할 수 있습니다.",
    en: "Various licenses, certificates, and qualifications held by Dooshin Engineering. Click on the cards to view detailed images.",
    ja: "（株）斗信エンジが保有する各種免許、認証書、資格証です。カードをクリックすると詳細画像を確認できます。"
  },
  cert_view: { ko: "View", en: "View", ja: "表示" },
  cert_company: { ko: "(주)두신이엔지", en: "Dooshin Engineering", ja: "（株）斗信エンジ" },
  cert_modal_badge: { ko: "Certificate", en: "Certificate", ja: "Certificate" },
  cert_close: { ko: "닫기", en: "Close", ja: "閉じる" },
  
  cert1_name: { ko: "사업자 등록증", en: "Business Registration", ja: "事業者登録証" },
  cert2_name: { ko: "공장등록증명서", en: "Factory Registration Certificate", ja: "工場登録証明書" },
  cert3_name: { ko: "ISO 9001인증서", en: "ISO 9001 Certificate", ja: "ISO 9001認証書" },
  cert4_name: { ko: "위험성평가 인정서", en: "Risk Assessment Certificate", ja: "危険性評価認定書" },
  cert5_name: { ko: "중소기업 확인서", en: "SME Confirmation", ja: "中小企業確認書" },
  cert6_name: { ko: "벤처기업확인서", en: "Venture Enterprise Certificate", ja: "ベンチャー企業確認書" },
  cert7_name: { ko: "연구개발전담부서", en: "R&D Department Certificate", ja: "研究開発専門部署" }
};

const perfData = {
  perf_badge: { ko: "Performance", en: "Performance", ja: "Performance" },
  perf_title: { ko: "주요 납품 제작 실적", en: "Major Deliveries & Achievements", ja: "主要納品製作実績" },
  perf_desc: {
    ko: "(주)두신이엔지가 지금까지 납품 및 제작한 주요 실적을 소개합니다. 카드를 클릭하여 프로젝트 상세 사진 갤러리를 확인하세요.",
    en: "Introducing the major achievements delivered and manufactured by Dooshin Engineering. Click on the cards to view the detailed photo gallery of each project.",
    ja: "（株）斗信エンジがこれまでに納品および製作した主要な実績をご紹介します。カードをクリックしてプロジェクトの詳細写真ギャラリーをご確認ください。"
  },
  perf_photo_count_1: { ko: "사진 ", en: "Photos: ", ja: "写真 " },
  perf_photo_count_2: { ko: "장", en: "", ja: "枚" },
  perf_view_more: { ko: "사진 여러 장 보기", en: "View multiple photos", ja: "複数の写真を見る" },
  perf_no_image: { ko: "No Image", en: "No Image", ja: "No Image" },
  perf_no_data: { ko: "등록된 실적이 없습니다.", en: "No achievements registered.", ja: "登録された実績がありません。" },

  perf1_title: { ko: "SPCO Ferrocoke manufacturing facility(JFE공장) - 日本", en: "SPCO Ferrocoke manufacturing facility (JFE Plant) - Japan", ja: "SPCO フェロコークス製造設備（JFE工場） - 日本" },
  perf1_desc: { ko: "일본 JFE공장에 성공적으로 납품된 고효율 훼로코크스 생산 및 취급 핵심 설비입니다.", en: "High-efficiency ferrocoke production and handling core facility successfully delivered to the JFE plant in Japan.", ja: "日本JFE工場に成功裏に納品された高効率フェロコークス生産および取り扱いの核心設備です。" },
  perf2_title: { ko: "SPCO (MNM GUIDE RAIL)-日本", en: "SPCO (MNM GUIDE RAIL) - Japan", ja: "SPCO（MNMガイドレール）- 日本" },
  perf2_desc: { ko: "MNM 가이드 레일 시스템으로 설비의 정밀한 이동 및 내구성을 향상시켰습니다.", en: "Improved precise movement and durability of facilities with the MNM guide rail system.", ja: "MNMガイドレールシステムにより、設備の精密な移動と耐久性を向上させました。" },
  perf3_title: { ko: "JFE 화성공장 (Primary Cooler)-日本", en: "JFE Chemical Plant (Primary Cooler) - Japan", ja: "JFE化成工場（Primary Cooler）- 日本" },
  perf3_desc: { ko: "고열 환경에서도 안정적인 냉각 성능을 발휘하는 프라이머리 쿨러(Primary Cooler)입니다.", en: "A primary cooler that delivers stable cooling performance even in high-heat environments.", ja: "高熱環境でも安定した冷却性能を発揮するプライマリークーラーです。" },
  perf4_title: { ko: "MHISES-日本", en: "MHISES - Japan", ja: "MHISES - 日本" },
  perf4_desc: { ko: "MHISES 전용 설비 파트로 까다로운 국제 규격을 충족하는 최고 수준의 품질을 보장합니다.", en: "As an MHISES exclusive facility part, we guarantee the highest quality meeting strict international standards.", ja: "MHISES専用設備部品として、厳しい国際規格を満たす最高レベルの品質を保証します。" },
  perf5_title: { ko: "MHI(LF ROOF 제작)-인도네시아", en: "MHI (LF ROOF Manufacturing) - Indonesia", ja: "MHI（LF ROOF製作）- インドネシア" },
  perf5_desc: { ko: "인도네시아 제철소 LF 공정 최적화를 위한 견고한 루프(ROOF) 설비 시공 실적입니다.", en: "A solid roof facility construction achievement for optimizing the LF process in an Indonesian steel mill.", ja: "インドネシアの製鉄所におけるLF工程最適化のための堅固なルーフ（ROOF）設備施工実績です。" },
  perf6_title: { ko: "NMF 천정링(ETO OXYGEN)-日本", en: "NMF Ceiling Ring (ETO OXYGEN) - Japan", ja: "NMF天井リング（ETO OXYGEN）- 日本" },
  perf6_desc: { ko: "극한의 압력과 온도를 견뎌내는 ETO OXYGEN 공정 맞춤형 특수 천정링 구조물입니다.", en: "A special ceiling ring structure customized for the ETO OXYGEN process that withstands extreme pressure and temperature.", ja: "極限の圧力と温度に耐えるETO OXYGEN工程カスタマイズ特殊天井リング構造物です。" },
  perf7_title: { ko: "금수산업(주)-(제강설비)日本 NSE", en: "Geumsoo Industry Co., Ltd. - (Steelmaking Facility) Japan NSE", ja: "錦水産業（株） - （製鋼設備）日本 NSE" },
  perf7_desc: { ko: "일본 NSE 수출용 제강설비 제작 프로젝트로, 완벽한 용접과 조립 품질을 검증받았습니다.", en: "A steelmaking facility manufacturing project exported to NSE in Japan, verifying perfect welding and assembly quality.", ja: "日本NSE輸出用製鋼設備製作プロジェクトで、完璧な溶接と組み立て品質が検証されました。" },
  perf8_title: { ko: "STC 고순화로 및 WALKWAY-(주)썸백", en: "STC High-Purity Furnace & WALKWAY - Someback Co., Ltd.", ja: "STC高純化炉およびWALKWAY - （株）サムバック" },
  perf8_desc: { ko: "안전성과 운용 편의성을 동시에 고려하여 제작된 고순화로 및 전용 워크웨이 설비입니다.", en: "A high-purity furnace and exclusive walkway facility manufactured considering both safety and operational convenience.", ja: "安全性と運用の利便性を同時に考慮して製作された高純化炉および専用ウォークウェイ設備です。" },
  perf9_title: { ko: "동국제강 운반설비 CASSETTE(당진공장)", en: "Dongkuk Steel Transport Facility CASSETTE (Dangjin Plant)", ja: "東国製鋼 運搬設備 CASSETTE（唐津工場）" },
  perf9_desc: { ko: "동국제강 당진공장에 도입된 고중량 강판 운반용 카세트(Cassette) 시스템입니다.", en: "A heavy steel plate transport cassette system introduced at Dongkuk Steel's Dangjin plant.", ja: "東国製鋼 唐津工場に導入された高重量鋼板運搬用カセットシステムです。" },
  perf10_title: { ko: "포항 현대 완충통-용운중공업(주)", en: "Pohang Hyundai Buffer Cylinder - Yongwoon Heavy Industries Co., Ltd.", ja: "浦項 現代 緩衝筒 - 龍雲重工業（株）" },
  perf10_desc: { ko: "용운중공업에 납품된 특수 완충통으로, 충격을 효과적으로 흡수하는 탁월한 설계가 적용되었습니다.", en: "A special buffer cylinder delivered to Yongwoon Heavy Industries, applying an excellent design that effectively absorbs shocks.", ja: "龍雲重工業に納品された特殊緩衝筒で、衝撃を効果的に吸収する卓越した設計が適用されました。" },
  perf11_title: { ko: "현대제철 용강레들유입시공기-(당진공장)", en: "Hyundai Steel Molten Steel Ladle Inflow Machine - (Dangjin Plant)", ja: "現代製鉄 溶鋼レードル流入施工機 - （唐津工場）" },
  perf11_desc: { ko: "현대제철 당진공장의 용강 레들 공정을 위한 최첨단 자동 유입 및 시공 장비입니다.", en: "State-of-the-art automated inflow and construction equipment for the molten steel ladle process at Hyundai Steel's Dangjin plant.", ja: "現代製鉄 唐津工場の溶鋼レードル工程のための最先端自動流入および施工装備です。" },
  perf12_title: { ko: "현대제철 90TON 레들대차-(인천공장)", en: "Hyundai Steel 90TON Ladle Car - (Incheon Plant)", ja: "現代製鉄 90TON レードル台車 - （仁川工場）" },
  perf12_desc: { ko: "90톤의 초고중량 용융 금속을 안전하고 신속하게 이송하기 위한 초대형 레들 대차입니다.", en: "An ultra-large ladle car designed to safely and quickly transfer 90 tons of ultra-heavy molten metal.", ja: "90トンの超高重量溶融金属を安全かつ迅速に移送するための超大型レードル台車です。" },
  perf13_title: { ko: "현대제철ROOF -(당진공장)", en: "Hyundai Steel ROOF - (Dangjin Plant)", ja: "現代製鉄 ROOF - （唐津工場）" },
  perf13_desc: { ko: "현대제철 당진공장의 전기로 설비를 감싸며 고열과 분진을 차단하는 내화 루프 시스템입니다.", en: "A fireproof roof system that encloses the electric arc furnace facility at Hyundai Steel's Dangjin plant, blocking high heat and dust.", ja: "現代製鉄 唐津工場の電気炉設備を包み込み、高熱と粉塵を遮断する耐火ルーフシステムです。" },
  perf14_title: { ko: "현대제철 120TON B로 접동관-(인천공장)", en: "Hyundai Steel 120TON Furnace B Sliding Pipe - (Incheon Plant)", ja: "現代製鉄 120TON B炉 摺動管 - （仁川工場）" },
  perf14_desc: { ko: "120톤 규모의 B로 전기로에 부착되는 접동관으로 극한의 조업 환경을 견디도록 특수 코팅되었습니다.", en: "A sliding pipe attached to the 120-ton Furnace B electric arc furnace, specially coated to withstand extreme operating environments.", ja: "120トン規模のB炉電気炉に取り付けられる摺動管で、極限の操業環境に耐えるよう特殊コーティングされています。" },
  perf15_title: { ko: "필리핀 할루어 댐 STEEL PENSTOCK-(주)대우건설", en: "Philippines Haluer Dam STEEL PENSTOCK - Daewoo E&C Co., Ltd.", ja: "フィリピン ハルオダム STEEL PENSTOCK - （株）大宇建設" },
  perf15_desc: { ko: "대우건설의 필리핀 할루어 댐 프로젝트에 납품된 초대형 수력 발전용 강철 수압관(Penstock)입니다.", en: "An ultra-large steel penstock for hydroelectric power generation delivered to Daewoo E&C's Haluer Dam project in the Philippines.", ja: "大宇建設のフィリピンハルオダムプロジェクトに納品された超大型水力発電用鋼鉄水圧管（Penstock）です。" },
  perf16_title: { ko: "RCP 제작조립-(주)재원산업기계", en: "RCP Manufacturing & Assembly - Jaewon Industrial Machinery Co., Ltd.", ja: "RCP 製作組み立て - （株）ジェウォン産業機械" },
  perf16_desc: { ko: "고성능 회전 제어 펌프(RCP)의 정밀한 제작 및 조립을 완수하여 파트너사의 신뢰를 얻은 실적입니다.", en: "An achievement that earned partner trust by completing the precise manufacturing and assembly of a high-performance rotary control pump (RCP).", ja: "高性能回転制御ポンプ（RCP）の精密な製作および組み立てを完遂し、パートナー企業の信頼を得た実績です。" },
  perf17_title: { ko: "PRESS BENDING MACHINE(HUSTEEL)-(주)재원산업기계", en: "PRESS BENDING MACHINE (HUSTEEL) - Jaewon Industrial Machinery Co., Ltd.", ja: "PRESS BENDING MACHINE（HUSTEEL）- （株）ジェウォン産業機械" },
  perf17_desc: { ko: "대형 강관(HUSTEEL)의 정밀 벤딩 가공을 가능케 하는 초대형 프레스 벤딩 머신의 뼈대 및 구동부 제작입니다.", en: "Manufacturing the framework and driving parts of an ultra-large press bending machine that enables precise bending of large steel pipes (HUSTEEL).", ja: "大型鋼管（HUSTEEL）の精密曲げ加工を可能にする超大型プレスベンディングマシンの骨組みおよび駆動部の製作です。" },
  perf18_title: { ko: "COOLING CONVEYOR-(주)일광메탈포밍", en: "COOLING CONVEYOR - Ilgwang Metal Forming Co., Ltd.", ja: "COOLING CONVEYOR - （株）日光メタルフォーミング" },
  perf18_desc: { ko: "고온 압연된 소재의 빠르고 균일한 온도 제어를 보장하는 맞춤형 쿨링 컨베이어 시스템입니다.", en: "A customized cooling conveyor system that ensures rapid and uniform temperature control of hot-rolled materials.", ja: "高温圧延された素材の迅速かつ均一な温度制御を保証するカスタマイズされたクーリングコンベアシステムです。" },
  perf19_title: { ko: "삼성전자 FAN&MOTOR BASE-(주)플랙트코리아", en: "Samsung Electronics FAN & MOTOR BASE - FläktGroup Korea Co., Ltd.", ja: "サムスン電子 FAN＆MOTOR BASE - （株）フラクトコリア" },
  perf19_desc: { ko: "삼성전자 첨단 설비에 들어가는 고속 회전체 모터와 팬의 진동을 완벽히 흡수하는 초정밀 베이스 프레임입니다.", en: "An ultra-precision base frame that perfectly absorbs the vibration of high-speed rotating motors and fans used in Samsung Electronics' advanced facilities.", ja: "サムスン電子の先端設備に入る高速回転体モーターとファンの振動を完全に吸収する超精密ベースフレームです。" },
  perf20_title: { ko: "DSMF Φ1350x560kw COLUMN PIPE-(주)대한중전기", en: "DSMF Φ1350x560kw COLUMN PIPE - Daehan Heavy Electric Co., Ltd.", ja: "DSMF Φ1350x560kw COLUMN PIPE - （株）大韓重電機" },
  perf20_desc: { ko: "초고압 환경에서의 내구성을 보장하는 대구경(Φ1350) 중전기용 특수 컬럼 파이프(Column Pipe) 제작 납품입니다.", en: "Manufactured and delivered a special column pipe for heavy electrical machinery with a large diameter (Φ1350) ensuring durability in ultra-high voltage environments.", ja: "超高圧環境での耐久性を保証する大口径（Φ1350）重電機用特殊カラムパイプ（Column Pipe）の製作納品です。" }
};

const tFile = path.join(__dirname, '../src/locales/translations.js');
let content = fs.readFileSync(tFile, 'utf8');

// The file exports `export const translations = { ko: { ... }, en: { ... }, ja: { ... } };`
// I will parse it by injecting the data into each language block.

function injectData(lang) {
  let langData = '';
  for (const [key, obj] of Object.entries(certData)) {
    langData += `    ${key}: ${JSON.stringify(obj[lang])},\n`;
  }
  for (const [key, obj] of Object.entries(perfData)) {
    langData += `    ${key}: ${JSON.stringify(obj[lang])},\n`;
  }
  
  // Find the start of the language block
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
