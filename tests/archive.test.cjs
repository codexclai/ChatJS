'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { gunzipSync } = require('node:zlib');

const root = path.resolve(__dirname, '..');
const archivePath = path.join(root, 'dist', 'ChatJS.tar.gz');

const expectedFiles = [
  'ChatJS/package.json',
  'ChatJS/ChatJS.md',
  'ChatJS/README.md',
  'ChatJS/LICENSE',
  'ChatJS/src/index.cjs',
  'ChatJS/src/index.mjs',
  'ChatJS/src/sse.cjs',
  'ChatJS/types/index.d.ts'
];

test('ChatJS distribution archive contains only the documented module files', () => {
  execFileSync(process.execPath, [
    path.join(root, 'scripts', 'build-module-archive.cjs')
  ]);

  const archive = gunzipSync(fs.readFileSync(archivePath));
  const entries = new Map();
  let offset = 0;

  while (offset + 512 <= archive.length) {
    const header = archive.subarray(offset, offset + 512);

    if (header.every((byte) => byte === 0)) {
      break;
    }

    const name = header.subarray(0, 100).toString('utf8').replace(/\0.*$/, '');
    const sizeText = header.subarray(124, 136).toString('ascii').replace(/\0.*$/, '').trim();
    const size = Number.parseInt(sizeText, 8);
    const type = header[156];

    assert.ok(Number.isSafeInteger(size) && size >= 0, 'archive entry size is valid');

    const contentStart = offset + 512;

    if (type === '5'.charCodeAt(0)) {
      assert.equal(size, 0, 'directory entries contain no file data');
      offset = contentStart;
      continue;
    }

    assert.ok(!entries.has(name), 'archive has no duplicate file paths');

    const contentEnd = contentStart + size;
    entries.set(name, archive.subarray(contentStart, contentEnd));
    offset = contentStart + Math.ceil(size / 512) * 512;
  }

  assert.deepEqual([...entries.keys()].sort(), [...expectedFiles].sort());

  for (const archivePathName of expectedFiles) {
    const relativePath = archivePathName.slice('ChatJS/'.length);
    const source = fs.readFileSync(path.join(root, relativePath));

    assert.deepEqual(
      entries.get(archivePathName),
      source,
      archivePathName + ' matches its repository source'
    );
  }
});