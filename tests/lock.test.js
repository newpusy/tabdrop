const fs = require('fs');
const path = require('path');
const os = require('os');

let tmpDir;
beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-lock-'));
  process.env.HOME = tmpDir;
  jest.resetModules();
});

function getLock() {
  return require('../src/lock');
}

test('lockSession stores lock entry', () => {
  const { lockSession, isLocked } = getLock();
  lockSession('work', 'important');
  expect(isLocked('work')).toBe(true);
});

test('unlockSession removes lock', () => {
  const { lockSession, unlockSession, isLocked } = getLock();
  lockSession('work');
  unlockSession('work');
  expect(isLocked('work')).toBe(false);
});

test('getLock returns lock details', () => {
  const { lockSession, getLock } = getLock();
  lockSession('notes', 'keep safe');
  const lock = getLock('notes');
  expect(lock.reason).toBe('keep safe');
  expect(lock.locked).toBe(true);
  expect(lock.lockedAt).toBeDefined();
});

test('getLock returns null for unknown session', () => {
  const { getLock } = getLock();
  expect(getLock('nope')).toBeNull();
});

test('unlockSession returns null if not locked', () => {
  const { unlockSession } = getLock();
  expect(unlockSession('ghost')).toBeNull();
});

test('listLocks returns all locked sessions', () => {
  const { lockSession, listLocks } = getLock();
  lockSession('a');
  lockSession('b');
  const locks = listLocks();
  expect(Object.keys(locks)).toContain('a');
  expect(Object.keys(locks)).toContain('b');
});
