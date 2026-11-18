'use strict';

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const markdownFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) markdownFiles.push(fullPath);
  }
}

walk(root);

const failures = [];
const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;

for (const file of markdownFiles) {
  const source = fs.readFileSync(file, 'utf8');
  let match;

  while ((match = linkPattern.exec(source)) !== null) {
    const rawTarget = match[1].trim();
    if (!rawTarget || rawTarget.startsWith('#') || /^(https?:|mailto:|tel:)/i.test(rawTarget)) continue;

    const cleanTarget = decodeURIComponent(rawTarget.split('#')[0].split('?')[0]);
    if (!cleanTarget) continue;

    const resolved = path.resolve(path.dirname(file), cleanTarget);
    if (!resolved.startsWith(root + path.sep) && resolved !== root) {
      failures.push(path.relative(root, file) + ': link escapes repository: ' + rawTarget);
      continue;
    }

    if (!fs.existsSync(resolved)) {
      failures.push(path.relative(root, file) + ': missing local target: ' + rawTarget);
    }
  }
}

if (failures.length > 0) {
  process.stderr.write('Broken local Markdown links:\n' + failures.map((item) => '- ' + item).join('\n') + '\n');
  process.exitCode = 1;
} else {
  process.stdout.write('Checked ' + markdownFiles.length + ' Markdown files; all local targets exist.\n');
}
