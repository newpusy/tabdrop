// macro.js — save and run sequences of tabdrop commands as named macros

const fs = require('fs');
const path = require('path');
const os = require('os');

const MACROS_FILE = path.join(os.homedir(), '.tabdrop', 'macros.json');

function ensureMacrosFile() {
  const dir = path.dirname(MACROS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(MACROS_FILE)) fs.writeFileSync(MACROS_FILE, '{}');
}

function loadMacros() {
  ensureMacrosFile();
  try {
    return JSON.parse(fs.readFileSync(MACROS_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function saveMacros(macros) {
  ensureMacrosFile();
  fs.writeFileSync(MACROS_FILE, JSON.stringify(macros, null, 2));
}

// Set a macro: name -> array of command strings
function setMacro(name, steps) {
  if (!name || typeof name !== 'string') throw new Error('Macro name required');
  if (!Array.isArray(steps) || steps.length === 0) throw new Error('Steps must be a non-empty array');
  const macros = loadMacros();
  macros[name] = { steps, createdAt: new Date().toISOString() };
  saveMacros(macros);
  return macros[name];
}

function getMacro(name) {
  const macros = loadMacros();
  return macros[name] || null;
}

function removeMacro(name) {
  const macros = loadMacros();
  if (!macros[name]) return false;
  delete macros[name];
  saveMacros(macros);
  return true;
}

function listMacros() {
  const macros = loadMacros();
  return Object.entries(macros).map(([name, val]) => ({ name, ...val }));
}

// Run a macro by executing each step via the provided runner function
async function runMacro(name, runner) {
  const macro = getMacro(name);
  if (!macro) throw new Error(`Macro not found: ${name}`);
  const results = [];
  for (const step of macro.steps) {
    const result = await runner(step);
    results.push({ step, result });
  }
  return results;
}

module.exports = {
  ensureMacrosFile,
  loadMacros,
  saveMacros,
  setMacro,
  getMacro,
  removeMacro,
  listMacros,
  runMacro
};
