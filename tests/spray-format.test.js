const { formatSprayResult, formatSprayList, formatSpraySummary, formatSprayUnmatched } = require('../src/spray-format');

const tabs = [
  { title: 'GitHub Repo', url: 'https://github.com/user/repo' },
  { title: 'GitHub Issues', url: 'https://github.com/user/repo/issues' },
];

test('formatSprayResult includes group name and tab titles', () => {
  const out = formatSprayResult('github', tabs);
  expect(out).toContain('Group "github"');
  expect(out).toContain('GitHub Repo');
  expect(out).toContain('GitHub Issues');
});

test('formatSprayList renders multiple groups', () => {
  const results = { github: tabs, docs: [{ title: 'MDN', url: 'https://mdn.com' }] };
  const out = formatSprayList(results);
  expect(out).toContain('github');
  expect(out).toContain('docs');
});

test('formatSprayList returns message when empty', () => {
  expect(formatSprayList({})).toMatch(/no tabs/i);
});

test('formatSpraySummary counts tabs and groups', () => {
  const results = { github: tabs, docs: [{ title: 'MDN' }] };
  const out = formatSpraySummary(results, [{ title: 'Unmatched' }]);
  expect(out).toContain('3 tab(s)');
  expect(out).toContain('2 group(s)');
  expect(out).toContain('1 tab(s) unmatched');
});

test('formatSpraySummary no unmatched message when none', () => {
  const out = formatSpraySummary({ a: [{}] }, []);
  expect(out).not.toContain('unmatched');
});

test('formatSprayUnmatched lists tabs', () => {
  const out = formatSprayUnmatched([{ title: 'Foo', url: 'https://foo.com' }]);
  expect(out).toContain('Unmatched');
  expect(out).toContain('Foo');
});

test('formatSprayUnmatched returns empty string for no unmatched', () => {
  expect(formatSprayUnmatched([])).toBe('');
});
