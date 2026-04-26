function formatSprayResult(name, tabs) {
  const lines = [`  Group "${name}" (${tabs.length} tab(s)):`];
  for (const tab of tabs) {
    lines.push(`    - ${tab.title || tab.url}`);
  }
  return lines.join('\n');
}

function formatSprayList(results) {
  const entries = Object.entries(results);
  if (!entries.length) return 'No tabs matched any pattern.';
  return entries.map(([name, tabs]) => formatSprayResult(name, tabs)).join('\n');
}

function formatSpraySummary(results, unmatched = []) {
  const total = Object.values(results).reduce((s, t) => s + t.length, 0);
  const groups = Object.keys(results).length;
  let out = `Sprayed ${total} tab(s) into ${groups} group(s).`;
  if (unmatched.length) out += ` ${unmatched.length} tab(s) unmatched.`;
  return out;
}

function formatSprayUnmatched(tabs) {
  if (!tabs.length) return '';
  const lines = [`  Unmatched (${tabs.length}):`];
  for (const tab of tabs) lines.push(`    - ${tab.title || tab.url}`);
  return lines.join('\n');
}

module.exports = { formatSprayResult, formatSprayList, formatSpraySummary, formatSprayUnmatched };
