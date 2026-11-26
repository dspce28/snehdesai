import {mkdir, writeFile, readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
// Entries with a url are downloaded and checked. Entries without one are project files
// (the Mumbai scene layers) that live in the repo; they are only checked.
const assets = JSON.parse(await readFile(new URL('./assets.json', import.meta.url), 'utf8'));
const ok = d => d.length === a.bytes && createHash('sha256').update(d).digest('hex') === a.sha256;
let a;
for (a of assets) {
  if (!a.url) {
    const data = await readFile(a.file).catch(() => null);
    if (!data || !ok(data)) throw new Error('Project asset missing or changed: ' + a.file);
    console.log('Checked ' + a.file);
    continue;
  }
  const r = await fetch(a.url);
  if (!r.ok) throw new Error('Asset download failed: ' + a.url + ' (' + r.status + ')');
  const data = Buffer.from(await r.arrayBuffer());
  if (!ok(data)) throw new Error('Asset checksum mismatch: ' + a.url);
  await mkdir(path.dirname(a.file), {recursive: true});
  await writeFile(a.file, data);
  console.log('Downloaded ' + a.file);
}
