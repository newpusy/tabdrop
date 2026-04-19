const { formatShortcut, formatShortcutList, formatShortcutSet, formatShortcutRemoved, formatShortcutNotFound } = require('../src/shortcut-format');

test('formatShortcut', () => {
  expect(formatShortcut('w', 'work')).toBe('[w] → work');
});

test('formatShortcutList with entries', () => {
  const result = formatShortcutList({ w: 'work', h: 'home' });
  expect(result).toContain('[w] → work');
  expect(result).toContain('[h] → home');
});

test('formatShortcutList empty', () => {
  expect(formatShortcutList({})).toBe('No shortcuts defined.');
});

test('formatShortcutSet', () => {
  expect(formatShortcutSet('x', 'session-x')).toContain('session-x');
});

test('formatShortcutRemoved', () => {
  expect(formatShortcutRemoved('x')).toContain('x');
});

test('formatShortcutNotFound', () => {
  expect(formatShortcutNotFound('z')).toContain('z');
});
