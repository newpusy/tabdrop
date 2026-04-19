const { foldByDomain, foldByWindow, unfoldToSession, describeFolded } = require('../src/fold');
const { formatFoldedList, formatFoldSummary } = require('../src/fold-format');

const session = {
  windows: [
    {
      tabs: [
        { url: 'https://github.com/foo', title: 'Foo' },
        { url: 'https://github.com/bar', title: 'Bar' },
        { url: 'https://news.ycombinator.com/', title: 'HN' }
      ]
    }
  ]
};

test('foldByDomain groups tabs by hostname', () => {
  const folded = foldByDomain(session);
  expect(folded['github.com']).toHaveLength(2);
  expect(folded['news.ycombinator.com']).toHaveLength(1);
});

test('foldByWindow returns per-window info', () => {
  const result = foldByWindow(session);
  expect(result).toHaveLength(1);
  expect(result[0].count).toBe(3);
});

test('unfoldToSession flattens folded back into session', () => {
  const folded = foldByDomain(session);
  const restored = unfoldToSession(folded);
  expect(restored.windows[0].tabs).toHaveLength(3);
});

test('describeFolded returns domain/count/titles', () => {
  const folded = foldByDomain(session);
  const desc = describeFolded(folded);
  const gh = desc.find(d => d.domain === 'github.com');
  expect(gh.count).toBe(2);
  expect(gh.titles).toContain('Foo');
});

test('formatFoldedList formats all groups', () => {
  const folded = foldByDomain(session);
  const desc = describeFolded(folded);
  const out = formatFoldedList(desc);
  expect(out).toContain('github.com');
  expect(out).toContain('2 tabs');
});

test('formatFoldSummary shows totals', () => {
  const folded = foldByDomain(session);
  const desc = describeFolded(folded);
  const out = formatFoldSummary(desc);
  expect(out).toContain('2 domain groups');
  expect(out).toContain('3 tabs total');
});

test('formatFoldedList returns message when empty', () => {
  expect(formatFoldedList([])).toBe('No folded groups.');
});
