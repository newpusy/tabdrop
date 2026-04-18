const { createSession, validateSession, describeSession } = require('../src/session');

const mockTabs = [
  { title: 'GitHub', url: 'https://github.com', windowId: 1 },
  { title: 'MDN', url: 'https://developer.mozilla.org', windowId: 1 },
  { title: 'Stack Overflow', url: 'https://stackoverflow.com', windowId: 2 },
];

test('createSession builds correct structure', () => {
  const session = createSession(mockTabs, { name: 'test-session', browser: 'chrome' });
  expect(session.name).toBe('test-session');
  expect(session.browser).toBe('chrome');
  expect(session.tabCount).toBe(3);
  expect(session.windows).toHaveLength(2);
  expect(session.windows[0].tabs).toHaveLength(2);
});

test('createSession uses default name when not provided', () => {
  const session = createSession(mockTabs);
  expect(session.name).toMatch(/^session-\d+$/);
});

test('createSession throws on empty tabs', () => {
  expect(() => createSession([])).toThrow('non-empty array');
  expect(() => createSession(null)).toThrow();
});

test('validateSession returns valid for correct session', () => {
  const session = createSession(mockTabs, { name: 'ok' });
  const { valid, errors } = validateSession(session);
  expect(valid).toBe(true);
  expect(errors).toHaveLength(0);
});

test('validateSession catches missing url', () => {
  const session = createSession(mockTabs);
  session.windows[0].tabs[0].url = '';
  const { valid, errors } = validateSession(session);
  expect(valid).toBe(false);
  expect(errors.some(e => e.includes('missing url'))).toBe(true);
});

test('describeSession returns readable string', () => {
  const session = createSession(mockTabs, { name: 'my-tabs' });
  const desc = describeSession(session);
  expect(desc).toContain('my-tabs');
  expect(desc).toContain('3 tab(s)');
  expect(desc).toContain('2 window(s)');
});
