function formatSortResult(session, key, reverse) {
  const dir = reverse ? 'desc' : 'asc';
  const count = session.windows.reduce((n, w) => n + w.tabs.length, 0);
  return `Sorted ${count} tab(s) by ${key} (${dir}).`;
}

function formatSortInvalid(key, valid) {
  return `Invalid sort key "${key}". Valid keys: ${valid.join(', ')}.`;
}

function formatSortEmpty() {
  return 'No tabs to sort.';
}

module.exports = { formatSortResult, formatSortInvalid, formatSortEmpty };
