const { setShortcut, getShortcut, removeShortcut, listShortcuts } = require('./shortcut');
const { formatShortcut, formatShortcutList, formatShortcutSet, formatShortcutRemoved, formatShortcutNotFound } = require('./shortcut-format');

function cmdShortcutSet(key, sessionName) {
  setShortcut(key, sessionName);
  return formatShortcutSet(key, sessionName);
}

function cmdShortcutGet(key) {
  const val = getShortcut(key);
  if (!val) return formatShortcutNotFound(key);
  return formatShortcut(key, val);
}

function cmdShortcutRemove(key) {
  const existed = removeShortcut(key);
  if (!existed) return formatShortcutNotFound(key);
  return formatShortcutRemoved(key);
}

function cmdShortcutList() {
  const shortcuts = listShortcuts();
  return formatShortcutList(shortcuts);
}

module.exports = { cmdShortcutSet, cmdShortcutGet, cmdShortcutRemove, cmdShortcutList };
