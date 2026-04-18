const fs = require('fs');
const path = require('path');
const os = require('os');

let tmpDir;
beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-group-'));
  process.env.HOME = tmpDir;
  jest.resetModules();
});

afterEach(() => fs.rmSync(tmpDir, { recursive: true }));

function getGroup() { return require('../src/group'); }

test('setGroup creates a group', () => {
  const { setGroup, getGroup } = getGroup();
  setGroup('work', ['s1', 's2']);
  const g = getGroup('work');
  expect(g).not.toBeNull();
  expect(g.sessionIds).toEqual(['s1', 's2']);
});

test('getGroup returns null for missing group', () => {
  const { getGroup } = getGroup();
  expect(getGroup('nope')).toBeNull();
});

test('removeGroup deletes group', () => {
  const { setGroup, removeGroup, getGroup } = getGroup();
  setGroup('test', []);
  expect(removeGroup('test')).toBe(true);
  expect(getGroup('test')).toBeNull();
});

test('removeGroup returns false for missing group', () => {
  const { removeGroup } = getGroup();
  expect(removeGroup('ghost')).toBe(false);
});

test('listGroups returns all groups', () => {
  const { setGroup, listGroups } = getGroup();
  setGroup('a', []);
  setGroup('b', ['x']);
  const list = listGroups();
  expect(list.length).toBe(2);
});

test('addToGroup appends sessionId', () => {
  const { setGroup, addToGroup, getGroup } = getGroup();
  setGroup('g', ['s1']);
  addToGroup('g', 's2');
  expect(getGroup('g').sessionIds).toContain('s2');
});

test('removeFromGroup removes sessionId', () => {
  const { setGroup, removeFromGroup, getGroup } = getGroup();
  setGroup('g', ['s1', 's2']);
  removeFromGroup('g', 's1');
  expect(getGroup('g').sessionIds).not.toContain('s1');
});
