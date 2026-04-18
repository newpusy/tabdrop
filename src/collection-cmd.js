const { setCollection, getCollection, removeCollection, listCollections, addToCollection, removeFromCollection } = require('./collection');
const { formatCollection, formatCollectionList, formatCollectionSet, formatCollectionRemoved, formatCollectionNotFound, formatCollectionAdded, formatCollectionSessionRemoved } = require('./collection-format');

function cmdCollectionSet(name, sessionIds) {
  const ids = Array.isArray(sessionIds) ? sessionIds : [sessionIds].filter(Boolean);
  const col = setCollection(name, ids);
  console.log(formatCollectionSet(col.name));
}

function cmdCollectionGet(name) {
  const col = getCollection(name);
  if (!col) return console.log(formatCollectionNotFound(name));
  console.log(formatCollection(col));
  col.sessionIds.forEach(id => console.log('  -', id));
}

function cmdCollectionRemove(name) {
  const existed = removeCollection(name);
  console.log(existed ? formatCollectionRemoved(name) : formatCollectionNotFound(name));
}

function cmdCollectionList() {
  const cols = listCollections();
  console.log(formatCollectionList(cols));
}

function cmdCollectionAdd(name, sessionId) {
  const col = addToCollection(name, sessionId);
  if (!col) return console.log(formatCollectionNotFound(name));
  console.log(formatCollectionAdded(name, sessionId));
}

function cmdCollectionRemoveSession(name, sessionId) {
  const col = removeFromCollection(name, sessionId);
  if (!col) return console.log(formatCollectionNotFound(name));
  console.log(formatCollectionSessionRemoved(name, sessionId));
}

module.exports = { cmdCollectionSet, cmdCollectionGet, cmdCollectionRemove, cmdCollectionList, cmdCollectionAdd, cmdCollectionRemoveSession };
