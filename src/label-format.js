function formatLabel(sessionId, label) {
  return `[label] ${sessionId}: "${label}"`;
}

function formatLabelList(labels) {
  const entries = Object.entries(labels);
  if (entries.length === 0) return 'No labels set.';
  return entries.map(([id, label]) => `  ${id}: "${label}"`).join('\n');
}

function formatLabelSet(sessionId, label) {
  return `Label set for ${sessionId}: "${label}"`;
}

function formatLabelRemoved(sessionId) {
  return `Label removed from ${sessionId}.`;
}

function formatLabelNotFound(sessionId) {
  return `No label found for ${sessionId}.`;
}

module.exports = { formatLabel, formatLabelList, formatLabelSet, formatLabelRemoved, formatLabelNotFound };
