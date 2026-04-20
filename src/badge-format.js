const BADGE_ICONS = {
  new: '🆕',
  updated: '🔄',
  starred: '⭐',
  reviewed: '✅',
  draft: '📝',
  done: '🏁',
};

function formatBadge(sessionId, badge) {
  const icon = BADGE_ICONS[badge] || '🏷️';
  return `${icon} [${badge}] ${sessionId}`;
}

function formatBadgeList(badges) {
  const entries = Object.entries(badges);
  if (!entries.length) return 'No badges set.';
  return entries.map(([id, b]) => formatBadge(id, b)).join('\n');
}

function formatBadgeSet(sessionId, badge) {
  const icon = BADGE_ICONS[badge] || '🏷️';
  return `${icon} Badge '${badge}' set on session '${sessionId}'.`;
}

function formatBadgeRemoved(sessionId) {
  return `🗑️  Badge removed from session '${sessionId}'.`;
}

function formatBadgeNotFound(sessionId) {
  return `⚠️  No badge found for session '${sessionId}'.`;
}

function formatBadgeInvalid(badge, validBadges) {
  return `❌ Invalid badge '${badge}'. Valid: ${validBadges.join(', ')}.`;
}

module.exports = {
  formatBadge,
  formatBadgeList,
  formatBadgeSet,
  formatBadgeRemoved,
  formatBadgeNotFound,
  formatBadgeInvalid,
  BADGE_ICONS,
};
