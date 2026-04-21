const {
  isValidReaction,
  setReaction,
  getReaction,
  removeReaction,
  listReactions,
  filterByReaction,
  REACTIONS
} = require('./reaction');

const {
  formatReactionSet,
  formatReactionRemoved,
  formatReactionNotFound,
  formatInvalidReaction,
  formatReactionList,
  formatFilteredReactions
} = require('./reaction-format');

function cmdReactionSet(sessionId, emoji) {
  if (!isValidReaction(emoji)) {
    console.log(formatInvalidReaction(emoji, REACTIONS));
    return;
  }
  setReaction(sessionId, emoji);
  console.log(formatReactionSet(sessionId, emoji));
}

function cmdReactionGet(sessionId) {
  const emoji = getReaction(sessionId);
  if (!emoji) {
    console.log(formatReactionNotFound(sessionId));
    return;
  }
  console.log(`${sessionId}: ${emoji}`);
}

function cmdReactionRemove(sessionId) {
  const removed = removeReaction(sessionId);
  if (!removed) {
    console.log(formatReactionNotFound(sessionId));
    return;
  }
  console.log(formatReactionRemoved(sessionId));
}

function cmdReactionList() {
  const reactions = listReactions();
  console.log(formatReactionList(reactions));
}

function cmdReactionFilter(emoji) {
  const ids = filterByReaction(emoji);
  console.log(formatFilteredReactions(emoji, ids));
}

module.exports = {
  cmdReactionSet,
  cmdReactionGet,
  cmdReactionRemove,
  cmdReactionList,
  cmdReactionFilter
};
