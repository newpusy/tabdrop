function formatCollection(col) {
  return `[${col.name}] ${col.sessionIds.length} session(s) — updated ${col.updatedAt}`;
}

function formatCollectionList(cols) {
  if (!cols.length) return 'No collections found.';
  return cols.map(formatCollection).join('\n');
}

function formatCollectionSet(name) {
  return `Collection "${name}" saved.`;
}

function formatCollectionRemoved(name) {
  return `Collection "${name}" removed.`;
}

function formatCollectionNotFound(name) {
  return `Collection "${name}" not found.`;
}

function formatCollectionAdded(name, sessionId) {
  return `Session "${sessionId}" added to collection "${name}".`;
}

function formatCollectionSessionRemoved(name, sessionId) {
  return `Session "${sessionId}" removed from collection "${name}".`;
}

module.exports = { formatCollection, formatCollectionList, formatCollectionSet, formatCollectionRemoved, formatCollectionNotFound, formatCollectionAdded, formatCollectionSessionRemoved };
