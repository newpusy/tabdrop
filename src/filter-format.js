function formatFilterResult(sessions) {
  if (!sessions.length) return 'No sessions match the filter.';
  const lines = sessions.map(s => {
    const tabCount = s.windows.reduce((a, w) => a + w.tabs.length, 0);
    return `  ${s.name || s.id} — ${s.windows.length} window(s), ${tabCount} tab(s)`;
  });
  return `Matched ${sessions.length} session(s):\n${lines.join('\n')}`;
}

function formatFilterEmpty() {
  return 'No sessions match the given filter criteria.';
}

function formatFilterSummary(before, after) {
  return `Filter applied: ${before} session(s) → ${after} session(s)`;
}

module.exports = { formatFilterResult, formatFilterEmpty, formatFilterSummary };
