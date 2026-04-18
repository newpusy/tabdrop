const fs = require('fs');
const os = require('os');
const path = require('path');

jest.mock('os', () => ({ homedir: () => '/tmp/tabdrop-test-preset-' + process.pid }));

const {
  setPreset, getPreset, removePreset, listPresets, loadPresets
} = require('../src/export-preset');

const HOME = os.homedir();
const FILE = path.join(HOME, '.tabdrop', 'export-presets.json');

afterEach(() => {
  if (fs.existsSync(FILE)) fs.writeFileSync(FILE, '{}');
});

afterAll(() => {
  fs.rmSync(HOME, { recursive: true, force: true });
});

test('setPreset stores preset with options', () => {
  const p = setPreset('minimal', { format: 'md', noDate: true });
  expect(p.name).toBe('minimal');
  expect(p.options.format).toBe('md');
});

test('getPreset returns stored preset', () => {
  setPreset('full', { format: 'json', tags: true });
  const p = getPreset('full');
  expect(p).not.toBeNull();
  expect(p.options.tags).toBe(true);
});

test('getPreset returns null for missing', () => {
  expect(getPreset('nope')).toBeNull();
});

test('removePreset deletes preset', () => {
  setPreset('tmp', { format: 'md' });
  const removed = removePreset('tmp');
  expect(removed).toBe(true);
  expect(getPreset('tmp')).toBeNull();
});

test('removePreset returns false for missing', () => {
  expect(removePreset('ghost')).toBe(false);
});

test('listPresets returns all presets', () => {
  setPreset('a', { format: 'md' });
  setPreset('b', { format: 'json' });
  const list = listPresets();
  expect(list.length).toBeGreaterThanOrEqual(2);
});
