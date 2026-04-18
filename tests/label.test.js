const fs = require('fs');
const path = require('path');
const os = require('os');

let tmpDir;
beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-label-'));
  process.env.HOME = tmpDir;
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

const { setLabel, getLabel, removeLabel, listLabels, findByLabel } = require('../src/label');

test('setLabel and getLabel', () => {
  setLabel('abc123', 'Work Tabs');
  expect(getLabel('abc123')).toBe('Work Tabs');
});

test('getLabel returns null for missing', () => {
  expect(getLabel('nope')).toBeNull();
});

test('removeLabel removes existing', () => {
  setLabel('abc123', 'Work');
  const had = removeLabel('abc123');
  expect(had).toBe(true);
  expect(getLabel('abc123')).toBeNull();
});

test('removeLabel returns false for missing', () => {
  expect(removeLabel('ghost')).toBe(false);
});

test('listLabels returns all', () => {
  setLabel('a', 'Alpha');
  setLabel('b', 'Beta');
  const all = listLabels();
  expect(all['a']).toBe('Alpha');
  expect(all['b']).toBe('Beta');
});

test('findByLabel finds matching session ids', () => {
  setLabel('s1', 'Research');
  setLabel('s2', 'research');
  setLabel('s3', 'Work');
  const found = findByLabel('research');
  expect(found).toContain('s1');
  expect(found).toContain('s2');
  expect(found).not.toContain('s3');
});
