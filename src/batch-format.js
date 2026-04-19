function formatBatchSummary(count, total) {
  return `Batch complete: ${count}/${total} sessions processed`;
}

function formatBatchResult(id, status) {
  return `  [${status === 'ok' ? '✓' : '✗'}] ${id}`;
}

function formatBatchList(results) {
  if (!results.length) return 'No sessions in batch.';
  return results.map(r => formatBatchResult(r.id, r.result ? 'ok' : 'fail')).join('\n');
}

function formatBatchEmpty() {
  return 'No sessions matched for batch operation.';
}

function formatBatchError(id, err) {
  return `  [!] ${id}: ${err}`;
}

module.exports = { formatBatchSummary, formatBatchResult, formatBatchList, formatBatchEmpty, formatBatchError };
