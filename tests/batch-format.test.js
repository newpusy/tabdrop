const { formatBatchSummary, formatBatchResult, formatBatchList, formatBatchEmpty, formatBatchError } = require('../src/batch-format');

test('formatBatchSummary shows count', () => {
  expect(formatBatchSummary(3, 5)).toMatch(/3\/5/);
});

test('formatBatchResult ok shows checkmark', () => {
  expect(formatBatchResult('abc', 'ok')).toContain('✓');
});

test('formatBatchResult fail shows x', () => {
  expect(formatBatchResult('abc', 'fail')).toContain('✗');
});

test('formatBatchList renders all results', () => {
  const results = [{ id: 'a', result: 'x' }, { id: 'b', result: null }];
  const out = formatBatchList(results);
  expect(out).toContain('a');
  expect(out).toContain('b');
});

test('formatBatchEmpty returns message', () => {
  expect(formatBatchEmpty()).toBeTruthy();
});

test('formatBatchError includes id and error', () => {
  const out = formatBatchError('sess1', 'not found');
  expect(out).toContain('sess1');
  expect(out).toContain('not found');
});
