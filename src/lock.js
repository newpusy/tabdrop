const fs = require('fs');
const path = require('path');

const LOCKS_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'locks.json');

function ensureLocksFile() {
  const dir = path.dirname(LOCKS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(LOCKS_FILE)) fs.writeFileSync(LOCKS_FILE, '{}');
}

function loadLocks() {
  ensureLocksFile();
  return JSON.parse(fs.readFileSync(LOCKS_FILE, 'utf8'));
}

function saveLocks(locks) {
  ensureLocksFile();
  fs.writeFileSync(LOCKS_FILE, JSON.stringify(locks, null, 2));
}

function lockSession(name, reason = '') {
  const locks = loadLocks();
  locks[name] = { locked: true, reason, lockedAt: new Date().toISOString() };
  saveLocks(locks);
  return locks[name];
}

function unlockSession(name) {
  const locks = loadLocks();
  if (!locks[name]) return null;
  delete locks[name];
  saveLocks(locks);
  return true;
}

function isLocked(name) {
  const locks = loadLocks();
  return !!(locks[name] && locks[name].locked);
}

function getLock(name) {
  const locks = loadLocks();
  return locks[name] || null;
}

function listLocks() {
  return loadLocks();
}

module.exports = { ensureLocksFile, loadLocks, saveLocks, lockSession, unlockSession, isLocked, getLock, listLocks };
