/**
 * Session management: build, validate, and describe tab sessions
 */

function createSession(tabs, options = {}) {
  if (!Array.isArray(tabs) || tabs.length === 0) {
    throw new Error('tabs must be a non-empty array');
  }

  const grouped = groupByWindow(tabs);

  return {
    name: options.name || `session-${Date.now()}`,
    createdAt: new Date().toISOString(),
    browser: options.browser || 'unknown',
    windows: grouped,
    tabCount: tabs.length,
  };
}

function groupByWindow(tabs) {
  const windows = {};
  for (const tab of tabs) {
    const wid = tab.windowId || 1;
    if (!windows[wid]) windows[wid] = { id: wid, tabs: [] };
    windows[wid].tabs.push({ title: tab.title, url: tab.url });
  }
  return Object.values(windows);
}

function validateSession(session) {
  const errors = [];
  if (!session.name) errors.push('missing name');
  if (!session.createdAt) errors.push('missing createdAt');
  if (!Array.isArray(session.windows)) errors.push('windows must be an array');
  for (const win of session.windows || []) {
    if (!Array.isArray(win.tabs)) errors.push(`window ${win.id} missing tabs array`);
    for (const tab of win.tabs || []) {
      if (!tab.url) errors.push(`tab missing url: ${JSON.stringify(tab)}`);
    }
  }
  return { valid: errors.length === 0, errors };
}

function describeSession(session) {
  const winCount = session.windows.length;
  return `"${session.name}" — ${session.tabCount} tab(s) across ${winCount} window(s), saved ${session.createdAt}`;
}

module.exports = { createSession, validateSession, describeSession };
