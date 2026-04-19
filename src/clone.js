const { createSession } = require('./session');

/**
 * Deep clone a session object
 */
function cloneSession(session) {
  return JSON.parse(JSON.stringify(session));
}

/**
 * Clone a session with a new name
 */
function cloneNamed(session, name) {
  const cloned = cloneSession(session);
  cloned.name = name;
  cloned.createdAt = new Date().toISOString();
  return cloned;
}

/**
 * Clone only specific windows by index (0-based)
 */
function cloneWindows(session, windowIndexes) {
  const cloned = cloneSession(session);
  cloned.windows = cloned.windows.filter((_, i) => windowIndexes.includes(i));
  cloned.createdAt = new Date().toISOString();
  return cloned;
}

/**
 * Clone only tabs matching a predicate
 */
function cloneFiltered(session, predicate) {
  const cloned = cloneSession(session);
  cloned.windows = cloned.windows
    .map(w => ({ ...w, tabs: w.tabs.filter(predicate) }))
    .filter(w => w.tabs.length > 0);
  cloned.createdAt = new Date().toISOString();
  return cloned;
}

/**
 * Summarize a clone operation
 */
function describeClone(original, cloned) {
  const origTabs = original.windows.reduce((n, w) => n + w.tabs.length, 0);
  const clonedTabs = cloned.windows.reduce((n, w) => n + w.tabs.length, 0);
  return {
    originalName: original.name,
    clonedName: cloned.name,
    originalTabs: origTabs,
    clonedTabs,
    windows: cloned.windows.length
  };
}

module.exports = { cloneSession, cloneNamed, cloneWindows, cloneFiltered, describeClone };
