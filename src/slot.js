const fs = require('fs');
const path = require('path');
const os = require('os');

const SLOTS_DIR = path.join(os.homedir(), '.tabdrop', 'slots');

function ensureSlotsDir() {
  if (!fs.existsSync(SLOTS_DIR)) fs.mkdirSync(SLOTS_DIR, { recursive: true });
}

function slotPath(name) {
  return path.join(SLOTS_DIR, `${name}.json`);
}

function loadSlots() {
  ensureSlotsDir();
  const files = fs.readdirSync(SLOTS_DIR).filter(f => f.endsWith('.json'));
  const slots = {};
  for (const f of files) {
    const name = f.replace(/\.json$/, '');
    try {
      slots[name] = JSON.parse(fs.readFileSync(path.join(SLOTS_DIR, f), 'utf8'));
    } catch {}
  }
  return slots;
}

function saveSlot(name, session) {
  ensureSlotsDir();
  fs.writeFileSync(slotPath(name), JSON.stringify({ name, session, savedAt: new Date().toISOString() }, null, 2));
}

function getSlot(name) {
  const p = slotPath(name);
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
}

function removeSlot(name) {
  const p = slotPath(name);
  if (!fs.existsSync(p)) return false;
  fs.unlinkSync(p);
  return true;
}

function listSlots() {
  const slots = loadSlots();
  return Object.values(slots).sort((a, b) => a.savedAt.localeCompare(b.savedAt));
}

function slotExists(name) {
  return fs.existsSync(slotPath(name));
}

module.exports = { ensureSlotsDir, slotPath, loadSlots, saveSlot, getSlot, removeSlot, listSlots, slotExists };
