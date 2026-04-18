// filter sessions by various criteria

function filterByDomain(sessions, domain) {
  return sessions.map(session => ({
    ...session,
    windows: session.windows.map(win => ({
      ...win,
      tabs: win.tabs.filter(tab => {
        try {
          return new URL(tab.url).hostname.includes(domain);
        } catch {
          return false;
        }
      })
    })).filter(win => win.tabs.length > 0)
  })).filter(s => s.windows.length > 0);
}

function filterByTitle(sessions, query) {
  const q = query.toLowerCase();
  return sessions.map(session => ({
    ...session,
    windows: session.windows.map(win => ({
      ...win,
      tabs: win.tabs.filter(tab => tab.title && tab.title.toLowerCase().includes(q))
    })).filter(win => win.tabs.length > 0)
  })).filter(s => s.windows.length > 0);
}

function filterByTabCount(sessions, min, max) {
  return sessions.filter(session => {
    const count = session.windows.reduce((acc, w) => acc + w.tabs.length, 0);
    if (min !== undefined && count < min) return false;
    if (max !== undefined && count > max) return false;
    return true;
  });
}

function filterByWindowCount(sessions, min, max) {
  return sessions.filter(session => {
    const count = session.windows.length;
    if (min !== undefined && count < min) return false;
    if (max !== undefined && count > max) return false;
    return true;
  });
}

function applyFilters(sessions, opts = {}) {
  let result = sessions;
  if (opts.domain) result = filterByDomain(result, opts.domain);
  if (opts.title) result = filterByTitle(result, opts.title);
  if (opts.minTabs !== undefined || opts.maxTabs !== undefined)
    result = filterByTabCount(result, opts.minTabs, opts.maxTabs);
  if (opts.minWindows !== undefined || opts.maxWindows !== undefined)
    result = filterByWindowCount(result, opts.minWindows, opts.maxWindows);
  return result;
}

module.exports = { filterByDomain, filterByTitle, filterByTabCount, filterByWindowCount, applyFilters };
