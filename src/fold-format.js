// fold-format.js — display helpers for folded tab groups

function formatFoldedDomain({ domain, count, titles }) {
  const titleList = titles.slice(0, 3).map(t => `    - ${t}`).join('\n');
  const more = titles.length > 3 ? `\n    ... +${titles.length - 3} more` : '';
  return `[${domain}] (${count} tab${count !== 1 ? 's' : ''})\n${titleList}${more}`;
}

function formatFoldedList(descriptions) {
  if (!descriptions.length) return 'No folded groups.';
  return descriptions.map(formatFoldedDomain).join('\n\n');
}

function formatFoldSummary(descriptions) {
  const total = descriptions.reduce((s, d) => s + d.count, 0);
  return `${descriptions.length} domain group${descriptions.length !== 1 ? 's' : ''}, ${total} tab${total !== 1 ? 's' : ''} total.`;
}

module.exports = { formatFoldedDomain, formatFoldedList, formatFoldSummary };
