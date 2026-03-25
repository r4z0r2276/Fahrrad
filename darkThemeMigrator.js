import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, 'src');

async function processDir(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await processDir(fullPath);
    } else if (entry.isFile() && fullPath.endsWith('.svelte')) {
      let content = await fs.readFile(fullPath, 'utf8');
      let original = content;

      // Replace hardcoded light theme backgrounds with CSS variables
      content = content.replace(/background:\s*white;/g, 'background: var(--color-bg-card);');
      content = content.replace(/background:\s*#f8fafc;/g, 'background: var(--color-bg-alt);');
      content = content.replace(/background:\s*#fefce8;/g, 'background: rgba(234, 179, 8, 0.1);'); // yellow alert
      content = content.replace(/background:\s*#fef2f2;/g, 'background: rgba(220, 38, 38, 0.1);'); // red alert
      content = content.replace(/background:\s*#dbeafe;/g, 'background: rgba(59, 130, 246, 0.1);'); // blue alert
      content = content.replace(/background:\s*#d1fae5;/g, 'background: rgba(16, 185, 129, 0.1);'); // green icon bg
      content = content.replace(/background:\s*rgba\(255\,\s*255\,\s*255\,\s*0\.98\)/g, 'background: rgba(31, 41, 55, 0.98);'); // mobile menu glass
      
      // Update common hardcoded borders
      content = content.replace(/border:\s*1px solid #bfdbfe;/g, 'border: 1px solid rgba(59, 130, 246, 0.3);');
      content = content.replace(/border:\s*1px solid #fef08a;/g, 'border: 1px solid rgba(234, 179, 8, 0.3);');
      content = content.replace(/border-[a-z]+:\s*1px solid #e2e8f0;/g, 'border: 1px solid var(--border-color);');
      
      // Update text colors mapping light theme to dark theme readability
      content = content.replace(/color:\s*#1e3a8a;/g, 'color: #93c5fd;'); // dark blue text to light blue text
      content = content.replace(/color:\s*#854d0e;/g, 'color: #fef08a;'); // dark yellow text to light yellow text
      content = content.replace(/color:\s*#a16207;/g, 'color: #fde047;');
      content = content.replace(/color:\s*#334155;/g, 'color: #cbd5e1;'); // dark gray text
      content = content.replace(/color:\s*#64748b;/g, 'color: var(--color-text-muted);');

      if (content !== original) {
        await fs.writeFile(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(dir).then(() => console.log('Done')).catch(console.error);
