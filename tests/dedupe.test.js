const { normalizeUrl, dedupeSession, findDuplicates, mergeSessions } = require('../src/dedupe');

const makeSession = (tabLists) => ({
  title: 'Test',
  date: new Date().toISOString(),
  windows: tabLists.map((tabs, i) => ({ id: i + 1, tabs }))
});

const tab = (url, title = 'Page') => ({ url, title });

describe('normalizeUrl', () => {
  test('strips fragment', () => {
    expect(normalizeUrl('https://example.com/page#section')).toBe('https://example.com/page');
  });
  test('strips trailing slash', () => {
    expect(normalizeUrl('https://example.com/')).toBe('https://example.com');
  });
  test('handles invalid url gracefully', () => {
    expect(normalizeUrl('not-a-url')).toBe('not-a-url');
  });
});

describe('findDuplicates', () => {
  test('finds duplicate URLs across windows', () => {
    const session = makeSession([
      [tab('https://a.com'), tab('https://b.com')],
      [tab('https://a.com'), tab('https://c.com')]
    ]);
    const dupes = findDuplicates(session);
    expect(dupes).toContain('https://a.com');
    expect(dupes).toHaveLength(1);
  });

  test('returns empty when no duplicates', () => {
    const session = makeSession([[tab('https://a.com'), tab('https://b.com')]]);
    expect(findDuplicates(session)).toHaveLength(0);
  });
});

describe('dedupeSession', () => {
  test('removes duplicate tabs', () => {
    const session = makeSession([
      [tab('https://a.com'), tab('https://a.com'), tab('https://b.com')]
    ]);
    const result = dedupeSession(session);
    expect(result.windows[0].tabs).toHaveLength(2);
  });

  test('does not mutate original session', () => {
    const session = makeSession([[tab('https://a.com'), tab('https://a.com')]]);
    dedupeSession(session);
    expect(session.windows[0].tabs).toHaveLength(2);
  });
});

describe('mergeSessions', () => {
  test('merges unique tabs from sessionB into sessionA', () => {
    const a = makeSession([[tab('https://a.com')]]);
    const b = makeSession([[tab('https://a.com'), tab('https://b.com')]]);
    const merged = mergeSessions(a, b);
    const allTabs = merged.windows.flatMap(w => w.tabs);
    const urls = allTabs.map(t => t.url);
    expect(urls).toContain('https://b.com');
    expect(urls.filter(u => u === 'https://a.com')).toHaveLength(1);
  });

  test('no new window added if nothing new', () => {
    const a = makeSession([[tab('https://a.com')]]);
    const b = makeSession([[tab('https://a.com')]]);
    const merged = mergeSessions(a, b);
    expect(merged.windows).toHaveLength(1);
  });
});
