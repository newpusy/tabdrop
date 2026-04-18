const { formatLabel, formatLabelList, formatLabelSet, formatLabelRemoved, formatLabelNotFound } = require('../src/label-format');

test('formatLabel', () => {
  expect(formatLabel('abc', 'Work')).toBe('[label] abc: "Work"');
});

test('formatLabelList with entries', () => {
  const result = formatLabelList({ s1: 'Work', s2: 'Play' });
  expect(result).toContain('s1');
  expect(result).toContain('Work');
  expect(result).toContain('s2');
});

test('formatLabelList empty', () => {
  expect(formatLabelList({})).toBe('No labels set.');
});

test('formatLabelSet', () => {
  expect(formatLabelSet('abc', 'Work')).toContain('abc');
  expect(formatLabelSet('abc', 'Work')).toContain('Work');
});

test('formatLabelRemoved', () => {
  expect(formatLabelRemoved('abc')).toContain('abc');
});

test('formatLabelNotFound', () => {
  expect(formatLabelNotFound('xyz')).toContain('xyz');
});
