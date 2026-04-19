const fs = require('fs');
const path = require('path');

const SHORTCUTS_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'shortcuts.json');

function ensureShortcutsFile() {
  const dir = path.dirname(SHORTCUTS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(SHORTCUTS_FILE)) fs.writeFileSync(SHORTCUTS_FILE, '{}');
}

function loadShortcuts() {
  ensureShortcutsFile();
  return JSON.parse(fs.readFileSync(SHORTCUTS_FILE, 'utf8'));
}

function saveShortcuts(shortcuts) {
  ensureShortcutsFile();
  fs.writeFileSync(SHORTCUTS_FILE, JSON.stringify(shortcuts, null, 2));
}

function setShortcut(key, sessionName) {
  const shortcuts = loadShortcuts();
  shortcuts[key] = sessionName;
  saveShortcuts(shortcuts);
  return shortcuts[key];
}

function getShortcut(key) {
  const shortcuts = loadShortcuts();
  return shortcuts[key] || null;
}

function removeShortcut(key) {
  const shortcuts = loadShortcuts();
  const existed = key in shortcuts;
  delete shortcuts[key];
  saveShortcuts(shortcuts);
  return existed;
}

function listShortcuts() {
  return loadShortcuts();
}

function resolveShortcut(keyOrName) {
  const shortcuts = loadShortcuts();
  return shortcuts[keyOrName] || keyOrName;
}

module.exports = { ensureShortcutsFile, loadShortcuts, saveShortcuts, setShortcut, getShortcut, removeShortcut, listShortcuts, resolveShortcut };
