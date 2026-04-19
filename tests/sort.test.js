const { sortByTitle, sortByUrl, sortByDate, sortByDomain, sortTabs, sortSession, isValidSortKey, SORT_KEYS } = require('../src/sort');

const tabs = [
  { title: 'Zebra', url: 'https://zebra.com/page', addedAt: '2024-01-03T00:00:00Z' },
  { title: 'Apple', url: 'https://apple.com/page', addedAt: '2024-01-01T00:00:00Z' },
  { title: 'Mango', url: 'https://mango.org/page', addedAt: '2024-01-02T00:00:00Z' },
];

test('sortByTitle returns alphabetical order', () => {
  const result = sortByTitle(tabs);
  expect(result[0].title).toBe('Apple');
  expect(result[2].title).toBe('Zebra');
});

test('sortByUrl sorts by url string', () => {
  const result = sortByUrl(tabs);
  expect(result[0].url).toBe('https://apple.com/page');
});

test('sortByDate sorts newest first', () => {
  const result = sortByDate(tabs);
  expect(result[0].title).toBe('Zebra');
});

test('sortByDomain sorts by hostname', () => {
  const result = sortByDomain(tabs);
  expect(result[0].url).toContain('apple.com');
});

test('sortTabs with reverse flag', () => {
  const result = sortTabs(tabs, 'title', true);
  expect(result[0].title).toBe('Zebra');
});

test('sortTabs throws on invalid key', () => {
  expect(() => sortTabs(tabs, 'invalid')).toThrow('Invalid sort key');
});

test('isValidSortKey', () => {
  expect(isValidSortKey('title')).toBe(true);
  expect(isValidSortKey('foo')).toBe(false);
});

test('sortSession sorts tabs in all windows', () => {
  const session = {
    windows: [
      { tabs: [...tabs] },
      { tabs: [tabs[2], tabs[0]] }
    ]
  };
  const result = sortSession(session, 'title');
  expect(result.windows[0].tabs[0].title).toBe('Apple');
  expect(result.windows[1].tabs[0].title).toBe('Mango');
});

test('SORT_KEYS contains expected values', () => {
  expect(SORT_KEYS).toContain('title');
  expect(SORT_KEYS).toContain('domain');
});
