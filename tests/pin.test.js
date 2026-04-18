const fs = require('fs');
const path = require('path');
const os = require('os');

// redirect PINS_FILE to a temp location before requiring
const TEMP_DIR = path.join(os.tmpdir(), 'tabdrop-pin-test-' + Date.now());
const PINS_FILE = path.join(TEMP_DIR, 'pins.json');

jest.mock('os', () => ({
  ...jest.requireActual('os'),
  homedir: () => TEMP_DIR,
}));

const { pinSession, unpinSession, listPins, isPinned } = require('../src/pin');

afterEach(() => {
  if (fs.existsSync(PINS_FILE)) fs.unlinkSync(PINS_FILE);
});

afterAll(() => {
  if (fs.existsSync(TEMP_DIR)) fs.rmSync(TEMP_DIR, { recursive: true });
});

test('pinSession adds a session to pins', () => {
  const entry = pinSession('work', '/path/to/work.md');
  expect(entry.name).toBe('work');
  expect(entry.filePath).toBe('/path/to/work.md');
  expect(entry.pinnedAt).toBeDefined();
});

test('pinSession throws if already pinned', () => {
  pinSession('dup', '/some/path.md');
  expect(() => pinSession('dup', '/other.md')).toThrow('already pinned');
});

test('isPinned returns true for pinned session', () => {
  pinSession('mySession', '/foo.md');
  expect(isPinned('mySession')).toBe(true);
});

test('isPinned returns false for unknown session', () => {
  expect(isPinned('ghost')).toBe(false);
});

test('unpinSession removes a pinned session', () => {
  pinSession('temp', '/tmp/temp.md');
  const removed = unpinSession('temp');
  expect(removed.name).toBe('temp');
  expect(isPinned('temp')).toBe(false);
});

test('unpinSession throws if not pinned', () => {
  expect(() => unpinSession('nope')).toThrow('No pinned session');
});

test('listPins returns all pinned sessions', () => {
  pinSession('a', '/a.md');
  pinSession('b', '/b.md');
  const pins = listPins();
  expect(pins).toHaveLength(2);
  expect(pins.map(p => p.name)).toEqual(['a', 'b']);
});
