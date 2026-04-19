function formatHotkey(key, action) {
  return `  ${key.padEnd(20)} → ${action}`;
}

function formatHotkeyList(hotkeys) {
  const entries = Object.entries(hotkeys);
  if (!entries.length) return '(no hotkeys set)';
  return entries.map(([k, v]) => formatHotkey(k, v)).join('\n');
}

function formatHotkeySet(key, action) {
  return `Hotkey set: ${key} → ${action}`;
}

function formatHotkeyRemoved(key) {
  return `Hotkey removed: ${key}`;
}

function formatHotkeyNotFound(key) {
  return `Hotkey not found: ${key}`;
}

function formatInvalidHotkey(key) {
  return `Invalid hotkey format: ${key}`;
}

module.exports = {
  formatHotkey,
  formatHotkeyList,
  formatHotkeySet,
  formatHotkeyRemoved,
  formatHotkeyNotFound,
  formatInvalidHotkey,
};
