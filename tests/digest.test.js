const { topDomains, tabStats, buildDigest, compareDigests } = require('../src/digest');
const { formatDigest, formatDigestCompare, formatDigestEmpty } = require('../src/digest-format');

const makeTabs = urls =>
  urls.map((url, i) => ({ id: i + 1, url, title: `Tab ${i + 1}`, windowId: 1 }));

const session = {
  name: 'work',
  createdAt: '2024-01-01T00:00:00.000Z',
  tabs: makeTabs([
    'https://github.com/foo',
    'https://github.com/bar',
    'https://news.ycombinator.com',
    'https://www.google.com/search?q=test',
    'https://github.com/baz',
  ]),
};

test('topDomains counts correctly', () => {
  const result = topDomains(session.tabs);
  expect(result[0]).toEqual({ domain: 'github.com', count: 3 });
  expect(result.length).toBeLessThanOrEqual(5);
});

test('topDomains strips www', () => {
  const tabs = makeTabs(['https://www.google.com', 'https://google.com']);
  const result = topDomains(tabs);
  expect(result[0].domain).toBe('google.com');
  expect(result[0].count).toBe(2);
});

test('tabStats returns correct counts', () => {
  const stats = tabStats(session);
  expect(stats.tabCount).toBe(5);
  expect(stats.uniqueUrls).toBe(5);
  expect(stats.windowCount).toBe(1);
});

test('buildDigest includes name and topDomains', () => {
  const digest = buildDigest(session);
  expect(digest.name).toBe('work');
  expect(digest.tabCount).toBe(5);
  expect(digest.topDomains[0].domain).toBe('github.com');
});

test('compareDigests computes deltas', () => {
  const a = buildDigest({ ...session, tabs: makeTabs(['https://a.com', 'https://b.com']) });
  const b = buildDigest(session);
  const delta = compareDigests(a, b);
  expect(delta.tabDelta).toBe(3);
  expect(delta.newDomains).toContain('github.com');
});

test('formatDigest renders session info', () => {
  const out = formatDigest(buildDigest(session));
  expect(out).toContain('work');
  expect(out).toContain('github.com');
  expect(out).toContain('Tabs');
});

test('formatDigestCompare shows sign', () => {
  const delta = { tabDelta: 2, windowDelta: 0, uniqueUrlDelta: -1, newDomains: ['x.com'] };
  const out = formatDigestCompare(delta);
  expect(out).toContain('+2');
  expect(out).toContain('-1');
  expect(out).toContain('x.com');
});

test('formatDigestEmpty returns message', () => {
  expect(formatDigestEmpty()).toMatch(/no digest/i);
});
