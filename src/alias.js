const fs = require('fs');
const path = require('path');

const ALIAS_FILE = path.join(require('os').homedir(), '.tabdrop', 'aliases.json');

function ensureAliasFile() {
  const dir = path.dirname(ALIAS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(ALIAS_FILE)) fs.writeFileSync(ALIAS_FILE, JSON.stringify({}));
}

function loadAliases() {
  ensureAliasFile();
  return JSON.parse(fs.readFileSync(ALIAS_FILE, 'utf8'));
}

function saveAliases(aliases) {
  ensureAliasFile();
  fs.writeFileSync(ALIAS_FILE, JSON.stringify(aliases, null, 2));
}

function setAlias(name, target) {
  if (!name || typeof name !== 'string' || !/^[\w-]+$/.test(name)) {
    throw new Error(`Invalid alias name: "${name}"`);
  }
  const aliases = loadAliases();
  aliases[name] = target;
  saveAliases(aliases);
  return aliases;
}

function removeAlias(name) {
  const aliases = loadAliases();
  if (!aliases[name]) throw new Error(`Alias not found: "${name}"`);
  delete aliases[name];
  saveAliases(aliases);
  return aliases;
}

function resolveAlias(name) {
  const aliases = loadAliases();
  return aliases[name] || null;
}

function listAliases() {
  return loadAliases();
}

module.exports = { ensureAliasFile, loadAliases, saveAliases, setAlias, removeAlias, resolveAlias, listAliases };
