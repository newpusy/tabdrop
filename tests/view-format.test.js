const { formatView, formatViewList, formatViewSet, formatViewRemoved, formatViewNotFound, formatViewApplied } = require('../src/view-format');

const sampleView = { name: 'compact', fields: ['title', 'url'] };

test('formatView shows name and fields', () => {
  const out = formatView(sampleView);
  expect(out).toContain('compact');
  expect(out).toContain('title');
  expect(out).toContain('url');
});

test('formatViewList empty', () => {
  expect(formatViewList([])).toMatch(/no views/i);
});

test('formatViewList shows all views', () => {
  const out = formatViewList([sampleView, { name: 'full', fields: ['title', 'url', 'domain'] }]);
  expect(out).toContain('compact');
  expect(out).toContain('full');
});

test('formatViewSet confirms save', () => {
  expect(formatViewSet(sampleView)).toContain('compact');
  expect(formatViewSet(sampleView)).toContain('title');
});

test('formatViewRemoved mentions name', () => {
  expect(formatViewRemoved('compact')).toContain('compact');
});

test('formatViewNotFound mentions name', () => {
  expect(formatViewNotFound('ghost')).toContain('ghost');
});

test('formatViewApplied shows view name and count', () => {
  const out = formatViewApplied('compact', 5);
  expect(out).toContain('compact');
  expect(out).toContain('5');
});
