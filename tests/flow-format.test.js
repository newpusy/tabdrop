const {
  formatFlow,
  formatFlowList,
  formatFlowSet,
  formatFlowRemoved,
  formatFlowNotFound,
  formatFlowResult,
} = require('../src/flow-format');

const sampleFlow = {
  name: 'cleanup',
  steps: [{ op: 'dedupe' }, { op: 'sort', args: { by: 'title' } }],
  updatedAt: '2024-01-01T00:00:00.000Z',
};

test('formatFlow includes name and steps', () => {
  const out = formatFlow(sampleFlow);
  expect(out).toContain('cleanup');
  expect(out).toContain('dedupe');
  expect(out).toContain('sort');
});

test('formatFlowList shows all flows', () => {
  const out = formatFlowList([sampleFlow, { name: 'other', steps: [{ op: 'limit' }] }]);
  expect(out).toContain('cleanup');
  expect(out).toContain('other');
});

test('formatFlowList handles empty', () => {
  expect(formatFlowList([])).toBe('No flows saved.');
});

test('formatFlowSet includes name', () => {
  expect(formatFlowSet('mypipe')).toContain('mypipe');
});

test('formatFlowRemoved includes name', () => {
  expect(formatFlowRemoved('mypipe')).toContain('mypipe');
});

test('formatFlowNotFound includes name', () => {
  expect(formatFlowNotFound('ghost')).toContain('ghost');
});

test('formatFlowResult shows step results', () => {
  const log = [{ step: 'dedupe', ok: true }, { step: 'bad', ok: false, error: 'unknown op' }];
  const out = formatFlowResult('cleanup', log);
  expect(out).toContain('cleanup');
  expect(out).toContain('✓');
  expect(out).toContain('✗');
  expect(out).toContain('unknown op');
});
