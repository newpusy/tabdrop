const fs = require('fs');
const path = require('path');
const os = require('os');

let tmpDir;
beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-theme-'));
  process.env.HOME = tmpDir;
  jest.resetModules();
});
afterEach(() => fs.rmSync(tmpDir, { recursive: true, force: true }));

function getTheme() { return require('../src/theme'); }

test('listThemes returns built-in themes with default active', () => {
  const { listThemes } = getTheme();
  const { themes, active } = listThemes();
  expect(active).toBe('default');
  expect(themes).toHaveProperty('default');
  expect(themes).toHaveProperty('dark');
});

test('setActiveTheme switches active theme', () => {
  const { setActiveTheme, listThemes } = getTheme();
  const ok = setActiveTheme('dark');
  expect(ok).toBe(true);
  expect(listThemes().active).toBe('dark');
});

test('setActiveTheme returns false for unknown theme', () => {
  const { setActiveTheme } = getTheme();
  expect(setActiveTheme('nonexistent')).toBe(false);
});

test('setCustomTheme adds custom theme', () => {
  const { setCustomTheme, listThemes } = getTheme();
  setCustomTheme('myTheme', { primary: 'pink', accent: 'purple', muted: 'gray', success: 'green', error: 'red' });
  const { themes } = listThemes();
  expect(themes).toHaveProperty('myTheme');
  expect(themes.myTheme.primary).toBe('pink');
});

test('setActiveTheme works for custom theme', () => {
  const { setCustomTheme, setActiveTheme, listThemes } = getTheme();
  setCustomTheme('myTheme', { primary: 'pink', accent: 'purple', muted: 'gray', success: 'green', error: 'red' });
  setActiveTheme('myTheme');
  expect(listThemes().active).toBe('myTheme');
});

test('removeCustomTheme removes theme and resets active', () => {
  const { setCustomTheme, setActiveTheme, removeCustomTheme, listThemes } = getTheme();
  setCustomTheme('myTheme', { primary: 'pink', accent: 'purple', muted: 'gray', success: 'green', error: 'red' });
  setActiveTheme('myTheme');
  removeCustomTheme('myTheme');
  const { themes, active } = listThemes();
  expect(themes).not.toHaveProperty('myTheme');
  expect(active).toBe('default');
});

test('removeCustomTheme returns false if not found', () => {
  const { removeCustomTheme } = getTheme();
  expect(removeCustomTheme('ghost')).toBe(false);
});

test('getActiveTheme returns correct theme object', () => {
  const { setActiveTheme, getActiveTheme, BUILT_IN_THEMES } = getTheme();
  setActiveTheme('minimal');
  expect(getActiveTheme()).toEqual(BUILT_IN_THEMES.minimal);
});
