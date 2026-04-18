const fs = require('fs');
const path = require('path');
const os = require('os');

let tmpDir;
beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-notes-'));
  process.env.HOME = tmpDir;
  jest.resetModules();
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

function getNotes() {
  return require('../src/notes');
}

test('setNote stores a note for a session', () => {
  const { setNote, getNote } = getNotes();
  setNote('abc123', 'work tabs');
  const note = getNote('abc123');
  expect(note).not.toBeNull();
  expect(note.text).toBe('work tabs');
  expect(note.updatedAt).toBeDefined();
});

test('getNote returns null for unknown session', () => {
  const { getNote } = getNotes();
  expect(getNote('nope')).toBeNull();
});

test('removeNote deletes an existing note', () => {
  const { setNote, removeNote, getNote } = getNotes();
  setNote('abc123', 'temp');
  const removed = removeNote('abc123');
  expect(removed).toBe(true);
  expect(getNote('abc123')).toBeNull();
});

test('removeNote returns false when note does not exist', () => {
  const { removeNote } = getNotes();
  expect(removeNote('ghost')).toBe(false);
});

test('listNotes returns all notes', () => {
  const { setNote, listNotes } = getNotes();
  setNote('a', 'first');
  setNote('b', 'second');
  const all = listNotes();
  expect(Object.keys(all)).toHaveLength(2);
  expect(all['a'].text).toBe('first');
});

test('setNote overwrites existing note', () => {
  const { setNote, getNote } = getNotes();
  setNote('x', 'old');
  setNote('x', 'new');
  expect(getNote('x').text).toBe('new');
});
