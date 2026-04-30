const fs = require('fs');
const path = require('path');

const PULSE_DIR = path.join(process.env.HOME || '.', '.tabdrop', 'pulse');
const PULSE_FILE = path.join(PULSE_DIR, 'pulse.json');

function ensurePulseFile() {
  if (!fs.existsSync(PULSE_DIR)) fs.mkdirSync(PULSE_DIR, { recursive: true });
  if (!fs.existsSync(PULSE_FILE)) fs.writeFileSync(PULSE_FILE, JSON.stringify([]));
}

function loadPulse() {
  ensurePulseFile();
  return JSON.parse(fs.readFileSync(PULSE_FILE, 'utf8'));
}

function savePulse(entries) {
  ensurePulseFile();
  fs.writeFileSync(PULSE_FILE, JSON.stringify(entries, null, 2));
}

function recordPulse(sessionId, action, meta = {}) {
  const entries = loadPulse();
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    sessionId,
    action,
    meta,
    timestamp: new Date().toISOString()
  };
  entries.push(entry);
  savePulse(entries);
  return entry;
}

function getPulse(sessionId) {
  const entries = loadPulse();
  return sessionId ? entries.filter(e => e.sessionId === sessionId) : entries;
}

function clearPulse(sessionId) {
  if (sessionId) {
    const entries = loadPulse().filter(e => e.sessionId !== sessionId);
    savePulse(entries);
  } else {
    savePulse([]);
  }
}

function pulseSummary(sessionId) {
  const entries = getPulse(sessionId);
  const counts = {};
  for (const e of entries) {
    counts[e.action] = (counts[e.action] || 0) + 1;
  }
  return { total: entries.length, counts, latest: entries[entries.length - 1] || null };
}

module.exports = { ensurePulseFile, loadPulse, savePulse, recordPulse, getPulse, clearPulse, pulseSummary };
