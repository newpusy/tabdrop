const fs = require('fs');
const path = require('path');

const EXPIRE_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'expiry.json');

function ensureExpireFile() {
  const dir = path.dirname(EXPIRE_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(EXPIRE_FILE)) fs.writeFileSync(EXPIRE_FILE, '{}');
}

function loadExpiry() {
  ensureExpireFile();
  return JSON.parse(fs.readFileSync(EXPIRE_FILE, 'utf8'));
}

function saveExpiry(data) {
  ensureExpireFile();
  fs.writeFileSync(EXPIRE_FILE, JSON.stringify(data, null, 2));
}

function setExpiry(sessionId, days) {
  const data = loadExpiry();
  const expiresAt = Date.now() + days * 86400000;
  data[sessionId] = { expiresAt, days };
  saveExpiry(data);
  return data[sessionId];
}

function getExpiry(sessionId) {
  const data = loadExpiry();
  return data[sessionId] || null;
}

function removeExpiry(sessionId) {
  const data = loadExpiry();
  const had = !!data[sessionId];
  delete data[sessionId];
  saveExpiry(data);
  return had;
}

function listExpired() {
  const data = loadExpiry();
  const now = Date.now();
  return Object.entries(data)
    .filter(([, v]) => v.expiresAt <= now)
    .map(([id, v]) => ({ id, ...v }));
}

function listExpiry() {
  const data = loadExpiry();
  return Object.entries(data).map(([id, v]) => ({ id, ...v }));
}

module.exports = { ensureExpireFile, loadExpiry, saveExpiry, setExpiry, getExpiry, removeExpiry, listExpired, listExpiry };
