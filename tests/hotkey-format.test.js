const {
  formatHotkey,
  formatHotkeyList,
  formatHotkeySet,
  formatHotkeyRemoved,
  formatHotkeyNotFound,
  formatInvalidHotkey,
} = require('../src/hotkey-format');

test('formatHotkey shows key and action', () => {
  const result = formatHotkey('ctrl+s', 'save session');
  expect(result).toContain('ctrl+s');
  expect(result).toContain('save session');
  expect(result).toContain('→');
});

test('formatHotkeyList with entries', () => {
  const hotkeys = { 'ctrl+s': 'save', 'ctrl+e': 'export' };
  const result = formatHotkeyList(hotkeys);
  expect(result).toContain('ctrl+s');
  expect(result).toContain('ctrl+e');
  expect(result).toContain('save');
  expect(result).toContain('export');
});

test('formatHotkeyList empty', () => {
  expect(formatHotkeyList({})).toBe('(no hotkeys set)');
});

test('formatHotkeySet message', () => {
  const result = formatHotkeySet('ctrl+d', 'delete session');
  expect(result).toContain('ctrl+d');
  expect(result).toContain('delete session');
});

test('formatHotkeyRemoved message', () => {
  expect(formatHotkeyRemoved('ctrl+d')).toContain('ctrl+d');
});

test('formatHotkeyNotFound message', () => {
  expect(formatHotkeyNotFound('ctrl+x')).toContain('ctrl+x');
});

test('formatInvalidHotkey message', () => {
  expect(formatInvalidHotkey('badkey')).toContain('badkey');
});
