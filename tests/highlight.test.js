const fs = require('fs');
const path = require('path');
const os = require('os');

let tmpDir;
beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-highlight-'));
  process.env.HOME = tmpDir;
  jest.resetModules();
});

function getHL() {
  return require('../src/highlight');
}

test('isValidColor accepts valid colors', () => {
  const { isValidColor } = getHL();
  expect(isValidColor('red')).toBe(true);
  expect(isValidColor('blue')).toBe(true);
  expect(isValidColor('neon')).toBe(false);
});

test('setHighlight stores color', () => {
  const { setHighlight, getHighlight } = getHL();
  setHighlight('sess1', 'green');
  expect(getHighlight('sess1')).toBe('green');
});

test('setHighlight returns null for invalid color', () => {
  const { setHighlight } = getHL();
  expect(setHighlight('sess1', 'neon')).toBeNull();
});

test('getHighlight returns null if not set', () => {
  const { getHighlight } = getHL();
  expect(getHighlight('unknown')).toBeNull();
});

test('removeHighlight removes entry', () => {
  const { setHighlight, removeHighlight, getHighlight } = getHL();
  setHighlight('sess2', 'yellow');
  expect(removeHighlight('sess2')).toBe(true);
  expect(getHighlight('sess2')).toBeNull();
});

test('removeHighlight returns false if not found', () => {
  const { removeHighlight } = getHL();
  expect(removeHighlight('ghost')).toBe(false);
});

test('listHighlights returns all', () => {
  const { setHighlight, listHighlights } = getHL();
  setHighlight('a', 'red');
  setHighlight('b', 'blue');
  const list = listHighlights();
  expect(list['a']).toBe('red');
  expect(list['b']).toBe('blue');
});

test('filterByHighlight filters sessions by color', () => {
  const { setHighlight, filterByHighlight } = getHL();
  setHighlight('s1', 'pink');
  setHighlight('s2', 'blue');
  const sessions = [{ id: 's1' }, { id: 's2' }, { id: 's3' }];
  const result = filterByHighlight(sessions, 'pink');
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe('s1');
});
