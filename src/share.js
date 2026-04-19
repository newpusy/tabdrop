const fs = require('fs');
const path = require('path');
const os = require('os');

const SHARE_DIR = path.join(os.homedir(), '.tabdrop', 'shares');

function ensureShareDir() {
  if (!fs.existsSync(SHARE_DIR)) fs.mkdirSync(SHARE_DIR, { recursive: true });
}

function loadShares() {
  ensureShareDir();
  const file = path.join(SHARE_DIR, 'shares.json');
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function saveShares(shares) {
  ensureShareDir();
  const file = path.join(SHARE_DIR, 'shares.json');
  fs.writeFileSync(file, JSON.stringify(shares, null, 2));
}

function createShare(name, session, opts = {}) {
  const shares = loadShares();
  const id = Date.now().toString(36);
  shares[id] = {
    id,
    name,
    session,
    createdAt: new Date().toISOString(),
    expiresAt: opts.ttl ? new Date(Date.now() + opts.ttl).toISOString() : null,
    note: opts.note || null
  };
  saveShares(shares);
  return shares[id];
}

function getShare(id) {
  const shares = loadShares();
  return shares[id] || null;
}

function removeShare(id) {
  const shares = loadShares();
  if (!shares[id]) return false;
  delete shares[id];
  saveShares(shares);
  return true;
}

function listShares() {
  return Object.values(loadShares());
}

function isExpired(share) {
  if (!share.expiresAt) return false;
  return new Date(share.expiresAt) < new Date();
}

module.exports = { ensureShareDir, loadShares, saveShares, createShare, getShare, removeShare, listShares, isExpired };
