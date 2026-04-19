const { cloneSession, cloneNamed, cloneWindows, cloneFiltered, describeClone } = require('../src/clone');

const base = {
  name: 'original',
  createdAt: '2024-01-01T00:00:00.000Z',
  windows: [
    { tabs: [{ title: 'Google', url: 'https://google.com' }, { title: 'GitHub', url: 'https://github.com' }] },
    { tabs: [{ title: 'MDN', url: 'https://developer.mozilla.org' }] }
  ]
};

test('cloneSession returns deep copy', () => {
  const c = cloneSession(base);
  expect(c).toEqual(base);
  c.windows[0].tabs[0].title = 'changed';
  expect(base.windows[0].tabs[0].title).toBe('Google');
});

test('cloneNamed sets new name and createdAt', () => {
  const c = cloneNamed(base, 'copy');
  expect(c.name).toBe('copy');
  expect(c.createdAt).not.toBe(base.createdAt);
  expect(c.windows.length).toBe(2);
});

test('cloneWindows selects only specified windows', () => {
  const c = cloneWindows(base, [0]);
  expect(c.windows.length).toBe(1);
  expect(c.windows[0].tabs.length).toBe(2);
});

test('cloneWindows with multiple indexes', () => {
  const c = cloneWindows(base, [0, 1]);
  expect(c.windows.length).toBe(2);
});

test('cloneFiltered keeps only matching tabs', () => {
  const c = cloneFiltered(base, t => t.url.includes('github'));
  expect(c.windows.length).toBe(1);
  expect(c.windows[0].tabs[0].title).toBe('GitHub');
});

test('cloneFiltered removes empty windows', () => {
  const c = cloneFiltered(base, t => t.url.includes('mozilla'));
  expect(c.windows.length).toBe(1);
  expect(c.windows[0].tabs[0].title).toBe('MDN');
});

test('describeClone returns summary', () => {
  const c = cloneNamed(base, 'copy');
  const d = describeClone(base, c);
  expect(d.originalName).toBe('original');
  expect(d.clonedName).toBe('copy');
  expect(d.originalTabs).toBe(3);
  expect(d.clonedTabs).toBe(3);
  expect(d.windows).toBe(2);
});
