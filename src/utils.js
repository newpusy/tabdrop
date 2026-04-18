const path = require('path');

/**
 * Determine format from file extension or explicit flag.
 * Falls back to 'md' if unknown.
 */
function parseFormat(filePath, explicitFormat) {
  if (explicitFormat && ['md', 'json'].includes(explicitFormat)) {
    return explicitFormat;
  }
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.json') return 'json';
  if (ext === '.md') return 'md';
  return 'md';
}

/**
 * Parse a markdown tab list into a session object.
 * Expects lines like: - [Title](url)
 */
function parseMarkdown(content) {
  const tabs = [];
  const lineRe = /^-\s+\[(.+?)\]\((.+?)\)/;
  const dateRe = /^#\s+Tab Session — (.+)$/;
  let exportedAt = null;

  for (const line of content.split('\n')) {
    const dateMatch = line.match(dateRe);
    if (dateMatch) exportedAt = dateMatch[1];
    const tabMatch = line.match(lineRe);
    if (tabMatch) tabs.push({ title: tabMatch[1], url: tabMatch[2] });
  }

  return { exportedAt: exportedAt || new Date().toISOString(), tabs };
}

module.exports = { parseFormat, parseMarkdown };
