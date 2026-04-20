const fs = require('fs');
const path = require('path');

const BADGES_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'badges.json');

function ensureBadgesFile() {
  const dir = path.dirname(BADGES_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(BADGES_FILE)) fs.writeFileSync(BADGES_FILE, '{}');
}

function loadBadges() {
  ensureBadgesFile();
  return JSON.parse(fs.readFileSync(BADGES_FILE, 'utf8'));
}

function saveBadges(badges) {
  ensureBadgesFile();
  fs.writeFileSync(BADGES_FILE, JSON.stringify(badges, null, 2));
}

const VALID_BADGES = ['new', 'updated', 'starred', 'reviewed', 'draft', 'done'];

function isValidBadge(badge) {
  return VALID_BADGES.includes(badge);
}

function setBadge(sessionId, badge) {
  if (!isValidBadge(badge)) return false;
  const badges = loadBadges();
  badges[sessionId] = badge;
  saveBadges(badges);
  return true;
}

function getBadge(sessionId) {
  const badges = loadBadges();
  return badges[sessionId] || null;
}

function removeBadge(sessionId) {
  const badges = loadBadges();
  if (!badges[sessionId]) return false;
  delete badges[sessionId];
  saveBadges(badges);
  return true;
}

function listBadges() {
  return loadBadges();
}

function filterByBadge(badge) {
  const badges = loadBadges();
  return Object.entries(badges)
    .filter(([, b]) => b === badge)
    .map(([id]) => id);
}

module.exports = {
  ensureBadgesFile,
  loadBadges,
  saveBadges,
  isValidBadge,
  setBadge,
  getBadge,
  removeBadge,
  listBadges,
  filterByBadge,
  VALID_BADGES,
};
