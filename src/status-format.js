function formatStatusHeader() {
  return '=== tabdrop status ===';
}

function formatStatusSummary(status) {
  const parts = [
    `${status.totalSessions} session(s)`,
    `${status.pinnedCount} pinned`,
    `${status.reminderCount} reminder(s)`,
  ];
  if (status.dueCount > 0) {
    parts.push(`${status.dueCount} DUE`);
  }
  return parts.join(' | ');
}

function formatStatusDue(dueReminders) {
  if (!dueReminders.length) return 'No due reminders.';
  return dueReminders
    .map(r => `[DUE] ${r.sessionId}: ${r.note || '(no note)'}`)
    .join('\n');
}

function formatStatusRecent(recentSessions) {
  if (!recentSessions.length) return 'No recent sessions.';
  return recentSessions
    .map((s, i) => `${i + 1}. ${s.id || s.name || 'unnamed'}`)
    .join('\n');
}

module.exports = { formatStatusHeader, formatStatusSummary, formatStatusDue, formatStatusRecent };
