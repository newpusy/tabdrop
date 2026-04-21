function formatReaction(sessionId, emoji) {
  return `${sessionId}: ${emoji}`;
}

function formatReactionList(reactions) {
  const entries = Object.entries(reactions);
  if (entries.length === 0) return 'No reactions set.';
  return entries.map(([id, emoji]) => `  ${emoji}  ${id}`).join('\n');
}

function formatReactionSet(sessionId, emoji) {
  return `Reaction ${emoji} set for session "${sessionId}".`;
}

function formatReactionRemoved(sessionId) {
  return `Reaction removed from session "${sessionId}".`;
}

function formatReactionNotFound(sessionId) {
  return `No reaction found for session "${sessionId}".`;
}

function formatInvalidReaction(emoji, valid) {
  return `Invalid reaction "${emoji}". Valid reactions: ${valid.join(' ')}`;
}

function formatFilteredReactions(emoji, ids) {
  if (ids.length === 0) return `No sessions reacted with ${emoji}.`;
  return `Sessions reacted with ${emoji}:\n${ids.map(id => `  ${id}`).join('\n')}`;
}

module.exports = {
  formatReaction,
  formatReactionList,
  formatReactionSet,
  formatReactionRemoved,
  formatReactionNotFound,
  formatInvalidReaction,
  formatFilteredReactions
};
