// batch operations on multiple sessions
const fs = require('fs');
const path = require('path');

function batchApply(sessions, fn) {
  return sessions.map(s => ({ id: s.id, result: fn(s) }));
}

function batchFilter(sessions, predicate) {
  return sessions.filter(predicate);
}

function batchTag(sessions, tags) {
  const { tagSession } = require('./tags');
  return sessions.map(s => tagSession(s, tags));
}

function batchExport(sessions, format) {
  const { toMarkdown, toJSON } = require('./export');
  return sessions.map(s => ({
    id: s.id,
    content: format === 'json' ? toJSON(s) : toMarkdown(s)
  }));
}

function batchDelete(sessions, ids) {
  const idSet = new Set(ids);
  return sessions.filter(s => !idSet.has(s.id));
}

function describeBatch(results) {
  const ok = results.filter(r => r.result !== null && r.result !== undefined).length;
  return `Processed ${ok}/${results.length} sessions`;
}

module.exports = { batchApply, batchFilter, batchTag, batchExport, batchDelete, describeBatch };
