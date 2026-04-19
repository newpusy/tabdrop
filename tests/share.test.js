const { createShare, getShare, removeShare, listShares, isExpired, loadShares, saveShares } = require('../src/share');
const fs = require('fs');
const os = require('os');
const path = require('path');

const SHARE_DIR = path.join(os.homedir(), '.tabdrop', 'shares');
const SHARE_FILE = path.join(SHARE_DIR, 'shares.json');

function clearShares() {
  if (fs.existsSync(SHARE_FILE)) fs.writeFileSync(SHARE_FILE, '{}');
}

const mockSession = { windows: [{ tabs: [{ title: 'Test', url: 'https://test.com' }] }] };

beforeEach(() => clearShares());

test('createShare adds a share', () => {
  const s = createShare('my-share', mockSession);
  expect(s.name).toBe('my-share');
  expect(s.id).toBeTruthy();
  expect(s.expiresAt).toBeNull();
});

test('createShare with ttl sets expiresAt', () => {
  const s = createShare('ttl-share', mockSession, { ttl: 60000 });
  expect(s.expiresAt).not.toBeNull();
});

test('createShare with note stores note', () => {
  const s = createShare('noted', mockSession, { note: 'hello' });
  expect(s.note).toBe('hello');
});

test('getShare retrieves by id', () => {
  const s = createShare('get-me', mockSession);
  const found = getShare(s.id);
  expect(found.name).toBe('get-me');
});

test('getShare returns null for unknown id', () => {
  expect(getShare('nope')).toBeNull();
});

test('removeShare deletes share', () => {
  const s = createShare('remove-me', mockSession);
  expect(removeShare(s.id)).toBe(true);
  expect(getShare(s.id)).toBeNull();
});

test('removeShare returns false if not found', () => {
  expect(removeShare('ghost')).toBe(false);
});

test('listShares returns all shares', () => {
  createShare('a', mockSession);
  createShare('b', mockSession);
  expect(listShares().length).toBe(2);
});

test('isExpired returns false for no expiry', () => {
  const s = createShare('no-exp', mockSession);
  expect(isExpired(s)).toBe(false);
});

test('isExpired returns true for past date', () => {
  const s = createShare('exp', mockSession, { ttl: -1000 });
  expect(isExpired(s)).toBe(true);
});
