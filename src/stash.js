const fs = require('fs');
const path = require('path');

const STASH_DIR = path.join(process.env.HOME || process.env.USERPROFILE, '.tabdrop', 'stash');

function ensureStashDir() {
  if (!fs.existsSync(STASH_DIR)) fs.mkdirSync(STASH_DIR, { recursive: true });
}

function stashPath(name) {
  return path.join(STASH_DIR, `${name}.json`);
}

function loadStashes() {
  ensureStashDir();
  const files = fs.readdirSync(STASH_DIR).filter(f => f.endsWith('.json'));
  return files.map(f => {
    const raw = fs.readFileSync(path.join(STASH_DIR, f), 'utf8');
    return JSON.parse(raw);
  });
}

function saveStash(name, session) {
  ensureStashDir();
  const entry = { name, session, stashedAt: new Date().toISOString() };
  fs.writeFileSync(stashPath(name), JSON.stringify(entry, null, 2));
  return entry;
}

function getStash(name) {
  const p = stashPath(name);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function removeStash(name) {
  const p = stashPath(name);
  if (!fs.existsSync(p)) return false;
  fs.unlinkSync(p);
  return true;
}

function listStashes() {
  return loadStashes().map(e => ({ name: e.name, stashedAt: e.stashedAt, tabCount: (e.session.windows || []).reduce((s, w) => s + (w.tabs || []).length, 0) }));
}

function popStash(name) {
  const entry = getStash(name);
  if (!entry) return null;
  removeStash(name);
  return entry.session;
}

module.exports = { ensureStashDir, saveStash, getStash, removeStash, listStashes, popStash, loadStashes };
