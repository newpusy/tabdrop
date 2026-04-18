const fs = require('fs');
const path = require('path');

const NOTES_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'notes.json');

function ensureNotesFile() {
  const dir = path.dirname(NOTES_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(NOTES_FILE)) fs.writeFileSync(NOTES_FILE, '{}');
}

function loadNotes() {
  ensureNotesFile();
  try {
    return JSON.parse(fs.readFileSync(NOTES_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function saveNotes(notes) {
  ensureNotesFile();
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
}

function setNote(sessionId, note) {
  const notes = loadNotes();
  notes[sessionId] = { text: note, updatedAt: new Date().toISOString() };
  saveNotes(notes);
  return notes[sessionId];
}

function getNote(sessionId) {
  const notes = loadNotes();
  return notes[sessionId] || null;
}

function removeNote(sessionId) {
  const notes = loadNotes();
  const existed = !!notes[sessionId];
  delete notes[sessionId];
  saveNotes(notes);
  return existed;
}

function listNotes() {
  return loadNotes();
}

module.exports = { ensureNotesFile, loadNotes, saveNotes, setNote, getNote, removeNote, listNotes };
