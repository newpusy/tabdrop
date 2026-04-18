// pin.js — manage pinned/favorite tab sessions

const fs = require('fs');
const path = require('path');
const os = require('os');

const PINS_FILE = path.join(os.homedir(), '.tabdrop', 'pins.json');

function ensurePinsFile() {
  const dir = path.dirname(PINS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(PINS_FILE)) fs.writeFileSync(PINS_FILE, JSON.stringify([]));
}

function loadPins() {
  ensurePinsFile();
  try {
    return JSON.parse(fs.readFileSync(PINS_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function savePins(pins) {
  ensurePinsFile();
  fs.writeFileSync(PINS_FILE, JSON.stringify(pins, null, 2));
}

function pinSession(name, filePath) {
  const pins = loadPins();
  if (pins.find(p => p.name === name)) {
    throw new Error(`Session "${name}" is already pinned.`);
  }
  const entry = { name, filePath, pinnedAt: new Date().toISOString() };
  pins.push(entry);
  savePins(pins);
  return entry;
}

function unpinSession(name) {
  const pins = loadPins();
  const idx = pins.findIndex(p => p.name === name);
  if (idx === -1) throw new Error(`No pinned session found with name "${name}".`);
  const [removed] = pins.splice(idx, 1);
  savePins(pins);
  return removed;
}

function listPins() {
  return loadPins();
}

function isPinned(name) {
  return loadPins().some(p => p.name === name);
}

module.exports = { loadPins, savePins, pinSession, unpinSession, listPins, isPinned };
