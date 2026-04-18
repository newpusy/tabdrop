function formatBookmark(b) {
  return `[${b.label}](${b.url}) — added ${new Date(b.addedAt).toLocaleDateString()}`;
}

function formatBookmarkList(bookmarks) {
  if (!bookmarks.length) return 'No bookmarks saved.';
  return bookmarks.map((b, i) => `${i + 1}. ${formatBookmark(b)}`).join('\n');
}

function formatBookmarkAdded(b) {
  return `Bookmarked: ${b.label} (${b.url})`;
}

function formatBookmarkRemoved(url) {
  return `Removed bookmark: ${url}`;
}

function formatAlreadyBookmarked(url) {
  return `Already bookmarked: ${url}`;
}

module.exports = { formatBookmark, formatBookmarkList, formatBookmarkAdded, formatBookmarkRemoved, formatAlreadyBookmarked };
