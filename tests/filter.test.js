const { filterByDomain, filterByTitle, filterByTabCount, filterByWindowCount, applyFilters } = require('../src/filter');

const sessions = [
  {
    id: 'a', name: 'work',
    windows: [
      { tabs: [
        { url: 'https://github.com/foo', title: 'GitHub Foo' },
        { url: 'https://github.com/bar', title: 'GitHub Bar' }
      ]},
      { tabs: [
        { url: 'https://notion.so/page', title: 'Notion Page' }
      ]}
    ]
  },
  {
    id: 'b', name: 'personal',
    windows: [
      { tabs: [
        { url: 'https://reddit.com/r/programming', title: 'Reddit Programming' }
      ]}
    ]
  }
];

test('filterByDomain filters tabs by domain', () => {
  const result = filterByDomain(sessions, 'github.com');
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe('a');
  expect(result[0].windows[0].tabs).toHaveLength(2);
});

test('filterByTitle filters tabs by title', () => {
  const result = filterByTitle(sessions, 'notion');
  expect(result).toHaveLength(1);
  expect(result[0].windows[0].tabs[0].title).toBe('Notion Page');
});

test('filterByTabCount min', () => {
  const result = filterByTabCount(sessions, 2);
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe('a');
});

test('filterByTabCount max', () => {
  const result = filterByTabCount(sessions, undefined, 1);
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe('b');
});

test('filterByWindowCount', () => {
  const result = filterByWindowCount(sessions, 2);
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe('a');
});

test('applyFilters combines filters', () => {
  const result = applyFilters(sessions, { domain: 'github.com', minTabs: 1 });
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe('a');
});

test('applyFilters returns empty when nothing matches', () => {
  const result = applyFilters(sessions, { domain: 'nonexistent.xyz' });
  expect(result).toHaveLength(0);
});
