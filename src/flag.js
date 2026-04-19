const fs = require('fs');
const path = require('path');

const FLAGS_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'flags.json');

function ensureFlagsFile() {
  const dir = path.dirname(FLAGS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(FLAGS_FILE)) fs.writeFileSync(FLAGS_FILE, '{}');
}

function loadFlags() {
  ensureFlagsFile();
  return JSON.parse(fs.readFileSync(FLAGS_FILE, 'utf8'));
}

function saveFlags(flags) {
  ensureFlagsFile();
  fs.writeFileSync(FLAGS_FILE, JSON.stringify(flags, null, 2));
}

function setFlag(sessionId, flag) {
  const flags = loadFlags();
  if (!flags[sessionId]) flags[sessionId] = [];
  if (!flags[sessionId].includes(flag)) flags[sessionId].push(flag);
  saveFlags(flags);
  return flags[sessionId];
}

function removeFlag(sessionId, flag) {
  const flags = loadFlags();
  if (!flags[sessionId]) return [];
  flags[sessionId] = flags[sessionId].filter(f => f !== flag);
  if (flags[sessionId].length === 0) delete flags[sessionId];
  saveFlags(flags);
  return flags[sessionId] || [];
}

function getFlags(sessionId) {
  const flags = loadFlags();
  return flags[sessionId] || [];
}

function listAllFlags() {
  return loadFlags();
}

function clearFlags(sessionId) {
  const flags = loadFlags();
  delete flags[sessionId];
  saveFlags(flags);
}

module.exports = { ensureFlagsFile, loadFlags, saveFlags, setFlag, removeFlag, getFlags, listAllFlags, clearFlags };
