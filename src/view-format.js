// view-format.js — formatting helpers for view commands

function formatView(view) {
  return `[${view.name}] fields: ${view.fields.join(', ')}`;
}

function formatViewList(views) {
  if (!views.length) return 'No views saved.';
  return views.map(v => `  • ${formatView(v)}`).join('\n');
}

function formatViewSet(view) {
  return `View "${view.name}" saved with fields: ${view.fields.join(', ')}`;
}

function formatViewRemoved(name) {
  return `View "${name}" removed.`;
}

function formatViewNotFound(name) {
  return `View "${name}" not found.`;
}

function formatViewApplied(viewName, tabCount) {
  return `Applied view "${viewName}" to ${tabCount} tab(s).`;
}

module.exports = { formatView, formatViewList, formatViewSet, formatViewRemoved, formatViewNotFound, formatViewApplied };
