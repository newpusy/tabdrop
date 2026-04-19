const { formatFlag, formatFlagList, formatFlagSet, formatFlagRemoved, formatFlagNotFound } = require('../src/flag-format');

test('formatFlag shows flags for session', () => {
  const result = formatFlag('s1', ['important', 'review']);
  expect(result).toContain('s1');
  expect(result).toContain('[important]');
  expect(result).toContain('[review]');
});

test('formatFlag handles empty flags', () => {
  expect(formatFlag('s1', [])).toMatch(/No flags/);
});

test('formatFlagList shows all sessions', () => {
  const result = formatFlagList({ s1: ['todo'], s2: ['done'] });
  expect(result).toContain('s1');
  expect(result).toContain('s2');
  expect(result).toContain('[todo]');
});

test('formatFlagList handles empty', () => {
  expect(formatFlagList({})).toMatch(/No flagged/);
});

test('formatFlagSet confirms flag set', () => {
  expect(formatFlagSet('s1', 'important')).toContain('[important]');
  expect(formatFlagSet('s1', 'important')).toContain('s1');
});

test('formatFlagRemoved confirms removal', () => {
  expect(formatFlagRemoved('s1', 'todo')).toContain('[todo]');
});

test('formatFlagNotFound returns not found message', () => {
  expect(formatFlagNotFound('s1', 'missing')).toContain('[missing]');
  expect(formatFlagNotFound('s1', 'missing')).toContain('not found');
});
