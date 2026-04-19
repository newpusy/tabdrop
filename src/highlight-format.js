// highlight-format.js — format output for highlight commands

const COLOR_SYMBOLS = {
  red: '🔴',
  orange: '🟠',
  yellow: '🟡',
  green: '🟢',
  blue: '🔵',
  purple: '🟣',
  pink: '🩷'
};

function formatHighlight(sessionId, color) {
  const sym = COLOR_SYMBOLS[color] || '⚪';
  return `${sym} ${sessionId} — ${color}`;
}

function formatHighlightList(highlights) {
  const entries = Object.entries(highlights);
  if (!entries.length) return 'No highlights set.';
  return entries.map(([id, color]) => formatHighlight(id, color)).join('\n');
}

function formatHighlightSet(sessionId, color) {
  const sym = COLOR_SYMBOLS[color] || '⚪';
  return `${sym} Highlight set: ${sessionId} → ${color}`;
}

function formatHighlightRemoved(sessionId) {
  return `Highlight removed from: ${sessionId}`;
}

function formatHighlightNotFound(sessionId) {
  return `No highlight found for: ${sessionId}`;
}

function formatInvalidColor(color, valid) {
  return `Invalid color "${color}". Valid: ${valid.join(', ')}`;
}

module.exports = { formatHighlight, formatHighlightList, formatHighlightSet, formatHighlightRemoved, formatHighlightNotFound, formatInvalidColor, COLOR_SYMBOLS };
