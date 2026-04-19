function formatExpiry(entry) {
  const date = new Date(entry.expiresAt).toLocaleString();
  const expired = entry.expiresAt <= Date.now() ? ' [EXPIRED]' : '';
  return `[${entry.id}] expires: ${date} (${entry.days}d)${expired}`;
}

function formatExpiryList(entries) {
  if (!entries.length) return 'No expiry entries set.';
  return entries.map(formatExpiry).join('\n');
}

function formatExpirySet(id, entry) {
  const date = new Date(entry.expiresAt).toLocaleString();
  return `Expiry set for "${id}": expires ${date} (${entry.days} day(s))`;
}

function formatExpiryRemoved(id) {
  return `Expiry removed for "${id}".`;
}

function formatExpiryNotFound(id) {
  return `No expiry found for "${id}".`;
}

function formatExpiredList(entries) {
  if (!entries.length) return 'No expired sessions.';
  return `Expired sessions:\n` + entries.map(e => `  - ${e.id} (expired ${new Date(e.expiresAt).toLocaleString()})`).join('\n');
}

module.exports = { formatExpiry, formatExpiryList, formatExpirySet, formatExpiryRemoved, formatExpiryNotFound, formatExpiredList };
