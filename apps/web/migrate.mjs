import fs from 'fs';
import path from 'path';

const catalogPath = path.join(process.cwd(), 'src/lib/services.catalog.ts');
let content = fs.readFileSync(catalogPath, 'utf-8');

// Regex to find each item in SERVICE_CATALOG
const itemRegex = /{ type: "([^"]+)", category: "([^"]+)", label: "([^"]+)", description: "([^"]+)", defaultVariant: "([^"]+)", icon: ([^,]+), accentColor: "([^"]+)", variants: (\[.+?\]) }/g;

let newContent = content.replace(itemRegex, (match, type, category, label, description, defaultVariant, icon, accentColor, variants) => {
    
    let shape = "'rectangle'";
    if (category === 'database' || category === 'cache') shape = "'cylinder'";
    if (category === 'messaging') shape = "'hexagon'";
    if (category === 'ai') shape = "'hexagon'";
    if (category === 'infrastructure' && label.includes('AWS')) shape = "'cloud'";
    if (category === 'infrastructure' && label.includes('Cloud')) shape = "'cloud'";
    
    // Attempt to guess vendor
    let vendor = "''";
    if (label.includes('AWS')) vendor = "'Amazon Web Services'";
    if (label.includes('GCP') || label.includes('Google')) vendor = "'Google'";
    if (label.includes('Azure')) vendor = "'Microsoft'";
    if (label.includes('React') || label.includes('Next.js')) vendor = "'Meta'";
    
    let keywords = `["${type}", "${category}", "${label.toLowerCase()}"]`;
    
    return `{ 
    type: "${type}", 
    category: "${category}", 
    vendor: ${vendor},
    label: "${label}", 
    description: "${description}", 
    iconUrl: "/vendor-icons/${type}.svg",
    fallbackIcon: ${icon}, 
    accentColor: "${accentColor}", 
    shape: ${shape},
    keywords: ${keywords},
    tags: ["${category}"],
    defaultVariant: "${defaultVariant}", 
    variants: ${variants}
  }`;
});

// Rename Service to NodeDefinition and SERVICE_CATALOG to CORE_NODES
newContent = newContent.replace(/export interface Service \{[\s\S]+?\}/, '');
newContent = newContent.replace(/export const SERVICE_CATALOG: Service\[\] = \[/, 'import type { NodeDefinition } from "./registry/types";\n\nexport const CORE_NODES: NodeDefinition[] = [');

fs.writeFileSync(path.join(process.cwd(), 'src/lib/registry/packs/core-pack.ts'), newContent);
console.log('Migration complete');
