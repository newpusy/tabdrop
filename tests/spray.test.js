const { sprayByPatterns, sprayByDomain, matchPattern, describeSpray } = require('../src/spray');

const session = {
  tabs: [
    { title: 'GitHub Repo', url: 'https://github.com/user/repo' },
    { title: 'Google Search', url: 'https://google.com/search?q=test' },
    { title: 'GitHub Issues', url: 'https://github.com/user/repo/issues' },
    { title: 'MDN Docs', url: 'https://developer.mozilla.org/docs' },
    { title: 'No URL tab', url: 'about:blank' },
  ]
};

test('matchPattern matches url', () => {
  expect(matchPattern({ url: 'https://github.com' }, 'github')).toBe(true);
});

test('matchPattern matches title', () => {
  expect(matchPattern({ title: 'Google Search', url: '' }, 'google')).toBe(true);
});

test('matchPattern returns false on no match', () => {
  expect(matchPattern({ title: 'Foo', url: 'https://foo.com' }, 'github')).toBe(false);
});

test('sprayByPatterns groups tabs correctly', () => {
  const patterns = [
    { name: 'github', pattern: 'github' },
    { name: 'google', pattern: 'google' },
  ];
  const { results, unmatched } = sprayByPatterns(session, patterns);
  expect(results['github']).toHaveLength(2);
  expect(results['google']).toHaveLength(1);
  expect(unmatched).toHaveLength(2);
});

test('sprayByPatterns returns empty results for no patterns', () => {
  const { results, unmatched } = sprayByPatterns(session, []);
  expect(Object.keys(results)).toHaveLength(0);
  expect(unmatched).toHaveLength(session.tabs.length);
});

test('sprayByDomain groups by hostname', () => {
  const results = sprayByDomain(session);
  expect(results['github.com']).toHaveLength(2);
  expect(results['google.com']).toHaveLength(1);
  expect(results['developer.mozilla.org']).toHaveLength(1);
  expect(results['other']).toHaveLength(1);
});

test('describeSpray returns readable string', () => {
  const results = { github: [{}, {}], docs: [{}] };
  const desc = describeSpray(results);
  expect(desc).toContain('github: 2 tab(s)');
  expect(desc).toContain('docs: 1 tab(s)');
});
