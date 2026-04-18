const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(require('os').homedir(), '.tabdrop', 'templates');

function ensureTemplatesDir() {
  if (!fs.existsSync(TEMPLATES_DIR)) {
    fs.mkdirSync(TEMPLATES_DIR, { recursive: true });
  }
}

function loadTemplates() {
  ensureTemplatesDir();
  const file = path.join(TEMPLATES_DIR, 'templates.json');
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function saveTemplates(templates) {
  ensureTemplatesDir();
  const file = path.join(TEMPLATES_DIR, 'templates.json');
  fs.writeFileSync(file, JSON.stringify(templates, null, 2));
}

function setTemplate(name, urls) {
  if (!name || typeof name !== 'string') throw new Error('Invalid template name');
  if (!Array.isArray(urls) || urls.length === 0) throw new Error('Template must have at least one URL');
  const templates = loadTemplates();
  templates[name] = { name, urls, createdAt: new Date().toISOString() };
  saveTemplates(templates);
  return templates[name];
}

function getTemplate(name) {
  const templates = loadTemplates();
  return templates[name] || null;
}

function removeTemplate(name) {
  const templates = loadTemplates();
  if (!templates[name]) return false;
  delete templates[name];
  saveTemplates(templates);
  return true;
}

function listTemplates() {
  const templates = loadTemplates();
  return Object.values(templates);
}

module.exports = { ensureTemplatesDir, loadTemplates, saveTemplates, setTemplate, getTemplate, removeTemplate, listTemplates };
