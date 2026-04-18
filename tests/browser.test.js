const { detectBrowser, getOpenTabs, SUPPORTED_BROWSERS } = require('../src/browser');

test('SUPPORTED_BROWSERS contains expected entries', () => {
  expect(SUPPORTED_BROWSERS).toContain('chrome');
  expect(SUPPORTED_BROWSERS).toContain('firefox');
  expect(SUPPORTED_BROWSERS).toContain('edge');
});

test('detectBrowser returns string or null', () => {
  const result = detectBrowser();
  expect(result === null || typeof result === 'string').toBe(true);
  if (result !== null) {
    expect(SUPPORTED_BROWSERS).toContain(result);
  }
});

test('getOpenTabs returns array of tab objects', async () => {
  const tabs = await getOpenTabs();
  expect(Array.isArray(tabs)).toBe(true);
  expect(tabs.length).toBeGreaterThan(0);
  for (const tab of tabs) {
    expect(tab).toHaveProperty('title');
    expect(tab).toHaveProperty('url');
    expect(tab).toHaveProperty('windowId');
  }
});

test('getOpenTabs accepts explicit browser arg', async () => {
  const tabs = await getOpenTabs('chrome');
  expect(Array.isArray(tabs)).toBe(true);
});

test('getOpenTabs rejects unsupported browser', async () => {
  await expect(getOpenTabs('safari')).rejects.toThrow();
});
