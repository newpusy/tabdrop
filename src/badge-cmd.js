const {
  isValidBadge,
  setBadge,
  getBadge,
  removeBadge,
  listBadges,
  filterByBadge,
  VALID_BADGES,
} = require('./badge');
const {
  formatBadge,
  formatBadgeList,
  formatBadgeSet,
  formatBadgeRemoved,
  formatBadgeNotFound,
  formatBadgeInvalid,
} = require('./badge-format');

function cmdBadgeSet(sessionId, badge) {
  if (!isValidBadge(badge)) {
    console.log(formatBadgeInvalid(badge, VALID_BADGES));
    return;
  }
  setBadge(sessionId, badge);
  console.log(formatBadgeSet(sessionId, badge));
}

function cmdBadgeGet(sessionId) {
  const badge = getBadge(sessionId);
  if (!badge) {
    console.log(formatBadgeNotFound(sessionId));
    return;
  }
  console.log(formatBadge(sessionId, badge));
}

function cmdBadgeRemove(sessionId) {
  const removed = removeBadge(sessionId);
  if (!removed) {
    console.log(formatBadgeNotFound(sessionId));
    return;
  }
  console.log(formatBadgeRemoved(sessionId));
}

function cmdBadgeList() {
  const badges = listBadges();
  console.log(formatBadgeList(badges));
}

function cmdBadgeFilter(badge) {
  if (!isValidBadge(badge)) {
    console.log(formatBadgeInvalid(badge, VALID_BADGES));
    return;
  }
  const ids = filterByBadge(badge);
  if (!ids.length) {
    console.log(`No sessions with badge '${badge}'.`);
    return;
  }
  ids.forEach(id => console.log(`  - ${id}`));
}

module.exports = { cmdBadgeSet, cmdBadgeGet, cmdBadgeRemove, cmdBadgeList, cmdBadgeFilter };
