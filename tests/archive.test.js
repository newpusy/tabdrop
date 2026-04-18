const fs = require('fs');
const path = require('path');
const os = require('os');

let tmpDir;
beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-archive-'));
  process.env.HOME = tmpDir;
  jest.resetModules();
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

function getArchive() {
  return require('../src/archive');
}

const mockSession = { tabs: [{ url: 'https://example.com', title: 'Example' }], created: '2024-01-01' };

test('ensureArchiveDir creates directory', () => {
  const { ensureArchiveDir, ARCHIVE_DIR } = getArchive();
  ensureArchiveDir();
  expect(fs.existsSync(ARCHIVE_DIR)).toBe(true);
});

test('saveArchive writes file and returns name', () => {
  const { saveArchive, ARCHIVE_DIR } = getArchive();
  const name = saveArchive(mockSession, 'test');
  expect(name).toMatch(/^test-/);
  expect(fs.existsSync(path.join(ARCHIVE_DIR, name))).toBe(true);
});

test('listArchives returns saved archives in reverse order', () => {
  const { saveArchive, listArchives } = getArchive();
  saveArchive(mockSession, 'a');
  saveArchive(mockSession, 'b');
  const list = listArchives();
  expect(list.length).toBe(2);
});

test('loadArchive returns session data', () => {
  const { saveArchive, loadArchive } = getArchive();
  const name = saveArchive(mockSession);
  const loaded = loadArchive(name);
  expect(loaded).toEqual(mockSession);
});

test('loadArchive returns null for missing file', () => {
  const { loadArchive } = getArchive();
  expect(loadArchive('nonexistent.json')).toBeNull();
});

test('deleteArchive removes file', () => {
  const { saveArchive, deleteArchive, ARCHIVE_DIR } = getArchive();
  const name = saveArchive(mockSession);
  const result = deleteArchive(name);
  expect(result).toBe(true);
  expect(fs.existsSync(path.join(ARCHIVE_DIR, name))).toBe(false);
});

test('deleteArchive returns false if not found', () => {
  const { deleteArchive } = getArchive();
  expect(deleteArchive('ghost.json')).toBe(false);
});
