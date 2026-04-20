'use strict';

const {
  formatMacro,
  formatMacroList,
  formatMacroSet,
  formatMacroRemoved,
  formatMacroNotFound,
  formatMacroRun,
} = require('../src/macro-format');

const sampleMacro = { steps: ['export', 'tag:work', 'archive'] };

test('formatMacro shows name and steps', () => {
  const out = formatMacro('daily', sampleMacro);
  expect(out).toContain('daily');
  expect(out).toContain('export');
  expect(out).toContain('3 steps');
});

test('formatMacro handles single step', () => {
  const out = formatMacro('quick', { steps: ['export'] });
  expect(out).toContain('1 step');
  expect(out).not.toContain('1 steps');
});

test('formatMacroList returns message when empty', () => {
  expect(formatMacroList({})).toBe('No macros defined.');
});

test('formatMacroList lists all macros', () => {
  const out = formatMacroList({ daily: sampleMacro, quick: { steps: ['export'] } });
  expect(out).toContain('daily');
  expect(out).toContain('quick');
});

test('formatMacroSet confirms set', () => {
  const out = formatMacroSet('daily', sampleMacro);
  expect(out).toContain("'daily'");
  expect(out).toContain('3 steps');
});

test('formatMacroRemoved confirms removal', () => {
  expect(formatMacroRemoved('daily')).toBe("Macro 'daily' removed.");
});

test('formatMacroNotFound shows not found', () => {
  expect(formatMacroNotFound('ghost')).toBe("Macro 'ghost' not found.");
});

test('formatMacroRun shows results', () => {
  const results = [
    { step: 'export', ok: true },
    { step: 'tag:work', ok: false, error: 'unknown tag' },
    { step: 'archive', ok: true },
  ];
  const out = formatMacroRun('daily', results);
  expect(out).toContain("Running macro 'daily'");
  expect(out).toContain('✓');
  expect(out).toContain('✗');
  expect(out).toContain('unknown tag');
  expect(out).toContain('2/3 steps succeeded');
});
