const fs = require('fs');
const path = require('path');
const os = require('os');

let tmpDir;
beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-col-'));
  process.env.HOME = tmpDir;
  jest.resetModules();
});

function getCol() {
  return require('../src/collection');
}

test('setCollection and getCollection', () => {
  const { setCollection, getCollection } = getCol();
  setCollection('work', ['s1', 's2']);
  const col = getCollection('work');
  expect(col.name).toBe('work');
  expect(col.sessionIds).toEqual(['s1', 's2']);
});

test('getCollection returns null if not found', () => {
  const { getCollection } = getCol();
  expect(getCollection('nope')).toBeNull();
});

test('removeCollection removes entry', () => {
  const { setCollection, removeCollection, getCollection } = getCol();
  setCollection('tmp', []);
  expect(removeCollection('tmp')).toBe(true);
  expect(getCollection('tmp')).toBeNull();
});

test('removeCollection returns false if not found', () => {
  const { removeCollection } = getCol();
  expect(removeCollection('ghost')).toBe(false);
});

test('listCollections returns all', () => {
  const { setCollection, listCollections } = getCol();
  setCollection('a', []);
  setCollection('b', ['x']);
  const list = listCollections();
  expect(list.length).toBe(2);
});

test('addToCollection adds sessionId', () => {
  const { setCollection, addToCollection, getCollection } = getCol();
  setCollection('c', []);
  addToCollection('c', 'sess1');
  expect(getCollection('c').sessionIds).toContain('sess1');
});

test('addToCollection does not duplicate', () => {
  const { setCollection, addToCollection, getCollection } = getCol();
  setCollection('c', ['sess1']);
  addToCollection('c', 'sess1');
  expect(getCollection('c').sessionIds.length).toBe(1);
});

test('removeFromCollection removes sessionId', () => {
  const { setCollection, removeFromCollection, getCollection } = getCol();
  setCollection('c', ['sess1', 'sess2']);
  removeFromCollection('c', 'sess1');
  expect(getCollection('c').sessionIds).not.toContain('sess1');
});
