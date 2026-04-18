function formatReminder(r) {
  const due = new Date(r.dueDate).toLocaleString();
  const status = r.done ? '✓' : '○';
  return `[${status}] #${r.id} — ${r.message} (due: ${due}, session: ${r.sessionId})`;
}

function formatReminderList(reminders) {
  if (!reminders.length) return 'No reminders set.';
  return reminders.map(formatReminder).join('\n');
}

function formatReminderAdded(r) {
  return `Reminder set: "${r.message}" due ${new Date(r.dueDate).toLocaleString()}`;
}

function formatReminderRemoved(id) {
  return `Reminder #${id} removed.`;
}

function formatDueReminders(reminders) {
  if (!reminders.length) return 'No reminders due.';
  return ['Due reminders:', ...reminders.map(formatReminder)].join('\n');
}

module.exports = { formatReminder, formatReminderList, formatReminderAdded, formatReminderRemoved, formatDueReminders };
