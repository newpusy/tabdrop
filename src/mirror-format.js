function formatMirror(mirror) {
  return `mirror: ${mirror.name}  created: ${mirror.createdAt}`;
}

function formatMirrorList(mirrors) {
  if (!mirrors.length) return formatMirrorEmpty();
  return mirrors.map(m => `  - ${formatMirror(m)}`).join('\n');
}

function formatMirrorCreated(mirror) {
  return `✔ mirror "${mirror.name}" created`;
}

function formatMirrorRemoved(name) {
  return `✔ mirror "${name}" removed`;
}

function formatMirrorNotFound(name) {
  return `✘ mirror "${name}" not found`;
}

function formatMirrorSync(name, sync) {
  const lines = [`sync report for "${name}":`];
  lines.push(`  shared: ${sync.shared.length} url(s)`);
  if (sync.onlyInA.length) {
    lines.push(`  only in A (${sync.onlyInA.length}):`);
    sync.onlyInA.forEach(u => lines.push(`    ${u}`));
  }
  if (sync.onlyInB.length) {
    lines.push(`  only in B (${sync.onlyInB.length}):`);
    sync.onlyInB.forEach(u => lines.push(`    ${u}`));
  }
  return lines.join('\n');
}

function formatMirrorEmpty() {
  return 'no mirrors saved';
}

module.exports = { formatMirror, formatMirrorList, formatMirrorCreated, formatMirrorRemoved, formatMirrorNotFound, formatMirrorSync, formatMirrorEmpty };
