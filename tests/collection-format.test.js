const { formatCollection, formatCollectionList, formatCollectionSet, formatCollectionRemoved, formatCollectionNotFound, formatCollectionAdded, formatCollectionSessionRemoved } = require('../src/collection-format');

const mockCol = { name: 'work', sessionIds: ['a', 'b'], updatedAt: '2024-01-01T00:00:00.000Z' };

test('formatCollection shows name and count', () => {
  const out = formatCollection(mockCol);
  expect(out).toContain('work');
  expect(out).toContain('2 session(s)');
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
});

test('formatCollectionNotFound', () => {
  expect(formatCollectionNotFound('x')).toContain('not found');
});

test('formatCollectionAdded', () => {
  expect(formatCollectionAdded('work', 's1')).toContain('s1');
  expect(formatCollectionAdded('work', 's1')).toContain('work');
});

test('formatCollectionSessionRemoved', () => {
  expect(formatCollectionSessionRemoved('work', 's1')).toContain('removed');
});
