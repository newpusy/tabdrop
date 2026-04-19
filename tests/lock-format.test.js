const { formatLock, formatLockList, formatLocked, formatUnlocked, formatAlreadyLocked, formatNotLocked } = require('../src/lock-format');

const sampleLock = { locked: true, reason: 'do not touch', lockedAt: '2024-01-01T00:00:00.000Z' };

test('formatLock includes name and reason', () => {
  const out = formatLock('work', sampleLock);
  expect(out).toContain('work');
  expect(out).toContain('do not touch');
  expect(out).toContain('🔒');
});

test('formatLock without reason omits dash', () => {
  const out = formatLock('work', { ...sampleLock, reason: '' });
  expect(out).not.toContain('—');
});

test('formatLockList with entries', () => {
  const out = formatLockList({ work: sampleLock });
  expect(out).toContain('work');
});

test('formatLockList empty', () => {
  expect(formatLockList({})).toBe('No locked sessions.');
});

test('formatLocked message', () => {
  expect(formatLocked('work')).toContain('locked');
  expect(formatLocked('work')).toContain('work');
});

test('formatUnlocked message', () => {
  expect(formatUnlocked('work')).toContain('unlocked');
});

test('formatAlreadyLocked message', () => {
  expect(formatAlreadyLocked('work')).toContain('already locked');
});

test('formatNotLocked message', () => {
  expect(formatNotLocked('work')).toContain('not locked');
});
