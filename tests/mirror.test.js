const fs = require('fs');
const path = require('path');
const os = require('os');

let mirrorModule;

function getMirrorModule() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mirror-'));
  process.env.HOME = dir;
  jest.resetModules();
  return require('../src/mirror');
}

beforeEach(() => {
  mirrorModule = getMirrorModule();
});

const sessionA = { windows: [{ tabs: [{ url: 'https://a.com', title: 'A' }, { url: 'https://shared.com', title: 'S' }] }] };
const sessionB = { windows: [{ tabs: [{ url: 'https://b.com', title: 'B' }, { url: 'https://shared.com', title: 'S' }] }] };

test('createMirror stores a mirror entry', () => {
  const m = mirrorModule.createMirror('myMirror', sessionA, sessionB);
  expect(m.name).toBe('myMirror');
  expect(m.sessionA).toEqual(sessionA);
  expect(m.createdAt).toBeDefined();
});

test('getMirror retrieves created mirror', () => {
  mirrorModule.createMirror('alpha', sessionA, sessionB);
  const m = mirrorModule.getMirror('alpha');
  expect(m).not.toBeNull();
  expect(m.name).toBe('alpha');
});

test('getMirror returns null for unknown name', () => {
  expect(mirrorModule.getMirror('nope')).toBeNull();
});

test('listMirrors returns all mirrors', () => {
  mirrorModule.createMirror('m1', sessionA, sessionB);
  mirrorModule.createMirror('m2', sessionB, sessionA);
  const list = mirrorModule.listMirrors();
  expect(list.length).toBe(2);
});

test('removeMirror deletes a mirror', () => {
  mirrorModule.createMirror('toRemove', sessionA, sessionB);
  const removed = mirrorModule.removeMirror('toRemove');
  expect(removed).toBe(true);
  expect(mirrorModule.getMirror('toRemove')).toBeNull();
});

test('removeMirror returns false for missing mirror', () => {
  expect(mirrorModule.removeMirror('ghost')).toBe(false);
});

test('syncMirror identifies shared and exclusive urls', () => {
  const mirror = mirrorModule.createMirror('sync1', sessionA, sessionB);
  const sync = mirrorModule.syncMirror(mirror);
  expect(sync.shared).toContain('https://shared.com');
  expect(sync.onlyInA).toContain('https://a.com');
  expect(sync.onlyInB).toContain('https://b.com');
});

test('syncMirror handles empty sessions', () => {
  const empty = { windows: [] };
  const mirror = mirrorModule.createMirror('empty', empty, empty);
  const sync = mirrorModule.syncMirror(mirror);
  expect(sync.shared.length).toBe(0);
  expect(sync.onlyInA.length).toBe(0);
});
