const fs = require('fs');
const path = require('path');

const HOTKEYS_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'hotkeys.json');

function ensureHotkeysFile() {
  const dir = path.dirname(HOTKEYS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(HOTKEYS_FILE)) fs.writeFileSync(HOTKEYS_FILE, '{}');
}

function loadHotkeys() {
  ensureHotkeysFile();
  return JSON.parse(fs.readFileSync(HOTKEYS_FILE, 'utf8'));
}

function saveHotkeys(hotkeys) {
  ensureHotkeysFile();
  fs.writeFileSync(HOTKEYS_FILE, JSON.stringify(hotkeys, null, 2));
}

function isValidHotkey(key) {
  return typeof key === 'string' && /^[a-zA-Z0-9+\-_]{1,20}$/.test(key);
}

function setHotkey(name, key) {
  const hotkeys = loadHotkeys();
  hotkeys[name] = key;
  saveHotkeys(hotkeys);
  return hotkeys[name];
}

function getHotkey(name) {
  const hotkeys = loadHotkeys();
  return hotkeys[name] || null;
}

function removeHotkey(name) {
  const hotkeys = loadHotkeys();
  const existed = name in hotkeys;
  delete hotkeys[name];
  saveHotkeys(hotkeys);
  return existed;
}

function listHotkeys() {
  return loadHotkeys();
}

module.exports = { ensureHotkeysFile, loadHotkeys, saveHotkeys, isValidHotkey, setHotkey, getHotkey, removeHotkey, listHotkeys };
