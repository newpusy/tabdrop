const { batchApply, batchFilter, batchTag, batchExport, batchDelete, describeBatch } = require('./batch');
const { formatBatchSummary, formatBatchList, formatBatchEmpty } = require('./batch-format');

function cmdBatchTag(sessions, tags) {
  if (!sessions.length) return formatBatchEmpty();
  const updated = batchTag(sessions, tags);
  const results = updated.map(s => ({ id: s.id, result: s }));
  return [
    formatBatchSummary(results.length, sessions.length),
    formatBatchList(results)
  ].join('\n');
}

function cmdBatchExport(sessions, format = 'md') {
  if (!sessions.length) return formatBatchEmpty();
  const exported = batchExport(sessions, format);
  const results = exported.map(e => ({ id: e.id, result: e.content }));
  return [
    formatBatchSummary(results.length, sessions.length),
    formatBatchList(results)
  ].join('\n');
}

function cmdBatchDelete(sessions, ids) {
  const remaining = batchDelete(sessions, ids);
  const removed = sessions.length - remaining.length;
  return formatBatchSummary(removed, ids.length);
}

function cmdBatchList(sessions) {
  if (!sessions.length) return formatBatchEmpty();
  const results = sessions.map(s => ({ id: s.id, result: s }));
  return formatBatchList(results);
}

module.exports = { cmdBatchTag, cmdBatchExport, cmdBatchDelete, cmdBatchList };
