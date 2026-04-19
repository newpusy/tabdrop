function formatShare(share) {
  const exp = share.expiresAt ? ` (expires ${share.expiresAt.slice(0, 10)})` : '';
  const note = share.note ? `\n  note: ${share.note}` : '';
  return `[${share.id}] ${share.name}${exp}${note}`;
}

function formatShareList(shares) {
  if (!shares.length) return 'No shares found.';
  return shares.map(formatShare).join('\n');
}

function formatShareCreated(share) {
  return `Share created: ${share.id} ("${share.name}")`;
}

function formatShareRemoved(id) {
  return `Share removed: ${id}`;
}

function formatShareNotFound(id) {
  return `Share not found: ${id}`;
}

function formatShareExpired(share) {
  return `Share "${share.id}" expired on ${share.expiresAt.slice(0, 10)}.`;
}

module.exports = { formatShare, formatShareList, formatShareCreated, formatShareRemoved, formatShareNotFound, formatShareExpired };
