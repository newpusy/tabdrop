function formatArchiveEntry(name, index) {
  const num = index !== undefined ? `${index + 1}. ` : '';
  return `${num}${name}`;
}

function formatArchiveList(names) {
  if (!names.length) return 'No archives found.';
  return ['Archives:', ...names.map((n, i) => `  ${formatArchiveEntry(n, i)}`)].join('\n');
}

function formatArchiveSaved(name) {
  return `Session archived as: ${name}`;
}

function formatArchiveDeleted(name) {
  return `Deleted archive: ${name}`;
}

function formatArchiveNotFound(name) {
  return `Archive not found: ${name}`;
}

module.exports = { formatArchiveEntry, formatArchiveList, formatArchiveSaved, formatArchiveDeleted, formatArchiveNotFound };
