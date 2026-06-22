const fs = require('fs');
const path = require('path');

const targetDirs = [
  'about',
  'services',
  'inquiry',
  'archives/performance',
  'archives/certificates',
  'archives',
  'facilities'
];

const basePath = path.join(__dirname, '../src/app');

targetDirs.forEach(dir => {
  const pagePath = path.join(basePath, dir, 'page.js');
  const jsxPath = path.join(basePath, dir, 'page.jsx');
  
  let targetPath = null;
  if (fs.existsSync(pagePath)) targetPath = pagePath;
  else if (fs.existsSync(jsxPath)) targetPath = jsxPath;
  else return;

  let content = fs.readFileSync(targetPath, 'utf8');
  
  if (content.includes('SubPageBackground')) return;

  // Add import
  const importStatement = `import SubPageBackground from "@/components/SubPageBackground";\n`;
  content = importStatement + content;

  // Find return statement and wrap
  // Assumes page returns a single component, like: return <AboutUs />;
  // We'll replace `return <Component />` with `return <><SubPageBackground /><Component /></>`
  content = content.replace(/return\s+(<[A-Za-z0-9_]+[^>]*\/>);/g, 'return (\n    <>\n      <SubPageBackground />\n      $1\n    </>\n  );');
  
  // What if it's returning something with children?
  // Let's do a more robust approach if needed. But for our simple pages it might just work.
  fs.writeFileSync(targetPath, content);
  console.log(`Updated ${targetPath}`);
});
