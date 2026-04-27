// digest-format.js — formatting helpers for digest output

function formatDigest(digest) {
  const lines = [
    `Session: ${digest.name}`,
    `  Windows : ${digest.windowCount}`,
    `  Tabs    : ${digest.tabCount}`,
    `  Unique  : ${digest.uniqueUrls}`,
    `  Top domains:`,
  ];
  if (digest.topDomains.length === 0) {
    lines.push('    (none)');
  } else {
    for (const { domain, count } of digest.topDomains) {
      lines.push(`    ${domain} (${count})`);
    }
  }
  return lines.join('\n');
}

function formatDigestCompare(delta) {
  const sign = n => (n > 0 ? `+${n}` : `${n}`);
  const lines = [
    `  Tabs   : ${sign(delta.tabDelta)}`,
    `  Windows: ${sign(delta.windowDelta)}`,
    `  Unique : ${sign(delta.uniqueUrlDelta)}`,
  ];
  if (delta.newDomains.length > 0) {
    lines.push(`  New domains: ${delta.newDomains.join(', ')}`);
  }
  return lines.join('\n');
}

function formatDigestEmpty() {
  return 'No digest available — session has no tabs.';
}

module.exports = { formatDigest, formatDigestCompare, formatDigestEmpty };
