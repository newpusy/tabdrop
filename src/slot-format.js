function formatSlot(slot) {
  const tabCount = slot.session && slot.session.windows
    ? slot.session.windows.reduce((sum, w) => sum + (w.tabs ? w.tabs.length : 0), 0)
    : 0;
  return `[${slot.name}] ${tabCount} tab(s) — saved ${slot.savedAt}`;
}

function formatSlotList(slots) {
  if (!slots.length) return 'No slots saved.';
  return slots.map(formatSlot).join('\n');
}

function formatSlotSaved(name) {
  return `Session saved to slot "${name}".`;
}

function formatSlotRemoved(name) {
  return `Slot "${name}" removed.`;
}

function formatSlotNotFound(name) {
  return `Slot "${name}" not found.`;
}

function formatSlotRestored(name) {
  return `Session restored from slot "${name}".`;
}

module.exports = { formatSlot, formatSlotList, formatSlotSaved, formatSlotRemoved, formatSlotNotFound, formatSlotRestored };
