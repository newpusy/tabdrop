const { buildStatus, describeStatus, getDueReminders } = require('../src/status');

jest.mock('../src/history', () => ({
  loadHistory: () => [
    { id: 'abc', name: 'work', savedAt: '2024-01-01' },
    { id: 'def', name: 'home', savedAt: '2024-01-02' },
  ],
}));

jest.mock('../src/pin', () => ( => [{ sessionId: 'abc' }],
}));

jest.mock('../src/remind', () => ({
  loadReminders: () => [
    { sessionId: 'abc', note: 'check this', dueAt: Date.now() - 1000 },
    { sessionId: 'def', note: 'later', dueAt: Date.now() + 99999 },
  ],
}));

test('buildStatus returns correct counts', () => {
  const s = buildStatus();
  expect(s.totalSessions).toBe(2);
  expect(s.pinnedCount).toBe(1);
  expect(s.reminderCount).toBe(2);
  expect(s.dueCount).toBe(1);
});

test('buildStatus recentSessions capped at 3', () => {
  const s = buildStatus();
  expect(s.recentSessions.length).toBeLessThanOrEqual(3);
});

test('getDueReminders filters correctly', () => {
  const now = Date.now();
  const reminders = [
    { sessionId: 'a', dueAt: now - 500 },
    { sessionId: 'b', dueAt: now + 5000 },
  ];
  const due = getDueReminders(reminders);
  expect(due).toHaveLength(1);
  expect(due[0].sessionId).toBe('a');
});

test('describeStatus includes due warning', () => {
  const s = buildStatus();
  const out = describeStatus(s);
  expect(out).toContain('Due reminders');
  expect(out).toContain('check this');
});

test('describeStatus shows recent sessions', () => {
  const s = buildStatus();
  const out = describeStatus(s);
  expect(out).toContain('work');
});
