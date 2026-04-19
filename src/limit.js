// limit.js — cap sessions to a max number of tabs or windows

function limitTabs(session, max) {
  if (!session || !Array.isArray(session.windows)) return session;
  let count = 0;
  const windows = [];
  for (const win of session.windows) {
    if (count >= max) break;
    const tabs = (win.tabs || []).slice(0, max - count);
    if (tabs.length > 0) {
      windows.push({ ...win, tabs });
      count += tabs.length;
    }
  }
  return { ...session, windows };
}

function limitWindows(session, max) {
  if (!session || !Array.isArray(session.windows)) return session;
  return { ...session, windows: session.windows.slice(0, max) };
}

function totalTabs(session) {
  if (!session || !Array.isArray(session.windows)) return 0;
  return session.windows.reduce((sum, w) => sum + (w.tabs ? w.tabs.length : 0), 0);
}

function describeLimit(original, limited) {
  const before = totalTabs(original);
  const after = totalTabs(limited);
  const dropped = before - after;
  return dropped > 0
    ? `Limited to ${after} tab(s) (dropped ${dropped})`
    : `No tabs dropped (${after} tab(s))`;
}

module.exports = { limitTabs, limitWindows, totalTabs, describeLimit };
