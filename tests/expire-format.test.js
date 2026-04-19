const {
  formatExpiry,
  formatExpiryList,
  formatExpirySet,
  formatExpiryRemoved,
  formatExpiryNotFound,
  formatExpiredList
} = require('../src/expire-format');

const future = { id: 'sess1', expiresAt: Date.now() + 86400000, days: 1 };
const past = { id: 'sess2', expiresAt: Date.now() - 1000, days: 1 };

test('formatExpiry shows id and days', () => {
  const out = formatExpiry(future);
  expect(out).toContain('sess1');
  expect(out).toContain('1d');
});

test('formatExpiry marks expired entries', () => {
  const out = formatExpiry(past);
  expect(out).toContain('[EXPIRED]');
});

test('formatExpiryList returns message when empty', () => {
  expect(formatExpiryList([])).toMatch(/no expiry/i);
});

test('formatExpiryList lists entries', () => {
  const out = formatExpiryList([future]);
  expect(out).toContain('sess1');
});

test('formatExpirySet confirms set', () => {
  const entry = { expiresAt: Date.now() + 86400000, days: 5 };
  const out = formatExpirySet('mySession', entry);
  expect(out).toContain('mySession');
  expect(out).toContain('5 day');
});

test('formatExpiryRemoved confirms removal', () => {
  expect(formatExpiryRemoved('x')).toContain('x');
});

test('formatExpiryNotFound indicates missing', () => {
  expect(formatExpiryNotFound('y')).toContain('y');
});

test('formatExpiredList empty message', () => {
  expect(formatExpiredList([])).toMatch(/no expired/i);
});

test('formatExpiredList lists expired', () => {
  const out = formatExpiredList([past]);
  expect(out).toContain('sess2');
});
