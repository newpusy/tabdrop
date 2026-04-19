const { formatShare, formatShareList, formatShareCreated, formatShareRemoved, formatShareNotFound, formatShareExpired } = require('../src/share-format');

const share = {
  id: 'abc123',
  name: 'my-share',
  expiresAt: null,
  note: null
};

test('formatShare basic', () => {
  expect(formatShare(share)).toContain('abc123');
  expect(formatShare(share)).toContain('my-share');
});

test('formatShare with expiry', () => {
  const s = { ...share, expiresAt: '2099-01-15T00:00:00.000Z' };
  expect(formatShare(s)).toContain('2099-01-15');
});

test('formatShare with note', () => {
  const s = { ...share, note: 'for team' };
  expect(formatShare(s)).toContain('for team');
});

test('formatShareList empty', () => {
  expect(formatShareList([])).toBe('No shares found.');
});

test('formatShareList multiple', () => {
  const s2 = { ...share, id: 'xyz', name: 'other' };
  const out = formatShareList([share, s2]);
  expect(out).toContain('abc123');
  expect(out).toContain('xyz');
});

test('formatShareCreated', () => {
  expect(formatShareCreated(share)).toContain('abc123');
  expect(formatShareCreated(share)).toContain('my-share');
});

test('formatShareRemoved', () => {
  expect(formatShareRemoved('abc123')).toContain('abc123');
});

test('formatShareNotFound', () => {
  expect(formatShareNotFound('nope')).toContain('nope');
});

test('formatShareExpired', () => {
  const s = { ...share, expiresAt: '2020-06-01T00:00:00.000Z' };
  expect(formatShareExpired(s)).toContain('2020-06-01');
});
