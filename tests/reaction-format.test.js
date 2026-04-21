const {
  formatReaction,
  formatReactionList,
  formatReactionSet,
  formatReactionRemoved,
  formatReactionNotFound,
  formatInvalidReaction,
  formatFilteredReactions
} = require('../src/reaction-format');

test('formatReaction shows id and emoji', () => {
  expect(formatReaction('my-session', '🔥')).toBe('my-session: 🔥');
});

test('formatReactionList shows all entries', () => {
  const result = formatReactionList({ 'a': '👍', 'b': '❤️' });
  expect(result).toContain('👍');
  expect(result).toContain('a');
  expect(result).toContain('❤️');
  expect(result).toContain('b');
});

test('formatReactionList handles empty object', () => {
  expect(formatReactionList({})).toBe('No reactions set.');
});

test('formatReactionSet includes session and emoji', () => {
  const msg = formatReactionSet('sess-1', '⭐');
  expect(msg).toContain('sess-1');
  expect(msg).toContain('⭐');
});

test('formatReactionRemoved includes session id', () => {
  expect(formatReactionRemoved('sess-2')).toContain('sess-2');
});

test('formatReactionNotFound includes session id', () => {
  expect(formatReactionNotFound('ghost')).toContain('ghost');
});

test('formatInvalidReaction includes emoji and valid list', () => {
  const msg = formatInvalidReaction('🐸', ['👍', '👎']);
  expect(msg).toContain('🐸');
  expect(msg).toContain('👍');
});

test('formatFilteredReactions lists matching ids', () => {
  const msg = formatFilteredReactions('💡', ['s1', 's3']);
  expect(msg).toContain('s1');
  expect(msg).toContain('s3');
});

test('formatFilteredReactions handles empty result', () => {
  const msg = formatFilteredReactions('💡', []);
  expect(msg).toContain('No sessions');
});
