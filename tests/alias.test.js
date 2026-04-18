const fs = require('fs');
const os = require('os');
const path = require('path');

jest.mock('os', () => ({
  homedir: () => '/tmp/tabdrop-alias-test-' + process.pid
}));

const { setAlias, removeAlias, resolveAlias, listAliases, loadAliases } = require('../src/alias');

const testDir = path.join('/tmp/tabdrop-alias-test-' + process.pid, '.tabdrop');

afterEach(() => {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true });
  }
});

test('setAlias stores an alias', () => {
  setAlias('work', 'session-2024-01.md');
  const aliases = loadAliases();
  expect(aliases['work']).toBe('session-2024-01.md');
});

test('setAlias overwrites existing alias', () => {
  setAlias('work', 'old.md');
  setAlias('work', 'new.md');
  expect(resolveAlias('work')).toBe('new.md');
});

test('setAlias throws on invalid name', () => {
  expect(() => setAlias('bad name!', 'x.md')).toThrow('Invalid alias name');
  expect(() => setAlias('', 'x.md')).toThrow('Invalid alias name');
});

test('resolveAlias returns null for unknown alias', () => {
  expect(resolveAlias('nope')).toBeNull();
});

test('removeAlias deletes an alias', () => {
  setAlias('home', 'home.md');
  removeAlias('home');
  expect(resolveAlias('home')).toBeNull();
});

test('removeAlias throws if alias does not exist', () => {
  expect(() => removeAlias('ghost')).toThrow('Alias not found');
});

test('listAliases returns all aliases', () => {
  setAlias('a', 'a.md');
  setAlias('b', 'b.md');
  const list = listAliases();
  expect(list['a']).toBe('a.md');
  expect(list['b']).toBe('b.md');
});
