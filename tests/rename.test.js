const fs = require('fs');
const os = require('os');
const path = require('path');

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-rename-'));
process.env.HOME = tmpDir;

const { setRename, getRename, removeRename, listRenames, resolveRename } = require('../src/rename');

describe('rename', () => {
  beforeEach(() => {
    const f = path.join(tmpDir, '.tabdrop', 'renames.json');
    if (fs.existsSync(f)) fs.writeFileSync(f, '{}');
  });

  test('setRename and getRename', () => {
    setRename('work', 'work-2024');
    expect(getRename('work')).toBe('work-2024');
  });

  test('getRename returns null for unknown', () => {
    expect(getRename('nope')).toBeNull();
  });

  test('listRenames returns all entries', () => {
    setRename('a', 'alpha');
    setRename('b', 'beta');
    const renames = listRenames();
    expect(renames['a']).toBe('alpha');
    expect(renames['b']).toBe('beta');
  });

  test('removeRename deletes entry', () => {
    setRename('x', 'y');
    const result = removeRename('x');
    expect(result).toBe(true);
    expect(getRename('x')).toBeNull();
  });

  test('removeRename returns false for missing', () => {
    expect(removeRename('ghost')).toBe(false);
  });

  test('resolveRename returns mapped name', () => {
    setRename('old', 'new');
    expect(resolveRename('old')).toBe('new');
  });

  test('resolveRename returns original if no mapping', () => {
    expect(resolveRename('unchanged')).toBe('unchanged');
  });
});
