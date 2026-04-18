/**
 * Browser detection and tab retrieval via native messaging or CDP
 */

const { execSync } = require('child_process');

const SUPPORTED_BROWSERS = ['chrome', 'firefox', 'edge'];

function detectBrowser() {
  const platform = process.platform;

  if (platform === 'darwin') {
    if (exists('Google Chrome')) return 'chrome';
    if (exists('Firefox')) return 'firefox';
    if (exists('Microsoft Edge')) return 'edge';
  } else if (platform === 'linux') {
    try { execSync('which google-chrome', { stdio: 'ignore' }); return 'chrome'; } catch {}
    try { execSync('which firefox', { stdio: 'ignore' }); return 'firefox'; } catch {}
  } else if (platform === 'win32') {
    return 'chrome'; // default assumption on windows
  }

  return null;
}

function exists(appName) {
  try {
    execSync(`osascript -e 'exists application "${appName}"'`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function getMockTabs() {
  return [
    { title: 'GitHub', url: 'https://github.com', windowId: 1 },
    { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', windowId: 1 },
    { title: 'Stack Overflow', url: 'https://stackoverflow.com', windowId: 2 },
  ];
}

async function getOpenTabs(browser) {
  const detected = browser || detectBrowser();
  if (!detected) {
    console.warn('No supported browser detected, using mock data');
    return getMockTabs();
  }
  // Real CDP/native messaging would go here
  // For now return mock tabs
  return getMockTabs();
}

module.exports = { detectBrowser, getOpenTabs, SUPPORTED_BROWSERS };
