const fs = require('fs');
const path = require('path');
const os = require('os');

let tmpDir;
beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-shortcut-'));
  process.env.HOME = tmpDir;
  jest.resetModules();
});
afterEach(() => fs.rmSync(tmpDir, { recursive: true }));

function getShortcutModule() {
  return require('../src/shortcut');
}

test('setShortcut and getShortcut', () => {
  const { setShortcut, getShortcut } = getShortcutModule();
  setShortcut('w', 'work-session');
  expect(getShortcut('w')).toBe('work-session');
});

test('getShortcut returns null for missing key', () => {
  const { getShortcut } = getShortcutModule();
  expect(getShortcut('z')).toBeNull();
});

test('removeShortcut removes existing key', () => {
  const { setShortcut, removeShortcut, getShortcut } = getShortcutModule();
  setShortcut('h', 'home');
  const existed = removeShortcut('h');
  expect(existed).toBe(true);
  expect(getShortcut('h')).toBeNull();
});

test('removeShortcut returns false for missing key', () => {
  const { removeShortcut } = getShortcutModule();
  expect(removeShortcut('nope')).toBe(false);
});

test('listShortcuts returns all', () => {
  const { setShortcut, listShortcuts } = getShortcutModule();
  setShortcut('a', 'alpha');
  setShortcut('b', 'beta');
  const list = listShortcuts();
  expect(list).toEqual({ a: 'alpha', b: 'beta' });
});

test('resolveShortcut returns session name for key', () => {
  const { setShortcut, resolveShortcut } = getShortcutModule();
  setShortcut('m', 'morning');
  expect(resolveShortcut('m')).toBe('morning');
});

test('resolveShortcut returns input if no shortcut', () => {
  const { resolveShortcut } = getShortcutModule();
  expect(resolveShortcut('raw-name')).toBe('raw-name');
});
