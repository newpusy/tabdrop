import { describe, it, expect } from 'vitest';
import { diffSessions, formatDiff, hasDiff } from '../src/diff.js';

const sessionA = {
  windows: [
    { tabs: [{ url: 'https://github.com' }, { url: 'https://example.com' }] },
  ],
};

const sessionB = {
  windows: [
    { tabs: [{ url: 'https://github.com' }, { url: 'https://newsite.com' }] },
  ],
};

describe('diffSessions', () => {
  it('detects added urls', () => {
    const diff = diffSessions(sessionA, sessionB);
    expect(diff.added).toContain('https://newsite.com');
  });

  it('detects removed urls', () => {
    const diff = diffSessions(sessionA, sessionB);
    expect(diff.removed).toContain('https://example.com');
  });

  it('detects common urls', () => {
    const diff = diffSessions(sessionA, sessionB);
    expect(diff.common).toContain('https://github.com');
  });

  it('returns empty diff for identical sessions', () => {
    const diff = diffSessions(sessionA, sessionA);
    expect(hasDiff(diff)).toBe(false);
  });
});

describe('formatDiff', () => {
  it('formats diff as readable text', () => {
    const diff = diffSessions(sessionA, sessionB);
    const text = formatDiff(diff);
    expect(text).toContain('Added');
    expect(text).toContain('Removed');
    expect(text).toContain('newsite.com');
  });
});
