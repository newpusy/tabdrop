function formatMerged(session) {
  return `Merged session: ${session.title || 'Untitled'} (${session.tabs.length} tabs)`;
}

function formatMergeConflict(url) {
  return `Skipped duplicate: ${url}`;
}

function formatMergeSummary(added, skipped) {
  const parts = [`Added ${added} tab${added !== 1 ? 's' : ''}`];
  if (skipped > 0) parts.push(`skipped ${skipped} duplicate${skipped !== 1 ? 's' : ''}`);
  return parts.join(', ');
}

function formatMergeList(sessions) {
  if (!sessions.length) return 'No sessions to merge.';
  return sessions.map((s, i) => `  ${i + 1}. ${s.title || 'Untitled'} (${s.tabs.length} tabs)`).join('\n');
}

function formatMergeEmpty() {
  return 'Nothing to merge — all sessions are empty.';
}

module.exports = {
  formatMerged,
  formatMergeConflict,
  formatMergeSummary,
  formatMergeList,
  formatMergeEmpty
};
