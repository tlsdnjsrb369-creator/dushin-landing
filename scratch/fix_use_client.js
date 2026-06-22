const fs = require('fs');
const path = require('path');
const targetDirs = ['about', 'services', 'inquiry', 'archives/performance', 'archives/certificates', 'archives', 'facilities'];
const basePath = path.join(__dirname, '../src/app');

targetDirs.forEach(dir => {
  const pagePath = path.join(basePath, dir, 'page.js');
  const jsxPath = path.join(basePath, dir, 'page.jsx');
  
  let targetPath = null;
  if (fs.existsSync(pagePath)) targetPath = pagePath;
  else if (fs.existsSync(jsxPath)) targetPath = jsxPath;
  else return;

  let content = fs.readFileSync(targetPath, 'utf8');
  if (content.startsWith('import SubPageBackground')) {
    content = content.replace(/^import SubPageBackground from "@\/components\/SubPageBackground";\n"use client";/m, '"use client";\nimport SubPageBackground from "@/components/SubPageBackground";');
    fs.writeFileSync(targetPath, content);
    console.log('Fixed use client in ' + targetPath);
  }
});
