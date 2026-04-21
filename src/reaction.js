const fs = require('fs');
const path = require('path');

const REACTIONS = ['👍', '👎', '❤️', '🔥', '⭐', '🎯', '💡', '🗑️'];
const REACTIONS_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'reactions.json');

function ensureReactionsFile() {
  const dir = path.dirname(REACTIONS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(REACTIONS_FILE)) fs.writeFileSync(REACTIONS_FILE, '{}');
}

function loadReactions() {
  ensureReactionsFile();
  return JSON.parse(fs.readFileSync(REACTIONS_FILE, 'utf8'));
}

function saveReactions(reactions) {
  ensureReactionsFile();
  fs.writeFileSync(REACTIONS_FILE, JSON.stringify(reactions, null, 2));
}

function isValidReaction(emoji) {
  return REACTIONS.includes(emoji);
}

function setReaction(sessionId, emoji) {
  if (!isValidReaction(emoji)) return null;
  const reactions = loadReactions();
  reactions[sessionId] = emoji;
  saveReactions(reactions);
  return emoji;
}

function getReaction(sessionId) {
  const reactions = loadReactions();
  return reactions[sessionId] || null;
}

function removeReaction(sessionId) {
  const reactions = loadReactions();
  if (!reactions[sessionId]) return false;
  delete reactions[sessionId];
  saveReactions(reactions);
  return true;
}

function listReactions() {
  return loadReactions();
}

function filterByReaction(emoji) {
  const reactions = loadReactions();
  return Object.entries(reactions)
    .filter(([, e]) => e === emoji)
    .map(([id]) => id);
}

module.exports = {
  ensureReactionsFile,
  loadReactions,
  saveReactions,
  isValidReaction,
  setReaction,
  getReaction,
  removeReaction,
  listReactions,
  filterByReaction,
  REACTIONS
};
