const fs = require('fs');
const path = require('path');
const os = require('os');

const TMP = path.join(os.tmpdir(), 'tabdrop-stash-test-' + Date.now());
process.env.HOME = TMP;

const { saveStash, getStash, removeStash, listStashes, popStash, loadStashes } = require('../src/stash');

const mockSession = {
  windows: [
    { tabs: [{ title: 'GitHub', url: 'https://github.com' }, { title: 'MDN', url: 'https://mdn.io' }] }
  ]
};

afterAll(() => {
  fs.rmSync(TMP, { recursive: true, force: true });
});

test('saveStash creates a stash entry', () => {
  const entry = saveStash('work', mockSession);
  expect(entry.name).toBe('work');
  expect(entry.stashedAt).toBeDefined();
  expect(entry.session).toEqual(mockSession);
});

test('getStash retrieves a saved stash', () => {
  const entry = getStash('work');
  expect(entry).not.toBeNull();
  expect(entry.name).toBe('work');
});

test('getStash returns null for missing stash', () => {
  expect(getStash('nope')).toBeNull();
});

test('listStashes returns summary with tabCount', () => {
  const list = listStashes();
  expect(list.length).toBeGreaterThan(0);
  const item = list.find(e => e.name === 'work');
  expect(item).toBeDefined();
  expect(item.tabCount).toBe(2);
});

test('popStash returns session and removes stash', () => {
  saveStash('temp', mockSession);
  const session = popStash('temp');
  expect(session).toEqual(mockSession);
  expect(getStash('temp')).toBeNull();
});

test('popStash returns null for missing stash', () => {
  expect(popStash('ghost')).toBeNull();
});

test('removeStash deletes the stash file', () => {
  saveStash('todelete', mockSession);
  const removed = removeStash('todelete');
  expect(removed).toBe(true);
  expect(getStash('todelete')).toBeNull();
});

test('removeStash returns false if not found', () => {
  expect(removeStash('missing')).toBe(false);
});
