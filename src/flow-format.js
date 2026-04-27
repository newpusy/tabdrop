// flow-format.js — formatting helpers for flow output
function formatFlow(flow) {
  const steps = flow.steps.map((s, i) => `  ${i + 1}. ${s.op}${s.args ? ' ' + JSON.stringify(s.args) : ''}`).join('\n');
  return `Flow: ${flow.name}\nSteps:\n${steps}\nUpdated: ${flow.updatedAt}`;
}

function formatFlowList(flows) {
  if (!flows.length) return 'No flows saved.';
  return flows.map(f => `• ${f.name} (${f.steps.length} step${f.steps.length !== 1 ? 's' : ''})`).join('\n');
}

function formatFlowSet(name) {
  return `Flow "${name}" saved.`;
}

function formatFlowRemoved(name) {
  return `Flow "${name}" removed.`;
}

function formatFlowNotFound(name) {
  return `Flow "${name}" not found.`;
}

function formatFlowResult(name, log) {
  const lines = log.map(l => `  ${l.ok ? '✓' : '✗'} ${l.step}${l.error ? ': ' + l.error : ''}`);
  return `Ran flow "${name}":\n${lines.join('\n')}`;
}

module.exports = { formatFlow, formatFlowList, formatFlowSet, formatFlowRemoved, formatFlowNotFound, formatFlowResult };
