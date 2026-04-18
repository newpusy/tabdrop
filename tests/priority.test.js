const fs = require('fs');
const path = require('path');
const os = require('os');

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-priority-'));
process.env.HOME = tmpDir;

const { isValidPriority, setPriority, getPriority, removePriority, listPriorities, filterByPriority, PRIORITIES } = require('../src/priority');

describe('isValidPriority', () => {
  test('accepts valid priorities', () => {
    PRIORITIES.forEach(p => expect(isValidPriority(p)).toBe(true));
  });
  test('rejects invalid priority', () => {
    expect(isValidPriority('critical')).toBe(false);
    expect(isValidPriority('')).toBe(false);
  });
});

describe('setPriority / getPriority', () => {
  test('sets and gets a priority', () => {
    setPriority('session-1', 'high');
    expect(getPriority('session-1')).toBe('high');
  });
  test('defaults to normal when not set', () => {
    expect(getPriority('session-unknown')).toBe('normal');
  });
  test('throws on invalid priority', () => {
    expect(() => setPriority('session-2', 'extreme')).toThrow('Invalid priority');
  });
});

describe('removePriority', () => {
  test('removes existing priority and returns true', () => {
    setPriority('session-3', 'urgent');
    expect(removePriority('session-3')).toBe(true);
    expect(getPriority('session-3')).toBe('normal');
  });
  test('returns false if not set', () => {
    expect(removePriority('session-nope')).toBe(false);
  });
});

describe('listPriorities', () => {
  test('returns object of all set priorities', () => {
    setPriority('session-4', 'low');
    const list = listPriorities();
    expect(list['session-4']).toBe('low');
  });
});

describe('filterByPriority', () => {
  test('filters session ids by priority level', () => {
    setPriority('s-a', 'high');
    setPriority('s-b', 'low');
    setPriority('s-c', 'high');
    const result = filterByPriority(['s-a', 's-b', 's-c'], 'high');
    expect(result).toEqual(['s-a', 's-c']);
  });
  test('throws on invalid level', () => {
    expect(() => filterByPriority([], 'mega')).toThrow('Invalid priority');
  });
});
