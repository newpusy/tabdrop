const fs = require('fs');
const path = require('path');

const RENAME_MAP_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'renames.json');

function ensureRenameFile() {
  const dir = path.dirname(RENAME_MAP_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(RENAME_MAP_FILE)) fs.writeFileSync(RENAME_MAP_FILE, '{}');
}

function loadRenames() {
  ensureRenameFile();
  return JSON.parse(fs.readFileSync(RENAME_MAP_FILE, 'utf8'));
}

function saveRenames(renames) {
  ensureRenameFile();
  fs.writeFileSync(RENAME_MAP_FILE, JSON.stringify(renames, null, 2));
}

function setRename(oldName, newName) {
  const renames = loadRenames();
  renames[oldName] = newName;
  saveRenames(renames);
  return { oldName, newName };
}

function getRename(name) {
  const renames = loadRenames();
  return renames[name] || null;
}

function removeRename(name) {
  const renames = loadRenames();
  if (!renames[name]) return false;
  delete renames[name];
  saveRenames(renames);
  return true;
}

function listRenames() {
  return loadRenames();
}

function resolveRename(name) {
  const renames = loadRenames();
  return renames[name] || name;
}

module.exports = { ensureRenameFile, loadRenames, saveRenames, setRename, getRename, removeRename, listRenames, resolveRename };
