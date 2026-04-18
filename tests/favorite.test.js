const fs = require('fs');
const path = require('path');
const os = require('os');

let tmpDir;
beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-fav-'));
  process.env.HOME = tmpDir;
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

const { addFavorite, removeFavorite, getFavorite, listFavorites, isFavorite } = require('../src/favorite');

const mockSession = { tabs: [{ title: 'A', url: 'https://a.com' }] };

test('addFavorite stores entry', () => {
  const entry = addFavorite('work', mockSession);
  expect(entry.session).toEqual(mockSession);
  expect(entry.addedAt).toBeDefined();
});

test('getFavorite returns stored entry', () => {
  addFavorite('work', mockSession);
  const entry = getFavorite('work');
  expect(entry).not.toBeNull();
  expect(entry.session).toEqual(mockSession);
});

test('getFavorite returns null for unknown', () => {
  expect(getFavorite('nope')).toBeNull();
});

test('isFavorite returns true after add', () => {
  addFavorite('work', mockSession);
  expect(isFavorite('work')).toBe(true);
});

test('isFavorite returns false for unknown', () => {
  expect(isFavorite('nope')).toBe(false);
});

test('removeFavorite deletes entry', () => {
  addFavorite('work', mockSession);
  const result = removeFavorite('work');
  expect(result).toBe(true);
  expect(getFavorite('work')).toBeNull();
});

test('removeFavorite returns false if not found', () => {
  expect(removeFavorite('nope')).toBe(false);
});

test('listFavorites returns all entries', () => {
  addFavorite('work', mockSession);
  addFavorite('home', mockSession);
  const list = listFavorites();
  expect(list.length).toBe(2);
  expect(list.map(f => f.name)).toContain('work');
});
