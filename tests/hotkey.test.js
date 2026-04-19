const fs = require('fs');
const path = require('path');
const os = require('os');

let tmpDir;
beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-hotkey-'));
  process.env.HOME = tmpDir;
  jest.resetModules();
});

function getHotkeyModule() {
  return require('../src/hotkey');
}

test('setHotkey and getHotkey', () => {
  const { setHotkey, getHotkey } = getHotkeyModule();
  setHotkey('export', 'ctrl+e');
  expect(getHotkey('export')).toBe('ctrl+e');
});

test('getHotkey returns null for missing', () => {
  const { getHotkey } = getHotkeyModule();
  expect(getHotkey('nope')).toBeNull();
});

test('removeHotkey removes existing', () => {
  const { setHotkey, getHotkey, removeHotkey } = getHotkeyModule();
  setHotkey('snap', 'ctrl+s');
  const existed = removeHotkey('snap');
  expect(existed).toBe(true);
  expect(getHotkey('snap')).toBeNull();
});

test('removeHotkey returns false for missing', () => {
  const { removeHotkey } = getHotkeyModule();
  expect(removeHotkey('ghost')).toBe(false);
});

test('listHotkeys returns all', () => {
  const { setHotkey, listHotkeys } = getHotkeyModule();
  setHotkey('a', 'ctrl+a');
  setHotkey('b', 'ctrl+b');
  const all = listHotkeys();
  expect(all['a']).toBe('ctrl+a');
  expect(all['b']).toBe('ctrl+b');
});

test('isValidHotkey validates keys', () => {
  const { isValidHotkey } = getHotkeyModule();
  expect(isValidHotkey('ctrl+e')).toBe(true);
  expect(isValidHotkey('')).toBe(false);
  expect(isValidHotkey('this key is way too long to be valid here')).toBe(false);
});
