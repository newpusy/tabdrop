const {
  formatBadge,
  formatBadgeList,
  formatBadgeSet,
  formatBadgeRemoved,
  formatBadgeNotFound,
  formatBadgeInvalid,
  BADGE_ICONS,
} = require('../src/badge-format');

test('formatBadge includes icon, badge name and session id', () => {
  const result = formatBadge('my-session', 'starred');
  expect(result).toContain('starred');
  expect(result).toContain('my-session');
  expect(result).toContain(BADGE_ICONS['starred']);
});

test('formatBadgeList returns message when empty', () => {
  expect(formatBadgeList({})).toBe('No badges set.');
});

test('formatBadgeList lists all entries', () => {
  const result = formatBadgeList({ 'sess-1': 'new', 'sess-2': 'done' });
  expect(result).toContain('sess-1');
  expect(result).toContain('sess-2');
  expect(result).toContain('new');
  expect(result).toContain('done');
});

test('formatBadgeSet confirms badge assignment', () => {
  const result = formatBadgeSet('abc', 'draft');
  expect(result).toContain('draft');
  expect(result).toContain('abc');
});

test('formatBadgeRemoved mentions session id', () => {
  const result = formatBadgeRemoved('abc');
  expect(result).toContain('abc');
});

test('formatBadgeNotFound warns about missing badge', () => {
  const result = formatBadgeNotFound('xyz');
  expect(result).toContain('xyz');
});

test('formatBadgeInvalid lists valid options', () => {
  const result = formatBadgeInvalid('foo', ['new', 'done']);
  expect(result).toContain('foo');
  expect(result).toContain('new');
  expect(result).toContain('done');
});
