function formatTracker(t) {
  return `[${t.sessionId}] opens: ${t.openCount} | first: ${t.firstSeen.slice(0, 10)} | last: ${t.lastSeen.slice(0, 10)}`;
}

function formatTrackerList(trackers) {
  if (!trackers.length) return formatTrackerEmpty();
  return trackers.map(formatTracker).join('\n');
}

function formatTrackerAdded(t) {
  return `Tracking session "${t.sessionId}" (opens: ${t.openCount})`;
}

function formatTrackerRemoved(sessionId) {
  return `Stopped tracking "${sessionId}"`;
}

function formatTrackerNotFound(sessionId) {
  return `No tracker found for "${sessionId}"`;
}

function formatTrackerEmpty() {
  return 'No sessions are being tracked.';
}

module.exports = {
  formatTracker,
  formatTrackerList,
  formatTrackerAdded,
  formatTrackerRemoved,
  formatTrackerNotFound,
  formatTrackerEmpty
};
