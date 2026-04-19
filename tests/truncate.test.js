const { truncateStr, truncateTitle, truncateUrl, truncateTab, truncateSession, describeTruncate } = require('../src/truncate');

describe('truncateStr', () => {
  it('returns short strings unchanged', () => {
    expect(truncateStr('hello', 10)).toBe('hello');
  });
  it('truncates long strings with ellipsis', () => {
    const result = truncateStr('abcdefghij', 7);
    expect(result).toBe('abcd...');
    expect(result.length).toBe(7);
  });
  it('handles null/undefined', () => {
    expect(truncateStr(null, 10)).toBeNull();
    expect(truncateStr(undefined, 10)).toBeUndefined();
  });
});

describe('truncateTitle', () => {
  it('uses default length of 60', () => {
    const long = 'a'.repeat(70);
    expect(truncateTitle(long).length).toBe(60);
    expect(truncateTitle(long).endsWith('...')).toBe(true);
  });
  it('respects custom length', () => {
    expect(truncateTitle('hello world', 8)).toBe('hello...');
  });
});

describe('truncateUrl', () => {
  it('truncates long URLs', () => {
    const url = 'https://example.com/' + 'x'.repeat(80);
    const result = truncateUrl(url);
    expect(result.length).toBe(80);
  });
});

describe('truncateTab', () => {
  it('truncates title and url in a tab', () => {
    const tab = { title: 'a'.repeat(70), url: 'https://' + 'b'.repeat(90) };
    const result = truncateTab(tab);
    expect(result.title.length).toBe(60);
    expect(result.url.length).toBe(80);
  });
  it('preserves other tab fields', () => {
    const tab = { title: 'hi', url: 'https://x.com', pinned: true };
    expect(truncateTab(tab).pinned).toBe(true);
  });
});

describe('truncateSession', () => {
  it('truncates all tabs in session', () => {
    const session = {
      windows: [{ tabs: [{ title: 'a'.repeat(70), url: 'u'.repeat(90) }] }],
    };
    const result = truncateSession(session);
    expect(result.windows[0].tabs[0].title.length).toBe(60);
  });
});

describe('describeTruncate', () => {
  it('returns description with defaults', () => {
    expect(describeTruncate()).toBe('titles capped at 60 chars, URLs capped at 80 chars');
  });
  it('uses custom opts', () => {
    expect(describeTruncate({ titleLen: 30, urlLen: 50 })).toBe('titles capped at 30 chars, URLs capped at 50 chars');
  });
});
