// spray: scatter tabs from a session into multiple named groups by pattern

const { loadGroups, saveGroups, setGroup } = require('./group');

function matchPattern(tab, pattern) {
  const p = pattern.toLowerCase();
  return (
    (tab.url && tab.url.toLowerCase().includes(p)) ||
    (tab.title && tab.title.toLowerCase().includes(p))
  );
}

function sprayByPatterns(session, patterns) {
  // patterns: [{ name, pattern }]
  const results = {};
  const unmatched = [];

  for (const tab of session.tabs || []) {
    let matched = false;
    for (const { name, pattern } of patterns) {
      if (matchPattern(tab, pattern)) {
        if (!results[name]) results[name] = [];
        results[name].push(tab);
        matched = true;
        break;
      }
    }
    if (!matched) unmatched.push(tab);
  }

  return { results, unmatched };
}

function sprayByDomain(session) {
  const results = {};
  for (const tab of session.tabs || []) {
    try {
      const domain = new URL(tab.url).hostname.replace(/^www\./, '');
      if (!results[domain]) results[domain] = [];
      results[domain].push(tab);
    } catch {
      if (!results['other']) results['other'] = [];
      results['other'].push(tab);
    }
  }
  return results;
}

function describeSpray(results) {
  return Object.entries(results)
    .map(([name, tabs]) => `${name}: ${tabs.length} tab(s)`)
    .join(', ');
}

module.exports = { sprayByPatterns, sprayByDomain, matchPattern, describeSpray };
