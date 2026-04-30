function formatPulseEntry(entry) {
  const time = new Date(entry.timestamp).toLocaleString();
  const meta = Object.keys(entry.meta).length
    ? ' ' + Object.entries(entry.meta).map(([k, v]) => `${k}=${v}`).join(' ')
    : '';
  return `[${time}] ${entry.action} (session: ${entry.sessionId})${meta}`;
}

function formatPulseList(entries) {
  if (!entries.length) return 'No pulse entries found.';
  return entries.map(formatPulseEntry).join('\n');
}

function formatPulseRecorded(entry) {
  return `Pulse recorded: ${entry.action} for session "${entry.sessionId}" at ${entry.timestamp}`;
}

function formatPulseCleared(sessionId) {
  return sessionId
    ? `Pulse cleared for session "${sessionId}".`
    : 'All pulse entries cleared.';
}

function formatPulseSummary(summary) {
  if (summary.total === 0) return 'No pulse activity recorded.';
  const lines = [`Total events: ${summary.total}`];
  for (const [action, count] of Object.entries(summary.counts)) {
    lines.push(`  ${action}: ${count}`);
  }
  if (summary.latest) {
    lines.push(`Latest: ${formatPulseEntry(summary.latest)}`);
  }
  return lines.join('\n');
}

module.exports = { formatPulseEntry, formatPulseList, formatPulseRecorded, formatPulseCleared, formatPulseSummary };
