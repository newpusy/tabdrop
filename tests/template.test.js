const fs = require('fs');
const os = require('os');
const path = require('path');

jest.mock('os', () => ({ homedir: () => '/tmp/tabdrop-test-template' }));

const { setTemplate, getTemplate, removeTemplate, listTemplates } = require('../src/template');
const { formatTemplate, formatTemplateList, formatTemplateSet, formatTemplateRemoved, formatTemplateNotFound } = require('../src/template-format');

const TEMPLATES_DIR = path.join('/tmp/tabdrop-test-template', '.tabdrop', 'templates');

afterEach(() => {
  const file = path.join(TEMPLATES_DIR, 'templates.json');
  if (fs.existsSync(file)) fs.unlinkSync(file);
});

test('setTemplate saves a template', () => {
  const tpl = setTemplate('work', ['https://github.com', 'https://jira.example.com']);
  expect(tpl.name).toBe('work');
  expect(tpl.urls).toHaveLength(2);
  expect(tpl.createdAt).toBeDefined();
});

test('getTemplate retrieves saved template', () => {
  setTemplate('research', ['https://arxiv.org']);
  const tpl = getTemplate('research');
  expect(tpl).not.toBeNull();
  expect(tpl.urls[0]).toBe('https://arxiv.org');
});

test('getTemplate returns null for missing template', () => {
  expect(getTemplate('nope')).toBeNull();
});

test('removeTemplate deletes a template', () => {
  setTemplate('tmp', ['https://example.com']);
  expect(removeTemplate('tmp')).toBe(true);
  expect(getTemplate('tmp')).toBeNull();
});

test('removeTemplate returns false if not found', () => {
  expect(removeTemplate('ghost')).toBe(false);
});

test('listTemplates returns all templates', () => {
  setTemplate('a', ['https://a.com']);
  setTemplate('b', ['https://b.com', 'https://c.com']);
  const list = listTemplates();
  expect(list).toHaveLength(2);
});

test('setTemplate throws on invalid input', () => {
  expect(() => setTemplate('', ['https://x.com'])).toThrow();
  expect(() => setTemplate('x', [])).toThrow();
});

test('formatTemplateSet returns confirmation message', () => {
  expect(formatTemplateSet('work', ['a', 'b'])).toContain('work');
});

test('formatTemplateList handles empty list', () => {
  expect(formatTemplateList([])).toBe('No templates saved.');
});

test('formatTemplateRemoved includes name', () => {
  expect(formatTemplateRemoved('work')).toContain('work');
});

test('formatTemplateNotFound includes name', () => {
  expect(formatTemplateNotFound('missing')).toContain('missing');
});
