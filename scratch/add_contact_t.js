const fs = require('fs');
const path = require('path');

const tFile = path.join(__dirname, '../src/locales/translations.js');
let content = fs.readFileSync(tFile, 'utf8');

const replacements = [
  { search: 'hero_btn_inquiry: "제작 문의하기",', replace: 'contact_success: "문의가 성공적으로 접수되었습니다. 확인 후 연락드리겠습니다.", contact_fail: "이메일 전송에 실패했습니다. 다시 시도해 주세요.", hero_btn_inquiry: "제작 문의하기",', lang: 'ko' },
  { search: 'hero_btn_inquiry: "Contact Us",', replace: 'contact_success: "Your inquiry has been successfully submitted. We will contact you soon.", contact_fail: "Failed to send the email. Please try again later.", hero_btn_inquiry: "Contact Us",', lang: 'en' },
  { search: 'hero_btn_inquiry: "製作のお問い合わせ",', replace: 'contact_success: "お問い合わせが正常に受け付けられました。確認後、ご連絡いたします。", contact_fail: "メールの送信に失敗しました。後でもう一度お試しください。", hero_btn_inquiry: "製作のお問い合わせ",', lang: 'ja' }
];

replacements.forEach(rep => {
  content = content.replace(rep.search, rep.replace);
});

fs.writeFileSync(tFile, content);
console.log('Translations updated.');
