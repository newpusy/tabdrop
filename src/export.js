const fs = require('fs');
const path = require('path');
const { parseFormat } = require('./utils');

// Sample session data — in real use this would come from a browser extension or stdin
const sampleSession = {
  exportedAt: new Date().toISOString(),
  tabs: [
    { title: 'GitHub', url: 'https://github.com' },
    { title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
    { title: 'Node.js', url: 'https://nodejs.org' }
  ]
};

function toMarkdown(session) {
  const lines = [`# Tab Session — ${session.exportedAt}`, ''];
  for (const tab of session.tabs) {
    lines.push(`- [${tab.title}](${tab.url})`);
  }
  return lines.join('\n') + '\n';
}

function toJSON(session) {
  return JSON.stringify(session, null, 2) + '\n';
}

function exportSession(filePath, format) {
  const fmt = parseFormat(filePath, format);
  let content;

  if (fmt === 'json') {
    content = toJSON(sampleSession);
  } else {
    content = toMarkdown(sampleSession);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Exported ${sampleSession.tabs.length} tabs to ${filePath} (${fmt})`);
}

module.exports = { exportSession, toMarkdown, toJSON };
