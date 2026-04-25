const fs = require('fs');
const path = require('path');
const os = require('os');

let tmpDir;
beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-tracker-'));
  process.env.HOME = tmpDir;
});
afterEach(() => fs.rmSync(tmpDir, { recursive: true }));

function getTracker() {
  jest.resetModules();
  return require('../src/tracker');
}

test('trackSession creates a new entry', () => {
  const { trackSession, getTracker } = getTracker();
  trackSession('abc');
  const entry = getTracker('abc');
  expect(entry).not.toBeNull();
  expect(entry.sessionId).toBe('abc');
  expect(entry.openCount).toBe(1);
});

test('trackSession increments openCount', () => {
  const { trackSession, getTracker } = getTracker();
  trackSession('abc');
  trackSession('abc');
  const entry = getTracker('abc');
  expect(entry.openCount).toBe(2);
});

test('getTracker returns null for unknown session', () => {
  const { getTracker } = getTracker();
  expect(getTracker('nope')).toBeNull();
});

test('removeTracker deletes an entry', () => {
  const { trackSession, removeTracker, getTracker } = getTracker();
  trackSession('xyz');
  const result = removeTracker('xyz');
  expect(result).toBe(true);
  expect(getTracker('xyz')).toBeNull();
});

test('removeTracker returns false for unknown session', () => {
  const { removeTracker } = getTracker();
  expect(removeTracker('ghost')).toBe(false);
});

test('listTrackers returns all entries', () => {
  const { trackSession, listTrackers } = getTracker();
  trackSession('a');
  trackSession('b');
  const list = listTrackers();
  expect(list.length).toBe(2);
  expect(list.map(t => t.sessionId)).toEqual(expect.arrayContaining(['a', 'b']));
});

test('clearTrackers empties all entries', () => {
  const { trackSession, clearTrackers, listTrackers } = getTracker();
  trackSession('a');
  clearTrackers();
  expect(listTrackers().length).toBe(0);
});
