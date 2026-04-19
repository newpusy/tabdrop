// highlight.js — mark tabs/sessions with a highlight color

const fs = require('fs');
const path = require('path');

const HIGHLIGHTS_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'highlights.json');

const VALID_COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];

function ensureHighlightsFile() {
  const dir = path.dirname(HIGHLIGHTS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(HIGHLIGHTS_FILE)) fs.writeFileSync(HIGHLIGHTS_FILE, '{}');
}

function loadHighlights() {
  ensureHighlightsFile();
  return JSON.parse(fs.readFileSync(HIGHLIGHTS_FILE, 'utf8'));
}

function saveHighlights(highlights) {
  ensureHighlightsFile();
  fs.writeFileSync(HIGHLIGHTS_FILE, JSON.stringify(highlights, null, 2));
}

function isValidColor(color) {
  return VALID_COLORS.includes(color);
}

function setHighlight(sessionId, color) {
  if (!isValidColor(color)) return null;
  const highlights = loadHighlights();
  highlights[sessionId] = color;
  saveHighlights(highlights);
  return color;
}

function getHighlight(sessionId) {
  const highlights = loadHighlights();
  return highlights[sessionId] || null;
}

function removeHighlight(sessionId) {
  const highlights = loadHighlights();
  if (!highlights[sessionId]) return false;
  delete highlights[sessionId];
  saveHighlights(highlights);
  return true;
}

function listHighlights() {
  return loadHighlights();
}

function filterByHighlight(sessions, color) {
  const highlights = loadHighlights();
  return sessions.filter(s => highlights[s.id] === color);
}

module.exports = { ensureHighlightsFile, loadHighlights, saveHighlights, isValidColor, setHighlight, getHighlight, removeHighlight, listHighlights, filterByHighlight, VALID_COLORS };
