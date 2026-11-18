'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { gzipSync } = require('node:zlib');

const root = path.resolve(__dirname, '..');
const outputDirectory = path.join(root, 'dist');
const outputPath = path.join(outputDirectory, 'ChatJS.tar.gz');

const includedFiles = [
  'package.json',
  'ChatJS.md',
  'README.md',
  'LICENSE',
  'src/index.cjs',
  'src/index.mjs',
  'types/index.d.ts'
];

function writeOctal(header, offset, length, value) {
  const field = value.toString(8).padStart(length - 1, '0') + '\0';
  header.write(field, offset, length, 'ascii');
}

function createTarHeader(name, size, type = '0', mode = 0o644) {
  const header = Buffer.alloc(512, 0);
  const nameBytes = Buffer.from(name, 'utf8');

  if (nameBytes.length > 100) {
    throw new Error('Archive path is too long: ' + name);
  }

  nameBytes.copy(header, 0);
  writeOctal(header, 100, 8, mode);
  writeOctal(header, 108, 8, 0);
  writeOctal(header, 116, 8, 0);
  writeOctal(header, 124, 12, size);
  writeOctal(header, 136, 12, 0);
  header.fill(0x20, 148, 156);
  header[156] = type.charCodeAt(0);
  header.write('ustar\0', 257, 6, 'ascii');
  header.write('00', 263, 2, 'ascii');
  header.write('root', 265, 4, 'ascii');
  header.write('root', 297, 4, 'ascii');

  let checksum = 0;
  for (const byte of header) {
    checksum += byte;
  }

  header.write(checksum.toString(8).padStart(6, '0') + '\0 ', 148, 8, 'ascii');
  return header;
}

function createArchive() {
  const chunks = [];
  chunks.push(createTarHeader('ChatJS/', 0, '5', 0o755));

  for (const relativePath of includedFiles) {
    const absolutePath = path.join(root, relativePath);

    if (!fs.statSync(absolutePath).isFile()) {
      throw new Error('Expected a regular file: ' + relativePath);
    }

    const contents = fs.readFileSync(absolutePath);
    chunks.push(createTarHeader('ChatJS/' + relativePath, contents.length));
    chunks.push(contents);

    const padding = (512 - (contents.length % 512)) % 512;
    if (padding > 0) {
      chunks.push(Buffer.alloc(padding));
    }
  }

  chunks.push(Buffer.alloc(1024));
  const archive = gzipSync(Buffer.concat(chunks), { level: 9 });

  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(outputPath, archive);

  process.stdout.write('Created dist/ChatJS.tar.gz with ' + includedFiles.length + ' module files.\n');
}

try {
  createArchive();
} catch (error) {
  process.stderr.write('Unable to build the ChatJS module archive: ' + error.message + '\n');
  process.exitCode = 1;
}
