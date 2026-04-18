const fs = require('fs');
const path = require('path');

const RATINGS_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'ratings.json');

function ensureRatingsFile() {
  const dir = path.dirname(RATINGS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(RATINGS_FILE)) fs.writeFileSync(RATINGS_FILE, '{}');
}

function loadRatings() {
  ensureRatingsFile();
  return JSON.parse(fs.readFileSync(RATINGS_FILE, 'utf8'));
}

function saveRatings(ratings) {
  ensureRatingsFile();
  fs.writeFileSync(RATINGS_FILE, JSON.stringify(ratings, null, 2));
}

function setRating(sessionId, score) {
  if (score < 1 || score > 5) throw new Error('Rating must be between 1 and 5');
  const ratings = loadRatings();
  ratings[sessionId] = { score, updatedAt: new Date().toISOString() };
  saveRatings(ratings);
  return ratings[sessionId];
}

function getRating(sessionId) {
  const ratings = loadRatings();
  return ratings[sessionId] || null;
}

function removeRating(sessionId) {
  const ratings = loadRatings();
  if (!ratings[sessionId]) return false;
  delete ratings[sessionId];
  saveRatings(ratings);
  return true;
}

function listRatings() {
  return loadRatings();
}

module.exports = { ensureRatingsFile, loadRatings, saveRatings, setRating, getRating, removeRating, listRatings };
