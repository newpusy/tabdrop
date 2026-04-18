const { formatStatusHeader, formatStatusSummary, formatStatusDue, formatStatusRecent } = require('../src/status-format');

const mockStatus = {
  totalSessions: 5,
  pinnedCount: 2,
  reminderCount: 3,
  dueCount: 1,
  dueReminders: [{ sessionId: 'abc', note: 'urgent' }],
  recentSessions: [{ id: 's1', name: 'work' }, { id: 's2', name: 'home' }],
};

test('formatStatusHeader returns header string', () => {
  expect(formatStatusHeader()).toBe('=== tabdrop status ===');
});

test('formatStatusSummary includes all counts', () => {
  const out = formatStatusSummary(mockStatus);
  expect(out).toContain('5 session(s)');
  expect(out).toContain('2 pinned');
  expect(out).toContain('3 reminder(s)');
  expect(out).toContain('1 DUE');
});

test('formatStatusSummary no DUE when dueCount is 0', () => {
  const out = formatStatusSummary({ ...mockStatus, dueCount: 0 });
  expect(out).not.toContain('DUE');
});

test('formatStatusDue lists due reminders', () => {
  const out = formatStatusDue(mockStatus.dueReminders);
  expect(out).toContain('[DUE] abc');
  expect(out).toContain('urgent');
});

test('formatStatusDue empty message', () => {
  expect(formatStatusDue([])).toBe('No due reminders.');
});

test('formatStatusRecent lists sessions', () => {
  const out = formatStatusRecent(mockStatus.recentSessions);
  expect(out).toContain('work');
  expect(out).toContain('home');
});

test('formatStatusRecent empty message', () => {
  expect(formatStatusRecent([])).toBe('No recent sessions.');
});
