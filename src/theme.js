const fs = require('fs');
const path = require('path');

const THEMES_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'themes.json');

const BUILT_IN_THEMES = {
  default: { primary: 'cyan', accent: 'yellow', muted: 'gray', success: 'green', error: 'red' },
  dark:    { primary: 'blue', accent: 'magenta', muted: 'gray', success: 'green', error: 'red' },
  light:   { primary: 'blue', accent: 'cyan', muted: 'white', success: 'green', error: 'red' },
  minimal: { primary: 'white', accent: 'white', muted: 'gray', success: 'white', error: 'red' },
};

function ensureThemesFile() {
  const dir = path.dirname(THEMES_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(THEMES_FILE)) fs.writeFileSync(THEMES_FILE, JSON.stringify({ active: 'default', custom: {} }));
}

function loadThemes() {
  ensureThemesFile();
  return JSON.parse(fs.readFileSync(THEMES_FILE, 'utf8'));
}

function saveThemes(data) {
  ensureThemesFile();
  fs.writeFileSync(THEMES_FILE, JSON.stringify(data, null, 2));
}

function setActiveTheme(name) {
  const data = loadThemes();
  const all = { ...BUILT_IN_THEMES, ...data.custom };
  if (!all[name]) return false;
  data.active = name;
  saveThemes(data);
  return true;
}

function getActiveTheme() {
  const data = loadThemes();
  const all = { ...BUILT_IN_THEMES, ...data.custom };
  return all[data.active] || BUILT_IN_THEMES.default;
}

function setCustomTheme(name, colors) {
  const data = loadThemes();
  data.custom[name] = colors;
  saveThemes(data);
}

function removeCustomTheme(name) {
  const data = loadThemes();
  if (!data.custom[name]) return false;
  delete data.custom[name];
  if (data.active === name) data.active = 'default';
  saveThemes(data);
  return true;
}

function listThemes() {
  const data = loadThemes();
  const all = { ...BUILT_IN_THEMES, ...data.custom };
  return { themes: all, active: data.active };
}

module.exports = { loadThemes, saveThemes, setActiveTheme, getActiveTheme, setCustomTheme, removeCustomTheme, listThemes, BUILT_IN_THEMES };
