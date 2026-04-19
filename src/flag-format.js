function formatFlag(sessionId, flags) {
  if (!flags || flags.length === 0) return `No flags for session "${sessionId}".`;
  return `Flags for "${sessionId}": ${flags.map(f => `[${f}]`).join(' ')}`;
}

function formatFlagList(all) {
  const keys = Object.keys(all);
  if (keys.length === 0) return 'No flagged sessions.';
  return keys.map(id => `  ${id}: ${all[id].map(f => `[${f}]`).join(' ')}`).join('\n');
}

function formatFlagSet(sessionId, flag) {
  return `Flag [${flag}] set on session "${sessionId}".`;
}

function formatFlagRemoved(sessionId, flag) {
  return `Flag [${flag}] removed from session "${sessionId}".`;
}

function formatFlagNotFound(sessionId, flag) {
  return `Flag [${flag}] not found on session "${sessionId}".`;
}

module.exports = { formatFlag, formatFlagList, formatFlagSet, formatFlagRemoved, formatFlagNotFound };
