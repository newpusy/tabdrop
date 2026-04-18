const fs = require('fs');
const path = require('path');

const FAVORITES_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'favorites.json');

function ensureFavoritesFile() {
  const dir = path.dirname(FAVORITES_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(FAVORITES_FILE)) fs.writeFileSync(FAVORITES_FILE, '{}');
}

function loadFavorites() {
  ensureFavoritesFile();
  return JSON.parse(fs.readFileSync(FAVORITES_FILE, 'utf8'));
}

function saveFavorites(favorites) {
  ensureFavoritesFile();
  fs.writeFileSync(FAVORITES_FILE, JSON.stringify(favorites, null, 2));
}

function addFavorite(name, session) {
  const favorites = loadFavorites();
  favorites[name] = { session, addedAt: new Date().toISOString() };
  saveFavorites(favorites);
  return favorites[name];
}

function removeFavorite(name) {
  const favorites = loadFavorites();
  if (!favorites[name]) return false;
  delete favorites[name];
  saveFavorites(favorites);
  return true;
}

function getFavorite(name) {
  const favorites = loadFavorites();
  return favorites[name] || null;
}

function listFavorites() {
  const favorites = loadFavorites();
  return Object.entries(favorites).map(([name, entry]) => ({ name, ...entry }));
}

function isFavorite(name) {
  const favorites = loadFavorites();
  return !!favorites[name];
}

module.exports = { ensureFavoritesFile, loadFavorites, saveFavorites, addFavorite, removeFavorite, getFavorite, listFavorites, isFavorite };
