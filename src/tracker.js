const fs = require('fs');
const path = require('path');

const TRACKER_DIR = path.join(process.env.HOME || '.', '.tabdrop', 'tracker');
const TRACKER_FILE = path.join(TRACKER_DIR, 'tracker.json');

function ensureTrackerFile() {
  if (!fs.existsSync(TRACKER_DIR)) fs.mkdirSync(TRACKER_DIR, { recursive: true });
  if (!fs.existsSync(TRACKER_FILE)) fs.writeFileSync(TRACKER_FILE, JSON.stringify({}));
}

function loadTrackers() {
  ensureTrackerFile();
  return JSON.parse(fs.readFileSync(TRACKER_FILE, 'utf8'));
}

function saveTrackers(data) {
  ensureTrackerFile();
  fs.writeFileSync(TRACKER_FILE, JSON.stringify(data, null, 2));
}

function trackSession(sessionId, meta = {}) {
  const trackers = loadTrackers();
  trackers[sessionId] = {
    sessionId,
    firstSeen: trackers[sessionId]?.firstSeen || new Date().toISOString(),
    lastSeen: new Date().toISOString(),
    openCount: (trackers[sessionId]?.openCount || 0) + 1,
    ...meta
  };
  saveTrackers(trackers);
  return trackers[sessionId];
}

function getTracker(sessionId) {
  const trackers = loadTrackers();
  return trackers[sessionId] || null;
}

function removeTracker(sessionId) {
  const trackers = loadTrackers();
  if (!trackers[sessionId]) return false;
  delete trackers[sessionId];
  saveTrackers(trackers);
  return true;
}

function listTrackers() {
  return Object.values(loadTrackers());
}

function clearTrackers() {
  saveTrackers({});
}

module.exports = {
  ensureTrackerFile,
  loadTrackers,
  saveTrackers,
  trackSession,
  getTracker,
  removeTracker,
  listTrackers,
  clearTrackers
};
