const fs = require('fs');
const path = require('path');
const { loadHistory } = require('./history');

const ARCHIVE_DIR = path.join(process.env.HOME || '.', '.tabdrop', 'archive');

function ensureArchiveDir() {
  if (!fs.existsSync(ARCHIVE_DIR)) fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
}

function archiveName(label) {
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  return label ? `${label}-${ts}.json` : `${ts}.json`;
}

function saveArchive(session, label) {
  ensureArchiveDir();
  const name = archiveName(label);
  const filePath = path.join(ARCHIVE_DIR, name);
  fs.writeFileSync(filePath, JSON.stringify(session, null, 2));
  return name;
}

function listArchives() {
  ensureArchiveDir();
  return fs.readdirSync(ARCHIVE_DIR)
    .filter(f => f.endsWith('.json'))
    .sort()
    .reverse();
}

function loadArchive(name) {
  const filePath = path.join(ARCHIVE_DIR, name);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function deleteArchive(name) {
  const filePath = path.join(ARCHIVE_DIR, name);
  if (!fs.existsSync(filePath)) return false;
  fs.unlinkSync(filePath);
  return true;
}

function archiveFromHistory(limit = 10) {
  const history = loadHistory();
  return history.slice(0, limit);
}

module.exports = { ensureArchiveDir, archiveName, saveArchive, listArchives, loadArchive, deleteArchive, archiveFromHistory, ARCHIVE_DIR };
