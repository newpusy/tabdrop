function formatTemplate(tpl) {
  const lines = [`📋 ${tpl.name} (${tpl.urls.length} tab${tpl.urls.length !== 1 ? 's' : ''}):`];
  tpl.urls.forEach(url => lines.push(`  - ${url}`));
  return lines.join('\n');
}

function formatTemplateList(templates) {
  if (templates.length === 0) return 'No templates saved.';
  return templates.map(formatTemplate).join('\n\n');
}

function formatTemplateSet(name, urls) {
  return `✅ Template "${name}" saved with ${urls.length} URL${urls.length !== 1 ? 's' : ''}.`;
}

function formatTemplateRemoved(name) {
  return `🗑️  Template "${name}" removed.`;
}

function formatTemplateNotFound(name) {
  return `❌ Template "${name}" not found.`;
}

module.exports = { formatTemplate, formatTemplateList, formatTemplateSet, formatTemplateRemoved, formatTemplateNotFound };
