'use strict';

function formatMacro(name, macro) {
  const steps = macro.steps || [];
  return `[macro] ${name}: ${steps.join(' → ')} (${steps.length} step${steps.length !== 1 ? 's' : ''})`;
}

function formatMacroList(macros) {
  const entries = Object.entries(macros);
  if (entries.length === 0) return 'No macros defined.';
  return entries.map(([name, macro]) => formatMacro(name, macro)).join('\n');
}

function formatMacroSet(name, macro) {
  const steps = macro.steps || [];
  return `Macro '${name}' set with ${steps.length} step${steps.length !== 1 ? 's' : ''}.`;
}

function formatMacroRemoved(name) {
  return `Macro '${name}' removed.`;
}

function formatMacroNotFound(name) {
  return `Macro '${name}' not found.`;
}

function formatMacroRun(name, results) {
  const lines = [`Running macro '${name}':`];
  results.forEach((r, i) => {
    const status = r.ok ? '✓' : '✗';
    lines.push(`  ${status} step ${i + 1}: ${r.step}${r.error ? ` — ${r.error}` : ''}`);
  });
  const passed = results.filter(r => r.ok).length;
  lines.push(`Done: ${passed}/${results.length} steps succeeded.`);
  return lines.join('\n');
}

module.exports = {
  formatMacro,
  formatMacroList,
  formatMacroSet,
  formatMacroRemoved,
  formatMacroNotFound,
  formatMacroRun,
};
