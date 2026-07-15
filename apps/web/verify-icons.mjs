import fs from 'fs';
import path from 'path';

const packs = ['core-pack.ts', 'devops-pack.ts', 'monitoring-pack.ts'];
const iconDir = path.join(process.cwd(), 'public', 'vendor-icons');

let missing = 0;

for (const pack of packs) {
  const p = path.join(process.cwd(), 'src', 'lib', 'registry', 'packs', pack);
  let content = fs.readFileSync(p, 'utf-8');
  let changed = false;
  
  // Find all iconUrl: "/vendor-icons/XYZ.svg"
  const regex = /iconUrl:\s*['"]\/vendor-icons\/([^'"]+\.svg)['"]/g;
  let match;
  
  // Replace missing ones
  const newContent = content.replace(regex, (fullMatch, filename) => {
    const fullPath = path.join(iconDir, filename);
    if (!fs.existsSync(fullPath)) {
      console.log(`Missing SVG on disk: ${filename} in ${pack}`);
      missing++;
      return `/* icon missing */`; // by returning something without iconUrl, it removes it
    }
    return fullMatch;
  });
  
  if (content !== newContent) {
    fs.writeFileSync(p, newContent);
    console.log(`Updated ${pack} to remove missing icons.`);
  }
}

console.log(`Verification complete. Missing icons removed: ${missing}`);
