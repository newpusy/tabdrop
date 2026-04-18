const fs = require('fs');
const path = require('path');
const os = require('os');

let tmpDir;
beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-rating-'));
  process.env.HOME = tmpDir;
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

const { setRating, getRating, removeRating, listRatings } = require('../src/rating');

test('setRating stores a score', () => {
  const r = setRating('sess1', 4);
  expect(r.score).toBe(4);
  expect(r.updatedAt).toBeDefined();
});

test('getRating returns stored rating', () => {
  setRating('sess1', 3);
  const r = getRating('sess1');
  expect(r.score).toBe(3);
});

test('getRating returns null for unknown session', () => {
  expect(getRating('unknown')).toBeNull();
});

test('setRating throws for out-of-range score', () => {
  expect(() => setRating('sess1', 0)).toThrow();
  expect(() => setRating('sess1', 6)).toThrow();
});

test('removeRating deletes a rating', () => {
  setRating('sess1', 5);
  expect(removeRating('sess1')).toBe(true);
  expect(getRating('sess1')).toBeNull();
});

test('removeRating returns false if not found', () => {
  expect(removeRating('nope')).toBe(false);
});

test('listRatings returns all ratings', () => {
  setRating('a', 1);
  setRating('b', 5);
  const all = listRatings();
  expect(Object.keys(all)).toHaveLength(2);
});
