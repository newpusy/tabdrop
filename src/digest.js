// digest.js — generate a summary digest of sessions (stats, top domains, etc.)

const { groupByWindow } = require('./session');

function topDomains(tabs, n = 5) {
  const counts = {};
  for (const tab of tabs) {
    try {
      const host = new URL(tab.url).hostname.replace(/^www\./, '');
      counts[host] = (counts[host] || 0) + 1;
    } catch (_) {}
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([domain, count]) => ({ domain, count }));
}

function tabStats(session) {
  const windows = groupByWindow(session);
  const allTabs = session.tabs || [];
  const windowCount = windows.length;
  const tabCount = allTabs.length;
  const uniqueUrls = new Set(allTabs.map(t => t.url)).size;
  const domains = topDomains(allTabs);
  return { windowCount, tabCount, uniqueUrls, domains };
}

function buildDigest(session) {
  const stats = tabStats(session);
  return {
    name: session.name || 'unnamed',
    createdAt: session.createdAt || null,
    windowCount: stats.windowCount,
    tabCount: stats.tabCount,
    uniqueUrls: stats.uniqueUrls,
    topDomains: stats.domains,
  };
}

function compareDigests(a, b) {
  return {
    tabDelta: b.tabCount - a.tabCount,
    windowDelta: b.windowCount - a.windowCount,
    uniqueUrlDelta: b.uniqueUrls - a.uniqueUrls,
    newDomains: b.topDomains
      .map(d => d.domain)
      .filter(d => !a.topDomains.map(x => x.domain).includes(d)),
  };
}

module.exports = { topDomains, tabStats, buildDigest, compareDigests };
