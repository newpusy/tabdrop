// Truncate long tab titles or URLs for display

const DEFAULT_TITLE_LEN = 60;
const DEFAULT_URL_LEN = 80;

function truncateStr(str, maxLen) {
  if (!str || str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + '...';
}

function truncateTitle(title, maxLen = DEFAULT_TITLE_LEN) {
  return truncateStr(title, maxLen);
}

function truncateUrl(url, maxLen = DEFAULT_URL_LEN) {
  return truncateStr(url, maxLen);
}

function truncateTab(tab, opts = {}) {
  return {
    ...tab,
    title: truncateTitle(tab.title, opts.titleLen),
    url: truncateUrl(tab.url, opts.urlLen),
  };
}

function truncateSession(session, opts = {}) {
  return {
    ...session,
    windows: session.windows.map(win => ({
      ...win,
      tabs: win.tabs.map(tab => truncateTab(tab, opts)),
    })),
  };
}

function describeTruncate(opts = {}) {
  const tl = opts.titleLen || DEFAULT_TITLE_LEN;
  const ul = opts.urlLen || DEFAULT_URL_LEN;
  return `titles capped at ${tl} chars, URLs capped at ${ul} chars`;
}

module.exports = { truncateStr, truncateTitle, truncateUrl, truncateTab, truncateSession, describeTruncate };
