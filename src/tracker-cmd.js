const { trackSession, getTracker, removeTracker, listTrackers } = require('./tracker');
const {
  formatTracker,
  formatTrackerList,
  formatTrackerAdded,
  formatTrackerRemoved,
  formatTrackerNotFound,
  formatTrackerEmpty
} = require('./tracker-format');

function cmdTrackerAdd(sessionId, meta = {}) {
  const entry = trackSession(sessionId, meta);
  return formatTrackerAdded(entry);
}

function cmdTrackerGet(sessionId) {
  const entry = getTracker(sessionId);
  if (!entry) return formatTrackerNotFound(sessionId);
  return formatTracker(entry);
}

function cmdTrackerRemove(sessionId) {
  const removed = removeTracker(sessionId);
  if (!removed) return formatTrackerNotFound(sessionId);
  return formatTrackerRemoved(sessionId);
}

function cmdTrackerList() {
  const all = listTrackers();
  return formatTrackerList(all);
}

module.exports = {
  cmdTrackerAdd,
  cmdTrackerGet,
  cmdTrackerRemove,
  cmdTrackerList
};
