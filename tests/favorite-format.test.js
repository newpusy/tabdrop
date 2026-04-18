const { formatFavorite, formatFavoriteList, formatFavoriteAdded, formatFavoriteRemoved, formatFavoriteNotFound } = require('../src/favorite-format');

const mockEntry = {
  name: 'work',
  session: { tabs: [{ title: 'A', url: 'https://a.com' }, { title: 'B', url: 'https://b.com' }] },
  addedAt: '2024-01-15T10:00:00.000Z'
};

test('formatFavorite includes name and tab count', () => {
  const out = formatFavorite(mockEntry);
  expect(out).toContain('work');
  expect(out).toContain('2 tab(s)');
});

test('formatFavoriteList returns message when empty', () => {
  expect(formatFavoriteList([])).toBe('No favorites saved.');
});

test('formatFavoriteList lists entries', () => {
  const out = formatFavoriteList([mockEntry]);
  expect(out).toContain('work');
});

test('formatFavoriteAdded includes name', () => {
  expect(formatFavoriteAdded('work')).toContain('work');
});

test('formatFavoriteRemoved includes name', () => {
  expect(formatFavoriteRemoved('work')).toContain('work');
});

test('formatFavoriteNotFound includes name', () => {
  expect(formatFavoriteNotFound('work')).toContain('work');
});
