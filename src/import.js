const fs = require('fs');
const { parseFormat, parseMarkdown } = require('./utils');

function importSession(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const fmt = parseFormat(filePath, null);
  let session;

  if (fmt === 'json') {
    try {
      session = JSON.parse(content);
    } catch {
      console.error('Failed to parse JSON session file.');
      process.exit(1);
    }
  } else {
    session = parseMarkdown(content);
  }

  console.log(`Imported session from ${filePath} (${fmt})`);
  console.log(`Exported at: ${session.exportedAt}`);
  console.log(`Tabs (${session.tabs.length}):`);
  for (const tab of session.tabs) {
    console.log(`  ${tab.title} — ${tab.url}`);
  }

  return session;
}

module.exports = { importSession };
