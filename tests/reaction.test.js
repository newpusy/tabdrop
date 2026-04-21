const fs = require('fs');
const path = require('path');
const os = require('os');

let tmpDir;
let reactionModule;

function getReaction() {
  jest.resetModules();
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-reaction-'));
  process.env.HOME = tmpDir;
  return require('../src/reaction');
}

beforeEach(() => {
  reactionModule = getReaction();
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test('isValidReaction accepts known emoji', () => {
  expect(reactionModule.isValidReaction('👍')).toBe(true);
  expect(reactionModule.isValidReaction('❤️')).toBe(true);
});

test('isValidReaction rejects unknown emoji', () => {
  expect(reactionModule.isValidReaction('🐸')).toBe(false);
  expect(reactionModule.isValidReaction('')).toBe(false);
});

test('setReaction and getReaction round-trip', () => {
  reactionModule.setReaction('session-1', '🔥');
  expect(reactionModule.getReaction('session-1')).toBe('🔥');
});

test('setReaction returns null for invalid emoji', () => {
  const result = reactionModule.setReaction('session-1', '🐸');
  expect(result).toBeNull();
});

test('getReaction returns null when not set', () => {
  expect(reactionModule.getReaction('missing')).toBeNull();
});

test('removeReaction removes existing reaction', () => {
  reactionModule.setReaction('session-2', '⭐');
  expect(reactionModule.removeReaction('session-2')).toBe(true);
  expect(reactionModule.getReaction('session-2')).toBeNull();
});

test('removeReaction returns false when not set', () => {
  expect(reactionModule.removeReaction('ghost')).toBe(false);
});

test('listReactions returns all reactions', () => {
  reactionModule.setReaction('a', '👍');
  reactionModule.setReaction('b', '👎');
  const list = reactionModule.listReactions();
  expect(list['a']).toBe('👍');
  expect(list['b']).toBe('👎');
});

test('filterByReaction returns matching session ids', () => {
  reactionModule.setReaction('s1', '💡');
  reactionModule.setReaction('s2', '🔥');
  reactionModule.setReaction('s3', '💡');
  const ids = reactionModule.filterByReaction('💡');
  expect(ids).toContain('s1');
  expect(ids).toContain('s3');
  expect(ids).not.toContain('s2');
});
