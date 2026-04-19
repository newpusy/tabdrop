function formatShortcut(key, sessionName) {
  return `[${key}] → ${sessionName}`;
}

function formatShortcutList(shortcuts) {
  const entries = Object.entries(shortcuts);
  if (!entries.length) return 'No shortcuts defined.';
  return entries.map(([k, v]) => formatShortcut(k, v)).join('\n');
}

function formatShortcutSet(key, sessionName) {
  return `Shortcut "${key}" → "${sessionName}" saved.`;
}

function formatShortcutRemoved(key) {
  return `Shortcut "${key}" removed.`;
}

function formatShortcutNotFound(key) {
  return `Shortcut "${key}" not found.`;
}

module.exports = { formatShortcut, formatShortcutList, formatShortcutSet, formatShortcutRemoved, formatShortcutNotFound };
