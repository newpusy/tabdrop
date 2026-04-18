const { addFavorite, removeFavorite, getFavorite, listFavorites } = require('./favorite');
const { formatFavoriteList, formatFavoriteAdded, formatFavoriteRemoved, formatFavoriteNotFound } = require('./favorite-format');
const { loadHistory } = require('./history');

function cmdFavoriteAdd(name) {
  const history = loadHistory();
  const last = history[history.length - 1];
  if (!last) return console.log('No session in history to favorite.');
  addFavorite(name, last.session);
  console.log(formatFavoriteAdded(name));
}

function cmdFavoriteRemove(name) {
  const removed = removeFavorite(name);
  if (removed) {
    console.log(formatFavoriteRemoved(name));
  } else {
    console.log(formatFavoriteNotFound(name));
  }
}

function cmdFavoriteGet(name) {
  const entry = getFavorite(name);
  if (!entry) return console.log(formatFavoriteNotFound(name));
  const tabs = entry.session && entry.session.tabs ? entry.session.tabs : [];
  tabs.forEach(t => console.log(`  [${t.title}] ${t.url}`));
}

function cmdFavoriteList() {
  const favorites = listFavorites();
  console.log(formatFavoriteList(favorites));
}

module.exports = { cmdFavoriteAdd, cmdFavoriteRemove, cmdFavoriteGet, cmdFavoriteList };
