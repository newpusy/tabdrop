const {
  formatMerged,
  formatMergeConflict,
  formatMergeSummary,
  formatMergeList,
  formatMergeEmpty
} = require('../src/merge-format');

const makeSession = (title, tabs) => ({ title, tabs });

describe('formatMerged', () => {
  it('includes title and tab count', () => {
    const s = makeSession('Work', [1, 2, 3]);
    expect(formatMerged(s)).toMatch('Work');
    expect(formatMerged(s)).toMatch('3 tabs');
  });

  it('handles missing title', () => {
    const s = makeSession(undefined, [1]);
    expect(formatMerged(s)).toMatch('Untitled');
  });
});

describe('formatMergeConflict', () => {
  it('includes the url', () => {
    expect(formatMergeConflict('https://example.com')).toMatch('https://example.com');
  });
});

describe('formatMergeSummary', () => {
  it('shows added count', () => {
    expect(formatMergeSummary(5, 0)).toBe('Added 5 tabs');
  });

  it('shows skipped when nonzero', () => {
    expect(formatMergeSummary(3, 2)).toMatch('skipped 2 duplicates');
  });

  it('handles singular', () => {
    expect(formatMergeSummary(1, 1)).toMatch('1 tab');
    expect(formatMergeSummary(1, 1)).toMatch('1 duplicate');
  });
});

describe('formatMergeList', () => {
  it('returns message for empty list', () => {
    expect(formatMergeList([])).toMatch('No sessions');
  });

  it('lists sessions with index', () => {
    const sessions = [makeSession('A', [1]), makeSession('B', [1, 2])];
    const out = formatMergeList(sessions);
    expect(out).toMatch('1.');
    expect(out).toMatch('A');
    expect(out).toMatch('2.');
    expect(out).toMatch('B');
  });
});

describe('formatMergeEmpty', () => {
  it('returns a message', () => {
    expect(formatMergeEmpty()).toMatch('Nothing to merge');
  });
});
