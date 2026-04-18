/**
 * Compare two sessions and return added/removed/common tabs.
 */
export function diffSessions(sessionA, sessionB) {
  const urlsA = new Set(flatUrls(sessionA));
  const urlsB = new Set(flatUrls(sessionB));

  const added = [...urlsB].filter(u => !urlsA.has(u));
  const removed = [...urlsA].filter(u => !urlsB.has(u));
  const common = [...urlsA].filter(u => urlsB.has(u));

  return { added, removed, common };
}

function flatUrls(session) {
  return session.windows.flatMap(w => w.tabs.map(t => t.url));
}

export function formatDiff(diff) {
  const lines = [];
  if (diff.added.length) {
    lines.push('## Added');
    diff.added.forEach(u => lines.push(`+ ${u}`));
  }
  if (diff.removed.length) {
    lines.push('## Removed');
    diff.removed.forEach(u => lines.push(`- ${u}`));
  }
  if (diff.common.length) {
    lines.push('## Unchanged');
    diff.common.forEach(u => lines.push(`  ${u}`));
  }
  return lines.join('\n');
}

export function hasDiff(diff) {
  return diff.added.length > 0 || diff.removed.length > 0;
}
