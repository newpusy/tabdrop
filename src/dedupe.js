// Deduplicate tabs within or across sessions

/**
 * Normalize a URL for comparison (strip trailing slash, fragment)
 * @param {string} url
 * @returns {string}
 */
function normalizeUrl(url) {
  try {
    const u = new URL(url);
    u.hash = '';
    let href = u.toString();
    if (href.endsWith('/')) href = href.slice(0, -1);
    return href;
  } catch {
    return url.trim();
  }
}

/**
 * Remove duplicate tabs within a session (by normalized URL)
 * @param {object} session
 * @returns {object} new session with dupes removed
 */
function dedupeSession(session) {
  const seen = new Set();
  const dedupedWindows = session.windows.map(win => {
    const tabs = win.tabs.filter(tab => {
      const key = normalizeUrl(tab.url);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return { ...win, tabs };
  });
  return { ...session, windows: dedupedWindows };
}

/**
 * Find duplicate tabs in a session
 * @param {object} session
 * @returns {Array} list of duplicated URLs
 */
function findDuplicates(session) {
  const seen = new Set();
  const dupes = new Set();
  for (const win of session.windows) {
    for (const tab of win.tabs) {
      const key = normalizeUrl(tab.url);
      if (seen.has(key)) dupes.add(key);
      else seen.add(key);
    }
  }
  return Array.from(dupes);
}

/**
 * Merge two sessions, deduplicating by URL
 * @param {object} sessionA
 * @param {object} sessionB
 * @returns {object} merged session based on sessionA
 */
function mergeSessions(sessionA, sessionB) {
  const existingUrls = new Set();
  for (const win of sessionA.windows)
    for (const tab of win.tabs)
      existingUrls.add(normalizeUrl(tab.url));

  const newTabs = [];
  for (const win of sessionB.windows)
    for (const tab of win.tabs)
      if (!existingUrls.has(normalizeUrl(tab.url))) newTabs.push(tab);

  const merged = { ...sessionA };
  if (newTabs.length > 0) {
    merged.windows = [
      ...sessionA.windows,
      { id: Date.now(), tabs: newTabs }
    ];
  }
  return merged;
}

module.exports = { normalizeUrl, dedupeSession, findDuplicates, mergeSessions };
