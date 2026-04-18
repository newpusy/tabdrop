// Tag management for tab sessions

const MAX_TAGS = 10;
const TAG_PATTERN = /^[a-z0-9_-]{1,32}$/;

/**
 * Validate a single tag string
 * @param {string} tag
 * @returns {boolean}
 */
function isValidTag(tag) {
  return typeof tag === 'string' && TAG_PATTERN.test(tag);
}

/**
 * Normalize tags: lowercase, trim, dedupe
 * @param {string[]} tags
 * @returns {string[]}
 */
function normalizeTags(tags) {
  if (!Array.isArray(tags)) return [];
  const seen = new Set();
  return tags
    .map(t => String(t).trim().toLowerCase())
    .filter(t => {
      if (!isValidTag(t) || seen.has(t)) return false;
      seen.add(t);
      return true;
    })
    .slice(0, MAX_TAGS);
}

/**
 * Add tags to a session object (mutates a copy)
 * @param {object} session
 * @param {string[]} newTags
 * @returns {object}
 */
function tagSession(session, newTags) {
  const existing = session.tags || [];
  const merged = normalizeTags([...existing, ...newTags]);
  return { ...session, tags: merged };
}

/**
 * Filter sessions by tag
 * @param {object[]} sessions
 * @param {string} tag
 * @returns {object[]}
 */
function filterByTag(sessions, tag) {
  const t = tag.trim().toLowerCase();
  return sessions.filter(s => Array.isArray(s.tags) && s.tags.includes(t));
}

/**
 * List all unique tags across sessions
 * @param {object[]} sessions
 * @returns {string[]}
 */
function listAllTags(sessions) {
  const set = new Set();
  for (const s of sessions) {
    if (Array.isArray(s.tags)) s.tags.forEach(t => set.add(t));
  }
  return [...set].sort();
}

module.exports = { isValidTag, normalizeTags, tagSession, filterByTag, listAllTags };
