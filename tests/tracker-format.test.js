const {
  formatTracker,
  formatTrackerList,
  formatTrackerAdded,
  formatTrackerRemoved,
  formatTrackerNotFound,
  formatTrackerEmpty
} = require('../src/tracker-format');

const sample = {
  sessionId: 'abc123',
  openCount: 5,
  firstSeen: '2024-01-01T00:00:00.000Z',
  lastSeen: '2024-06-15T00:00:00.000Z'
};

test('formatTracker includes sessionId and openCount', () => {
  const out = formatTracker(sample);
  expect(out).toContain('abc123');
  expect(out).toContain('5');
});

test('formatTracker includes dates', () => {
  const out = formatTracker(sample);
  expect(out).toContain('2024-01-01');
  expect(out).toContain('2024-06-15');
});

test('formatTrackerList formats multiple entries', () => {
  const out = formatTrackerList([sample, { ...sample, sessionId: 'xyz', openCount: 2 }]);
  expect(out).toContain('abc123');
  expect(out).toContain('xyz');
});

test('formatTrackerList returns empty message for empty array', () => {
  const out = formatTrackerList([]);
  expect(out).toMatch(/no sessions/i);
});

test('formatTrackerAdded mentions sessionId', () => {
  const out = formatTrackerAdded(sample);
  expect(out).toContain('abc123');
});

test('formatTrackerRemoved mentions sessionId', () => {
  expect(formatTrackerRemoved('abc123')).toContain('abc123');
});

test('formatTrackerNotFound mentions sessionId', () => {
  expect(formatTrackerNotFound('ghost')).toContain('ghost');
});

test('formatTrackerEmpty returns a message', () => {
  expect(formatTrackerEmpty()).toBeTruthy();
});
