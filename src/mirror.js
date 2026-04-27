const fs = require('fs');
const path = require('path');

const MIRROR_DIR = path.join(process.env.HOME || '.', '.tabdrop', 'mirrors');

function ensureMirrorDir() {
  if (!fs.existsSync(MIRROR_DIR)) fs.mkdirSync(MIRROR_DIR, { recursive: true });
}

function mirrorPath(name) {
  return path.join(MIRROR_DIR, `${name}.json`);
}

function loadMirrors() {
  ensureMirrorDir();
  const files = fs.readdirSync(MIRROR_DIR).filter(f => f.endsWith('.json'));
  const mirrors = {};
  for (const file of files) {
    const name = file.replace('.json', '');
    try {
      mirrors[name] = JSON.parse(fs.readFileSync(path.join(MIRROR_DIR, file), 'utf8'));
    } catch {}
  }
  return mirrors;
}

function saveMirror(name, entry) {
  ensureMirrorDir();
  fs.writeFileSync(mirrorPath(name), JSON.stringify(entry, null, 2));
}

function createMirror(name, sessionA, sessionB) {
  const entry = {
    name,
    createdAt: new Date().toISOString(),
    sessionA,
    sessionB,
  };
  saveMirror(name, entry);
  return entry;
}

function getMirror(name) {
  const p = mirrorPath(name);
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
}

function removeMirror(name) {
  const p = mirrorPath(name);
  if (!fs.existsSync(p)) return false;
  fs.unlinkSync(p);
  return true;
}

function listMirrors() {
  return Object.values(loadMirrors());
}

function syncMirror(mirror) {
  const { sessionA, sessionB } = mirror;
  const urlsA = new Set((sessionA.windows || []).flatMap(w => (w.tabs || []).map(t => t.url)));
  const urlsB = new Set((sessionB.windows || []).flatMap(w => (w.tabs || []).map(t => t.url)));
  const onlyInA = [...urlsA].filter(u => !urlsB.has(u));
  const onlyInB = [...urlsB].filter(u => !urlsA.has(u));
  const shared = [...urlsA].filter(u => urlsB.has(u));
  return { onlyInA, onlyInB, shared };
}

module.exports = { ensureMirrorDir, mirrorPath, loadMirrors, saveMirror, createMirror, getMirror, removeMirror, listMirrors, syncMirror };
