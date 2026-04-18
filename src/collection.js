const fs = require('fs');
const path = require('path');

const COLLECTIONS_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'collections.json');

function ensureCollectionsFile() {
  const dir = path.dirname(COLLECTIONS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(COLLECTIONS_FILE)) fs.writeFileSync(COLLECTIONS_FILE, '{}');
}

function loadCollections() {
  ensureCollectionsFile();
  return JSON.parse(fs.readFileSync(COLLECTIONS_FILE, 'utf8'));
}

function saveCollections(collections) {
  ensureCollectionsFile();
  fs.writeFileSync(COLLECTIONS_FILE, JSON.stringify(collections, null, 2));
}

function setCollection(name, sessionIds) {
  const collections = loadCollections();
  collections[name] = { name, sessionIds, createdAt: collections[name]?.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() };
  saveCollections(collections);
  return collections[name];
}

function getCollection(name) {
  const collections = loadCollections();
  return collections[name] || null;
}

function removeCollection(name) {
  const collections = loadCollections();
  const existed = !!collections[name];
  delete collections[name];
  saveCollections(collections);
  return existed;
}

function listCollections() {
  return Object.values(loadCollections());
}

function addToCollection(name, sessionId) {
  const collections = loadCollections();
  if (!collections[name]) return null;
  if (!collections[name].sessionIds.includes(sessionId)) {
    collections[name].sessionIds.push(sessionId);
    collections[name].updatedAt = new Date().toISOString();
    saveCollections(collections);
  }
  return collections[name];
}

function removeFromCollection(name, sessionId) {
  const collections = loadCollections();
  if (!collections[name]) return null;
  collections[name].sessionIds = collections[name].sessionIds.filter(id => id !== sessionId);
  collections[name].updatedAt = new Date().toISOString();
  saveCollections(collections);
  return collections[name];
}

module.exports = { ensureCollectionsFile, loadCollections, saveCollections, setCollection, getCollection, removeCollection, listCollections, addToCollection, removeFromCollection };
