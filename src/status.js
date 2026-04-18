const { loadHistory } = require('./history');
const { loadPins } = require('./pin');
const { loadReminders } = require('./remind');
const { describeSession } = require('./session');

function getDueReminders(reminders) {
  const now = Date.now();
  return reminders.filter(r => r.dueAt && r.dueAt <= now);
}

function buildStatus(opts = {}) {
  const history = loadHistory();
  const pins = loadPins();
  const reminders = loadReminders();
  const due = getDueReminders(reminders);

  const recent = history.slice(0, 3);

  return {
    totalSessions: history.length,
    pinnedCount: pins.length,
    reminderCount: reminders.length,
    dueCount: due.length,
    recentSessions: recent,
    dueReminders: due,
  };
}

function describeStatus(status) {
  const lines = [];
  lines.push(`Sessions in history : ${status.totalSessions}`);
  lines.push(`Pinned sessions     : ${status.pinnedCount}`);
  lines.push(`Reminders set       : ${status.reminderCount}`);
  if (status.dueCount > 0) {
    lines.push(`Due reminders       : ${status.dueCount} (!)`);
    status.dueReminders.forEach(r => {
      lines.push(`  - [${r.sessionId}] ${r.note || '(no note)'}`);
    });
  }
  if (status.recentSessions.length > 0) {
    lines.push('Recent sessions:');
    status.recentSessions.forEach(s => {
      lines.push(`  - ${s.id || s.name || 'unnamed'} (${s.savedAt || ''})`);
    });
  }
  return lines.join('\n');
}

module.exports = { buildStatus, describeStatus, getDueReminders };
