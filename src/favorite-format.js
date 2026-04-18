function formatFavorite({ name, session, addedAt }) {
  const tabCount = session && session.tabs ? session.tabs.length : 0;
  return `★ ${name} — ${tabCount} tab(s) — added ${new Date(addedAt).toLocaleDateString()}`;
}

function formatFavoriteList(favorites) {
  if (!favorites.length) return 'No favorites saved.';
  return favorites.map(formatFavorite).join('\n');
}

function formatFavoriteAdded(name) {
  return `Added "${name}" to favorites.`;
}

function formatFavoriteRemoved(name) {
  return `Removed "${name}" from favorites.`;
}

function formatFavoriteNotFound(name) {
  return `Favorite "${name}" not found.`;
}

module.exports = { formatFavorite, formatFavoriteList, formatFavoriteAdded, formatFavoriteRemoved, formatFavoriteNotFound };
