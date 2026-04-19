const fs = require('fs');
const path = require('path');
const os = require('os');

let tmpDir;
beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-expire-'));
  process.env.HOME = tmpDir;
  jest.resetModules();
});

function getExpire() {
  return require('../src/expire');
}

test('setExpiry stores entry with future timestamp', () => {
  const { setExpiry, getExpiry } = getExpire();
  const entry = setExpiry('sess1', 7);
  expect(entry.days).toBe(7);
  expect(entry.expiresAt).toBeGreaterThan(Date.now());
  const got = getExpiry('sess1');
  expect(got).toEqual(entry);
});

test('getExpiry returns null for unknown id', () => {
  const { getExpiry } = getExpire();
  expect(getExpiry('unknown')).toBeNull();
});

test('removeExpiry deletes entry and returns true', () => {
  const { setExpiry, removeExpiry, getExpiry } = getExpire();
  setExpiry('sess2', 3);
  expect(removeExpiry('sess2')).toBe(true);
  expect(getExpiry('sess2')).toBeNull();
});

test('removeExpiry returns false if not found', () => {
  const { removeExpiry } = getExpire();
  expect(removeExpiry('nope')).toBe(false);
});

test('listExpired returns only expired entries', () => {
  const { setExpiry, listExpired, loadExpiry, saveExpiry } = getExpire();
  setExpiry('future', 10);
  const data = loadExpiry();
  data['past'] = { expiresAt: Date.now() - 1000, days: 1 };
  saveExpiry(data);
  const expired = listExpired();
  expect(expired.length).toBe(1);
  expect(expired[0].id).toBe('past');
});

test('listExpiry returns all entries', () => {
  const { setExpiry, listExpiry } = getExpire();
  setExpiry('a', 1);
  setExpiry('b', 2);
  expect(listExpiry().length).toBe(2);
});
