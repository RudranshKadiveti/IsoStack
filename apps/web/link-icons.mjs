import fs from 'fs';
import path from 'path';

const packPaths = [
  path.join(process.cwd(), 'src', 'lib', 'registry', 'packs', 'core-pack.ts'),
  path.join(process.cwd(), 'src', 'lib', 'registry', 'packs', 'devops-pack.ts'),
  path.join(process.cwd(), 'src', 'lib', 'registry', 'packs', 'monitoring-pack.ts')
];

const iconDir = path.join(process.cwd(), 'public', 'vendor-icons');
let linked = 0;

for (const p of packPaths) {
  if (!fs.existsSync(p)) continue;
  let content = fs.readFileSync(p, 'utf-8');
  
  // The regex finds a node definition block starting with type: "XYZ", and looking ahead to see if it misses iconUrl.
  // Actually, simpler: split by `{ type: "` and string replacement.
  const regex = /type:\s*['"]([^'"]+)['"]([^}]+)fallbackIcon:/g;
  
  const newContent = content.replace(regex, (match, type, between) => {
    // Check if it already has iconUrl
    if (between.includes('iconUrl:')) return match;
    
    // Check if file exists
    const svgPath = path.join(iconDir, `${type}.svg`);
    if (fs.existsSync(svgPath)) {
      linked++;
      return `type: "${type}"${between}iconUrl: "/vendor-icons/${type}.svg",\n    fallbackIcon:`;
    }
    
    return match;
  });
  
  if (content !== newContent) {
    fs.writeFileSync(p, newContent);
    console.log(`Linked icons in ${path.basename(p)}`);
  }
}
console.log(`Linked ${linked} missing icons.`);
