// chain-format.js — formatting helpers for chain output

function formatChainStep(step, index) {
  const opts = step.opts && Object.keys(step.opts).length > 0
    ? ` (${Object.entries(step.opts).map(([k, v]) => `${k}=${v}`).join(', ')})`
    : '';
  return `  ${index + 1}. ${step.op}${opts}`;
}

function formatChainList(steps) {
  if (!steps || steps.length === 0) return 'No steps in chain.';
  return 'Chain steps:\n' + steps.map((s, i) => formatChainStep(s, i)).join('\n');
}

function formatChainResult(session, steps) {
  const tabCount = session.windows.reduce((n, w) => n + w.tabs.length, 0);
  return `Chain applied (${steps.length} step${steps.length !== 1 ? 's' : ''}): ${tabCount} tab${tabCount !== 1 ? 's' : ''} remaining.`;
}

function formatChainError(op) {
  return `Unknown chain operation: "${op}". Valid ops: filter, sort, limit, dedupe, truncate.`;
}

function formatChainEmpty() {
  return 'Chain produced an empty session (no tabs remaining).';
}

module.exports = { formatChainStep, formatChainList, formatChainResult, formatChainError, formatChainEmpty };
