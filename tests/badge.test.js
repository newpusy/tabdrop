const fs = require('fs');
const path = require('path');
const os = require('os');

let tmpDir;
beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-badge-'));
  process.env.HOME = tmpDir;
  jest.resetModules();
});

function getBadge() {
  return require('../src/badge');
}

test('isValidBadge accepts known badges', () => {
  const { isValidBadge } = getBadge();
  expect(isValidBadge('new')).toBe(true);
  expect(isValidBadge('done')).toBe(true);
  expect(isValidBadge('unknown')).toBe(false);
});

test('setBadge and getBadge round-trip', () => {
  const { setBadge, getBadge } = getBadge();
  expect(setBadge('session-1', 'starred')).toBe(true);
  expect(getBadge('session-1')).toBe('starred');
});

test('setBadge returns false for invalid badge', () => {
  const { setBadge } = getBadge();
  expect(setBadge('session-1', 'bogus')).toBe(false);
});

test('getBadge returns null for missing session', () => {
  const { getBadge } = getBadge();
  expect(getBadge('no-such-session')).toBeNull();
});

test('removeBadge removes existing badge', () => {
  const { setBadge, removeBadge, getBadge } = getBadge();
  setBadge('session-2', 'draft');
  expect(removeBadge('session-2')).toBe(true);
  expect(getBadge('session-2')).toBeNull();
});

test('removeBadge returns false for missing session', () => {
  const { removeBadge } = getBadge();
  expect(removeBadge('ghost')).toBe(false);
});

test('listBadges returns all set badges', () => {
  const { setBadge, listBadges } = getBadge();
  setBadge('a', 'new');
  setBadge('b', 'reviewed');
  const all = listBadges();
  expect(all['a']).toBe('new');
  expect(all['b']).toBe('reviewed');
});

test('filterByBadge returns matching session ids', () => {
  const { setBadge, filterByBadge } = getBadge();
  setBadge('x', 'updated');
  setBadge('y', 'new');
  setBadge('z', 'updated');
  const results = filterByBadge('updated');
  expect(results).toContain('x');
  expect(results).toContain('z');
  expect(results).not.toContain('y');
});
