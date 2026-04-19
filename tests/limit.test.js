const { limitTabs, limitWindows, totalTabs, describeLimit } = require('../src/limit');

const makeSession = (windowTabCounts) => ({
  windows: windowTabCounts.map((n, i) => ({
    id: i + 1,
    tabs: Array.from({ length: n }, (_, j) => ({ title: `Tab ${j}`, url: `https://example.com/${j}` }))
  }))
});

describe('totalTabs', () => {
  it('counts all tabs', () => {
    expect(totalTabs(makeSession([3, 2]))).toBe(5);
  });
  it('returns 0 for empty session', () => {
    expect(totalTabs({ windows: [] })).toBe(0);
  });
});

describe('limitTabs', () => {
  it('caps total tabs across windows', () => {
    const s = limitTabs(makeSession([3, 3]), 4);
    expect(totalTabs(s)).toBe(4);
  });
  it('returns all tabs if under limit', () => {
    const s = limitTabs(makeSession([2, 2]), 10);
    expect(totalTabs(s)).toBe(4);
  });
  it('handles null session', () => {
    expect(limitTabs(null, 5)).toBeNull();
  });
  it('drops empty windows after cut', () => {
    const s = limitTabs(makeSession([2, 3]), 2);
    expect(s.windows.length).toBe(1);
  });
});

describe('limitWindows', () => {
  it('caps number of windows', () => {
    const s = limitWindows(makeSession([2, 2, 2]), 2);
    expect(s.windows.length).toBe(2);
  });
  it('returns all if under limit', () => {
    const s = limitWindows(makeSession([1, 1]), 5);
    expect(s.windows.length).toBe(2);
  });
});

describe('describeLimit', () => {
  it('reports dropped tabs', () => {
    const orig = makeSession([5]);
    const lim = limitTabs(orig, 3);
    expect(describeLimit(orig, lim)).toMatch(/dropped 2/);
  });
  it('reports no drop when nothing removed', () => {
    const orig = makeSession([2]);
    expect(describeLimit(orig, orig)).toMatch(/No tabs dropped/);
  });
});
