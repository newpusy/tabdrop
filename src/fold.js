// fold.js — collapse/expand tab groups by domain or window

function foldByDomain(session) {
  const folded = {};
  for (const win of session.windows) {
    for (const tab of win.tabs) {
      const domain = new URL(tab.url).hostname.replace(/^www\./, '');
      if (!folded[domain]) folded[domain] = [];
      folded[domain].push(tab);
    }
  }
  return folded;
}

function foldByWindow(session) {
  return session.windows.map((win, i) => ({
    window: i + 1,
    tabs: win.tabs,
    count: win.tabs.length
  }));
}

function unfoldToSession(folded) {
  const tabs = Object.values(folded).flat();
  return { windows: [{ tabs }] };
}

function describeFolded(folded) {
  return Object.entries(folded).map(([domain, tabs]) => ({
    domain,
    count: tabs.length,
    titles: tabs.map(t => t.title)
  }));
}

module.exports = { foldByDomain, foldByWindow, unfoldToSession, describeFolded };
