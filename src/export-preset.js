const { ensureTemplatesDir, loadTemplates, saveTemplates } = require('./template');
const path = require('path');
const fs = require('fs');

const PRESETS_FILE = path.join(require('os').homedir(), '.tabdrop', 'export-presets.json');

function ensurePresetsFile() {
  const dir = path.dirname(PRESETS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(PRESETS_FILE)) fs.writeFileSync(PRESETS_FILE, '{}');
}

function loadPresets() {
  ensurePresetsFile();
  return JSON.parse(fs.readFileSync(PRESETS_FILE, 'utf8'));
}

function savePresets(presets) {
  ensurePresetsFile();
  fs.writeFileSync(PRESETS_FILE, JSON.stringify(presets, null, 2));
}

function setPreset(name, options) {
  const presets = loadPresets();
  presets[name] = { name, options, createdAt: new Date().toISOString() };
  savePresets(presets);
  return presets[name];
}

function getPreset(name) {
  const presets = loadPresets();
  return presets[name] || null;
}

function removePreset(name) {
  const presets = loadPresets();
  const existed = !!presets[name];
  delete presets[name];
  savePresets(presets);
  return existed;
}

function listPresets() {
  return Object.values(loadPresets());
}

module.exports = { ensurePresetsFile, loadPresets, savePresets, setPreset, getPreset, removePreset, listPresets };
