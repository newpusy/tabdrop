function formatRename(oldName, newName) {
  return `Renamed "${oldName}" → "${newName}"`;
}

function formatRenameList(renames) {
  const entries = Object.entries(renames);
  if (!entries.length) return 'No renames defined.';
  return entries.map(([from, to]) => `  ${from} → ${to}`).join('\n');
}

function formatRenameSet(oldName, newName) {
  return `Alias set: "${oldName}" will resolve as "${newName}"`;
}

function formatRenameRemoved(name) {
  return `Rename removed for "${name}"`;
}

function formatRenameNotFound(name) {
  return `No rename found for "${name}"`;
}

module.exports = { formatRename, formatRenameList, formatRenameSet, formatRenameRemoved, formatRenameNotFound };
