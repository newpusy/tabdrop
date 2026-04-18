const fs = require('fs');
const path = require('path');
const os = require('os');

const BOOKMARKS_FILE = path.join(os.homedir(), '.tabdrop', 'bookmarks.json');

function ensureBookmarksFile() {
  const dir = path.dirname(BOOKMARKS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(BOOKMARKS_FILE)) fs.writeFileSync(BOOKMARKS_FILE, JSON.stringify([]));
}

function loadBookmarks() {
  ensureBookmarksFile();
  return JSON.parse(fs.readFileSync(BOOKMARKS_FILE, 'utf8'));
}

function saveBookmarks(bookmarks) {
  ensureBookmarksFile();
  fs.writeFileSync(BOOKMARKS_FILE, JSON.stringify(bookmarks, null, 2));
}

function addBookmark(url, label = '') {
  const bookmarks = loadBookmarks();
  if (bookmarks.find(b => b.url === url)) return null;
  const entry = { url, label: label || url, addedAt: new Date().toISOString() };
  bookmarks.push(entry);
  saveBookmarks(bookmarks);
  return entry;
}

function removeBookmark(url) {
  const bookmarks = loadBookmarks();
  const idx = bookmarks.findIndex(b => b.url === url);
  if (idx === -1) return false;
  bookmarks.splice(idx, 1);
  saveBookmarks(bookmarks);
  return true;
}

function listBookmarks() {
  return loadBookmarks();
}

function isBookmarked(url) {
  return loadBookmarks().some(b => b.url === url);
}

module.exports = { ensureBookmarksFile, loadBookmarks, saveBookmarks, addBookmark, removeBookmark, listBookmarks, isBookmarked };
