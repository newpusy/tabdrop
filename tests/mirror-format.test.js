const {
  formatMirror,
  formatMirrorList,
  formatMirrorCreated,
  formatMirrorRemoved,
  formatMirrorNotFound,
  formatMirrorSync,
  formatMirrorEmpty,
} = require('../src/mirror-format');

const sampleMirror = { name: 'work', createdAt: '2024-01-01T00:00:00.000Z' };

test('formatMirror includes name and date', () => {
  const out = formatMirror(sampleMirror);
  expect(out).toContain('work');
  expect(out).toContain('2024-01-01');
});

test('formatMirrorList renders multiple entries', () => {
  const out = formatMirrorList([sampleMirror, { name: 'home', createdAt: '2024-02-01T00:00:00.000Z' }]);
  expect(out).toContain('work');
  expect(out).toContain('home');
});

test('formatMirrorList empty returns empty message', () => {
  expect(formatMirrorList([])).toBe(formatMirrorEmpty());
});

test('formatMirrorCreated confirms creation', () => {
  expect(formatMirrorCreated(sampleMirror)).toContain('work');
  expect(formatMirrorCreated(sampleMirror)).toContain('created');
});

test('formatMirrorRemoved confirms removal', () => {
  expect(formatMirrorRemoved('work')).toContain('work');
  expect(formatMirrorRemoved('work')).toContain('removed');
});

test('formatMirrorNotFound signals missing mirror', () => {
  expect(formatMirrorNotFound('ghost')).toContain('ghost');
  expect(formatMirrorNotFound('ghost')).toContain('not found');
});

test('formatMirrorSync shows shared and exclusive urls', () => {
  const sync = {
    shared: ['https://shared.com'],
    onlyInA: ['https://a.com'],
    onlyInB: [],
  };
  const out = formatMirrorSync('work', sync);
  expect(out).toContain('shared: 1');
  expect(out).toContain('https://a.com');
  expect(out).toContain('work');
});

test('formatMirrorSync hides empty sections', () => {
  const sync = { shared: [], onlyInA: [], onlyInB: [] };
  const out = formatMirrorSync('x', sync);
  expect(out).not.toContain('only in A');
  expect(out).not.toContain('only in B');
});
