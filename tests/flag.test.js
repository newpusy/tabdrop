const fs = require('fs');
const path = require('path');
const os = require('os');

let tmpDir;
beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-flag-'));
  process.env.HOME = tmpDir;
  jest.resetModules();
});

function getFlag() {
  return require('../src/flag');
}

test('setFlag adds a flag to a session', () => {
  const { setFlag, getFlags } = getFlag();
  setFlag('s1', 'important');
  expect(getFlags('s1')).toContain('important');
});

test('setFlag does not duplicate flags', () => {
  const { setFlag, getFlags } = getFlag();
  setFlag('s1', 'review');
  setFlag('s1', 'review');
  expect(getFlags('s1').filter(f => f === 'review').length).toBe(1);
});

test('removeFlag removes a flag', () => {
  const { setFlag, removeFlag, getFlags } = getFlag();
  setFlag('s1', 'todo');
  removeFlag('s1', 'todo');
  expect(getFlags('s1')).not.toContain('todo');
});

test('getFlags returns empty array for unknown session', () => {
  const { getFlags } = getFlag();
  expect(getFlags('unknown')).toEqual([]);
});

test('listAllFlags returns all flagged sessions', () => {
  const { setFlag, listAllFlags } = getFlag();
  setFlag('s1', 'important');
  setFlag('s2', 'review');
  const all = listAllFlags();
  expect(all['s1']).toContain('important');
  expect(all['s2']).toContain('review');
});

test('clearFlags removes all flags for a session', () => {
  const { setFlag, clearFlags, getFlags } = getFlag();
  setFlag('s1', 'important');
  clearFlags('s1');
  expect(getFlags('s1')).toEqual([]);
});
