// view.js — named view presets (column/display config) for sessions

const fs = require('fs');
const path = require('path');

const VIEWS_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'views.json');

function ensureViewsFile() {
  const dir = path.dirname(VIEWS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(VIEWS_FILE)) fs.writeFileSync(VIEWS_FILE, JSON.stringify({}));
}

function loadViews() {
  ensureViewsFile();
  return JSON.parse(fs.readFileSync(VIEWS_FILE, 'utf8'));
}

function saveViews(views) {
  ensureViewsFile();
  fs.writeFileSync(VIEWS_FILE, JSON.stringify(views, null, 2));
}

const VALID_FIELDS = ['title', 'url', 'domain', 'window', 'tags', 'date', 'priority', 'rating'];

function isValidField(field) {
  return VALID_FIELDS.includes(field);
}

function setView(name, fields) {
  if (!name || typeof name !== 'string') throw new Error('View name required');
  const invalid = fields.filter(f => !isValidField(f));
  if (invalid.length) throw new Error(`Invalid fields: ${invalid.join(', ')}`);
  const views = loadViews();
  views[name] = { name, fields, createdAt: views[name]?.createdAt || new Date().toISOString() };
  saveViews(views);
  return views[name];
}

function getView(name) {
  const views = loadViews();
  return views[name] || null;
}

function removeView(name) {
  const views = loadViews();
  if (!views[name]) return false;
  delete views[name];
  saveViews(views);
  return true;
}

function listViews() {
  return Object.values(loadViews());
}

function applyView(session, viewName) {
  const view = getView(viewName);
  if (!view) return session;
  const fields = view.fields;
  const windows = session.windows.map(win => ({
    ...win,
    tabs: win.tabs.map(tab => {
      const out = {};
      if (fields.includes('title')) out.title = tab.title;
      if (fields.includes('url')) out.url = tab.url;
      if (fields.includes('domain')) out.domain = (tab.url || '').replace(/https?:\/\/([^/]+).*/, '$1');
      return out;
    })
  }));
  return { ...session, windows, _view: viewName };
}

module.exports = { ensureViewsFile, loadViews, saveViews, isValidField, setView, getView, removeView, listViews, applyView, VALID_FIELDS };
