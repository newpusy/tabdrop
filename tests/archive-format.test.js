const { formatArchiveEntry, formatArchiveList, formatArchiveSaved, formatArchiveDeleted, formatArchiveNotFound } = require('../src/archive-format');

test('formatArchiveEntry with index', () => {
  expect(formatArchiveEntry('foo.json', 0)).toBe('1. foo.json');
});

test('formatArchiveEntry without index', () => {
  expect(formatArchiveEntry('foo.json')).toBe('foo.json');
});

test('formatArchiveList empty', () => {
  expect(formatArchiveList([])).toBe('No archives found.');
});

test('formatArchiveList with entries', () => {
  const result = formatArchiveList(['a.json', 'b.json']);
  expect(result).toContain('Archives:');
  expect(result).toContain('1. a.json');
  expect(result).toContain('2. b.json');
});

test('formatArchiveSaved', () => {
  expect(formatArchiveSaved('my.json')).toBe('Session archived as: my.json');
});

test('formatArchiveDeleted', () => {
  expect(formatArchiveDeleted('old.json')).toBe('Deleted archive: old.json');
});

test('formatArchiveNotFound', () => {
  expect(formatArchiveNotFound('missing.json')).toBe('Archive not found: missing.json');
});
