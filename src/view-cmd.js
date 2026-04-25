// view-cmd.js — CLI command handlers for views

const { setView, getView, removeView, listViews, applyView } = require('./view');
const { formatView, formatViewList, formatViewSet, formatViewRemoved, formatViewNotFound, formatViewApplied } = require('./view-format');

function cmdViewSet(name, fieldsStr) {
  const fields = fieldsStr.split(',').map(f => f.trim()).filter(Boolean);
  try {
    const view = setView(name, fields);
    return formatViewSet(view);
  } catch (e) {
    return `Error: ${e.message}`;
  }
}

function cmdViewGet(name) {
  const view = getView(name);
  if (!view) return formatViewNotFound(name);
  return formatView(view);
}

function cmdViewRemove(name) {
  const removed = removeView(name);
  if (!removed) return formatViewNotFound(name);
  return formatViewRemoved(name);
}

function cmdViewList() {
  return formatViewList(listViews());
}

function cmdViewApply(session, viewName) {
  const view = getView(viewName);
  if (!view) return { output: formatViewNotFound(viewName), session: null };
  const result = applyView(session, viewName);
  const tabCount = result.windows.reduce((n, w) => n + w.tabs.length, 0);
  return { output: formatViewApplied(viewName, tabCount), session: result };
}

module.exports = { cmdViewSet, cmdViewGet, cmdViewRemove, cmdViewList, cmdViewApply };
