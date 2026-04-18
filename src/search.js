// Search/filter sessions by various criteria
const { filterByTag } = require('./tags');

/**
 * Search sessions by query string (matches title or any tab URL/title)
 * @param {object[]} sessions
 * @param {string} query
 * @returns {object[]}
 */
function searchByText(sessions, query) {
  const q = query.trim().toLowerCase();
  if (!q) return sessions;
  return sessions.filter(s => {
    if (s.title && s.title.toLowerCase().includes(q)) return true;
    if (Array.isArray(s.tabs)) {
      return s.tabs.some(tab =>
        (tab.url && tab.url.toLowerCase().includes(q)) ||
        (tab.title && tab.title.toLowerCase().includes(q))
      );
    }
    return false;
  });
}

/**
 * Filter sessions by date range
 * @param {object[]} sessions
 * @param {object} opts - { from?: Date, to?: Date }
 * @returns {object[]}
 */
function filterByDate(sessions, { from, to } = {}) {
  return sessions.filter(s => {
    if (!s.createdAt) return true;
    const d = new Date(s.createdAt);
    if (from && d < from) return false;
    if (to && d > to) return false;
    return true;
  });
}

/**
 * Combined search: text + tags + date
 * @param {object[]} sessions
 * @param {object} opts
 * @param {string} [opts.query]
 * @param {string[]} [opts.tags]
 * @param {Date} [opts.from]
 * @param {Date} [opts.to]
 * @returns {object[]}
 */
function searchSessions(sessions, { query, tags, from, to } = {}) {
  let results = sessions;
  if (query) results = searchByText(results, query);
  if (tags && tags.length > 0) {
    tags.forEach(tag => { results = filterByTag(results, tag); });
  }
  if (from || to) results = filterByDate(results, { from, to });
  return results;
}

module.exports = { searchByText, filterByDate, searchSessions };
