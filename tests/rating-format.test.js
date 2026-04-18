const { formatStars, formatRating, formatRatingList, formatRatingSet, formatRatingRemoved, formatRatingNotFound } = require('../src/rating-format');

test('formatStars renders correct stars', () => {
  expect(formatStars(3)).toBe('★★★☆☆');
  expect(formatStars(5)).toBe('★★★★★');
  expect(formatStars(1)).toBe('★☆☆☆☆');
});

test('formatRating includes session id and score', () => {
  const out = formatRating('sess1', { score: 4, updatedAt: '2024-01-01' });
  expect(out).toContain('sess1');
  expect(out).toContain('4/5');
});

test('formatRatingList shows empty message', () => {
  expect(formatRatingList({})).toBe('No ratings saved.');
});

test('formatRatingList lists entries', () => {
  const out = formatRatingList({ a: { score: 2, updatedAt: '2024-01-01' } });
  expect(out).toContain('a');
});

test('formatRatingSet confirms rating', () => {
  const out = formatRatingSet('sess1', { score: 5, updatedAt: '' });
  expect(out).toContain('sess1');
  expect(out).toContain('★★★★★');
});

test('formatRatingRemoved confirms removal', () => {
  expect(formatRatingRemoved('sess1')).toContain('sess1');
});

test('formatRatingNotFound returns not found message', () => {
  expect(formatRatingNotFound('sess1')).toContain('No rating found');
});
