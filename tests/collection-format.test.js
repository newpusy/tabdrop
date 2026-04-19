const { formatCollection, formatCollectionList, formatCollectionSet, formatCollectionRemoved, formatCollectionNotFound, formatCollectionAdded, formatCollectionSessionRemoved } = require('../src/collection-format');

const mockCol = { name: 'work', sessionIds: ['a', 'b'], updatedAt: '2024-01-01T00:00:00.000Z' };

test('formatCollection shows name and count', () => {
  const out = formatCollection(mockCol);
  expect(out).toContain('work');
  expect(out).toContain('2 session(s)');
});

test('formatCollection with single session', () => {
  const col = { name: 'solo', sessionIds: ['x'], updatedAt: '2024-01-01T00:00:00.000Z' };
  const out = formatCollection(col);
  expect(out).toContain('solo');
  expect(out).toContain('1 session(s)');
});

test('formatCollectionList empty', () => {
  expect(formatCollectionList([])).toBe('No collections found.');
});

test('formatCollectionList with items', () => {
  const out = formatCollectionList([mockCol]);
  expect(out).toContain('work');
});

test('formatCollectionSet', () => {
  expect(formatCollectionSet('work')).toContain('work');
});

test('formatCollectionRemoved', () => {
  expect(formatCollectionRemoved('work')).toContain('removed');
  expect(formatCollectionRemoved('work')).toContain('work');
});

test('formatCollectionNotFound', () => {
  expect(formatCollectionNotFound('x')).toContain('not found');
  expect(formatCollectionNotFound('x')).toContain('x');
});

test('formatCollectionAdded', () => {
  expect(formatCollectionAdded('work', 's1')).toContain('s1');
  expect(formatCollectionAdded('work', 's1')).toContain('work');
});

test('formatCollectionSessionRemoved', () => {
  expect(formatCollectionSessionRemoved('work', 's1')).toContain('removed');
  expect(formatCollectionSessionRemoved('work', 's1')).toContain('s1');
});
