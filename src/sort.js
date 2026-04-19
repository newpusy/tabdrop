// sort sessions by various criteria

function sortByTitle(tabs) {
  return [...tabs].sort((a, b) => (a.title || '').localeCompare(b.title || ''));
}

function sortByUrl(tabs) {
  return [...tabs].sort((a, b) => (a.url || '').localeCompare(b.url || ''));
}

function sortByDate(tabs) {
  return [...tabs].sort((a, b) => {
    const da = new Date(a.addedAt || 0);
    const db = new Date(b.addedAt || 0);
    return db - da;
  });
}

function sortByDomain(tabs) {
  return [...tabs].sort((a, b) => {
    const da = getDomain(a.url);
    const db = getDomain(b.url);
    return da.localeCompare(db);
  });
}

function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

const SORT_KEYS = ['title', 'url', 'date', 'domain'];

function isValidSortKey(key) {
  return SORT_KEYS.includes(key);
}

function sortTabs(tabs, key = 'title', reverse = false) {
  if (!isValidSortKey(key)) throw new Error(`Invalid sort key: ${key}. Use one of: ${SORT_KEYS.join(', ')}`);
  const sorters = { title: sortByTitle, url: sortByUrl, date: sortByDate, domain: sortByDomain };
  const sorted = sorters[key](tabs);
  return reverse ? sorted.reverse() : sorted;
}

function sortSession(session, key = 'title', reverse = false) {
  return {
    ...session,
    windows: session.windows.map(win => ({
      ...win,
      tabs: sortTabs(win.tabs, key, reverse)
    }))
  };
}

module.exports = { sortByTitle, sortByUrl, sortByDate, sortByDomain, sortTabs, sortSession, isValidSortKey, SORT_KEYS };
