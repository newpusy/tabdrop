const fs = require('fs');
const os = require('os');
const path = require('path');

jest.mock('os', () => ({ homedir: () => '/tmp/tabdrop-test-bookmark' }));

const { addBookmark, removeBookmark, listBookmarks, isBookmarked, loadBookmarks } = require('../src/bookmark');
const { formatBookmarkList, formatBookmarkAdded, formatBookmarkRemoved } = require('../src/bookmark-format');

const BOOKMARKS_FILE = '/tmp/tabdrop-test-bookmark/.tabdrop/bookmarks.json';

beforeEach(() => {
  fs.mkdirSync(path.dirname(BOOKMARKS_FILE), { recursive: true });
  fs.writeFileSync(BOOKMARKS_FILE, JSON.stringify([]));
});

afterAll(() => {
  fs.rmSync('/tmp/tabdrop-test-bookmark', { recursive: true, force: true });
});

test('addBookmark adds a new entry', () => {
  const b = addBookmark('https://example.com', 'Example');
  expect(b).not.toBeNull();
  expect(b.url).toBe('https://example.com');
  expect(b.label).toBe('Example');
});

test('addBookmark returns null for duplicate', () => {
  addBookmark('https://example.com', 'Example');
  const result = addBookmark('https://example.com', 'Example2');
  expect(result).toBeNull();
});

test('removeBookmark removes an entry', () => {
  addBookmark('https://example.com', 'Example');
  const removed = removeBookmark('https://example.com');
  expect(removed).toBe(true);
  expect(listBookmarks()).toHaveLength(0);
});

test('removeBookmark returns false if not found', () => {
  expect(removeBookmark('https://nothere.com')).toBe(false);
});

test('isBookmarked returns correct boolean', () => {
  addBookmark('https://example.com');
  expect(isBookmarked('https://example.com')).toBe(true);
  expect(isBookmarked('https://other.com')).toBe(false);
});

test('formatBookmarkList shows message when empty', () => {
  expect(formatBookmarkList([])).toBe('No bookmarks saved.');
});

test('formatBookmarkAdded and formatBookmarkRemoved', () => {
  const b = { url: 'https://x.com', label: 'X', addedAt: new Date().toISOString() };
  expect(formatBookmarkAdded(b)).toContain('X');
  expect(formatBookmarkRemoved('https://x.com')).toContain('https://x.com');
});
