// pin-format.js — display helpers for pinned sessions

function formatPin(pin, index) {
  const date = new Date(pin.pinnedAt).toLocaleDateString();
  return `${index + 1}. [${pin.name}] ${pin.filePath}  (pinned ${date})`;
}

function formatPinList(pins) {
  if (!pins || pins.length === 0) {
    return 'No pinned sessions.';
  }
  const lines = ['Pinned sessions:', ''];
  pins.forEach((pin, i) => lines.push(formatPin(pin, i)));
  return lines.join('\n');
}

function formatPinAdded(pin) {
  return `Pinned "${pin.name}" → ${pin.filePath}`;
}

function formatPinRemoved(pin) {
  return `Unpinned "${pin.name}".`;
}

module.exports = { formatPin, formatPinList, formatPinAdded, formatPinRemoved };
