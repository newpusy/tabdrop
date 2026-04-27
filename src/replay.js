// replay.js — replay a session by re-opening tabs in order

const { validateSession } = require('./session');

function ensureReplayFile() {}

function buildReplayPlan(session, opts = {}) {
  if (!validateSession(session)) throw new Error('Invalid session');
  const { windowIndex = null, delay = 0, limit = null } = opts;

  let windows = session.windows;
  if (windowIndex !== null) {
    const w = windows[windowIndex];
    if (!w) throw new Error(`No window at index ${windowIndex}`);
    windows = [w];
  }

  const steps = [];
  for (const [wi, win] of windows.entries()) {
    const tabs = limit ? win.tabs.slice(0, limit) : win.tabs;
    for (const [ti, tab] of tabs.entries()) {
      steps.push({
        windowIndex: wi,
        tabIndex: ti,
        url: tab.url,
        title: tab.title || '',
        delay: ti === 0 ? 0 : delay,
      });
    }
  }
  return steps;
}

function describeReplay(steps) {
  const windows = new Set(steps.map(s => s.windowIndex)).size;
  return `Replay plan: ${steps.length} tab(s) across ${windows} window(s)`;
}

function replayToText(steps) {
  return steps
    .map(
      (s, i) =>
        `[${i + 1}] window=${s.windowIndex + 1} tab=${s.tabIndex + 1}` +
        (s.delay ? ` +${s.delay}ms` : '') +
        ` ${s.url}`
    )
    .join('\n');
}

function filterReplayByDomain(steps, domain) {
  return steps.filter(s => {
    try {
      return new URL(s.url).hostname.includes(domain);
    } catch {
      return false;
    }
  });
}

module.exports = {
  buildReplayPlan,
  describeReplay,
  replayToText,
  filterReplayByDomain,
};
