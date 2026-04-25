const { setView, getView, removeView, listViews, applyView, isValidField, VALID_FIELDS } = require('../src/view');
const fs = require('fs');
const path = require('path');

const VIEWS_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'views.json');
function clearViews() { if (fs.existsSync(VIEWS_FILE)) fs.writeFileSync(VIEWS_FILE, JSON.stringify({})); }

beforeEach(() => clearViews());
after(() => clearViews());

test('isValidField accepts known fields', () => {
  expect(isValidField('title')).toBe(true);
  expect(isValidField('url')).toBe(true);
  expect(isValidField('domain')).toBe(true);
});

test('isValidField rejects unknown fields', () => {
  expect(isValidField('color')).toBe(false);
  expect(isValidField('')).toBe(false);
});

test('setView stores a view', () => {
  const v = setView('compact', ['title', 'url']);
  expect(v.name).toBe('compact');
  expect(v.fields).toEqual(['title', 'url']);
  expect(v.createdAt).toBeTruthy();
});

test('setView throws on invalid fields', () => {
  expect(() => setView('bad', ['title', 'nope'])).toThrow('Invalid fields');
});

test('getView returns null for missing view', () => {
  expect(getView('ghost')).toBeNull();
});

test('getView returns saved view', () => {
  setView('full', ['title', 'url', 'domain']);
  const v = getView('full');
  expect(v.fields).toContain('domain');
});

test('removeView returns false for missing', () => {
  expect(removeView('nope')).toBe(false);
});

test('removeView deletes view', () => {
  setView('tmp', ['title']);
  expect(removeView('tmp')).toBe(true);
  expect(getView('tmp')).toBeNull();
});

test('listViews returns all views', () => {
  setView('a', ['title']);
  setView('b', ['url']);
  const list = listViews();
  expect(list.length).toBe(2);
  expect(list.map(v => v.name)).toContain('a');
});

test('applyView filters tab fields', () => {
  setView('urls-only', ['url']);
  const session = {
    windows: [{ tabs: [{ title: 'Google', url: 'https://google.com' }] }]
  };
  const result = applyView(session, 'urls-only');
  expect(result.windows[0].tabs[0].url).toBe('https://google.com');
  expect(result.windows[0].tabs[0].title).toBeUndefined();
  expect(result._view).toBe('urls-only');
});

test('applyView returns session unchanged if view not found', () => {
  const session = { windows: [{ tabs: [{ title: 'x', url: 'y' }] }] };
  expect(applyView(session, 'missing')).toEqual(session);
});
