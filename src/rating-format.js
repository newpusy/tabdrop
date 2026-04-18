function formatStars(score) {
  return '★'.repeat(score) + '☆'.repeat(5 - score);
}

function formatRating(sessionId, rating) {
  return `${sessionId}: ${formatStars(rating.score)} (${rating.score}/5) — ${rating.updatedAt}`;
}

function formatRatingList(ratings) {
  const entries = Object.entries(ratings);
  if (entries.length === 0) return 'No ratings saved.';
  return entries.map(([id, r]) => formatRating(id, r)).join('\n');
}

function formatRatingSet(sessionId, rating) {
  return `Rated session "${sessionId}": ${formatStars(rating.score)}`;
}

function formatRatingRemoved(sessionId) {
  return `Rating removed for session "${sessionId}".`;
}

function formatRatingNotFound(sessionId) {
  return `No rating found for session "${sessionId}".`;
}

module.exports = { formatStars, formatRating, formatRatingList, formatRatingSet, formatRatingRemoved, formatRatingNotFound };
