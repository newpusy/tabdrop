const { isValidOp, buildChain, runChain, describeChain, CHAIN_OPS } = require('../src/chain');
const { formatChainList, formatChainResult, formatChainError, formatChainEmpty } = require('../src/chain-format');

const makeSession = (tabs) => ({
  windows: [{ tabs: tabs.map(url => ({ url, title: url })) }]
});

describe('chain ops', () => {
  test('CHAIN_OPS includes expected ops', () => {
    expect(CHAIN_OPS).toContain('filter');
    expect(CHAIN_OPS).toContain('dedupe');
    expect(CHAIN_OPS).toContain('sort');
  });

  test('isValidOp returns true for known ops', () => {
    expect(isValidOp('dedupe')).toBe(true);
    expect(isValidOp('limit')).toBe(true);
    expect(isValidOp('unknown')).toBe(false);
  });

  test('buildChain throws on empty array', () => {
    expect(() => buildChain([])).toThrow();
  });

  test('buildChain throws on unknown op', () => {
    expect(() => buildChain([{ op: 'explode' }])).toThrow(/Unknown chain op/);
  });

  test('buildChain returns steps for valid ops', () => {
    const steps = [{ op: 'dedupe' }, { op: 'limit', opts: { max: 5 } }];
    expect(buildChain(steps)).toEqual(steps);
  });

  test('runChain applies dedupe step', () => {
    const session = makeSession(['https://a.com', 'https://a.com', 'https://b.com']);
    const result = runChain(session, [{ op: 'dedupe' }]);
    const urls = result.windows.flatMap(w => w.tabs.map(t => t.url));
    expect(urls.filter(u => u === 'https://a.com').length).toBe(1);
  });

  test('runChain applies limit step', () => {
    const session = makeSession(['https://a.com', 'https://b.com', 'https://c.com']);
    const result = runChain(session, [{ op: 'limit', opts: { max: 2 } }]);
    const total = result.windows.reduce((n, w) => n + w.tabs.length, 0);
    expect(total).toBeLessThanOrEqual(2);
  });

  test('describeChain formats steps as string', () => {
    const steps = [{ op: 'dedupe' }, { op: 'limit', opts: { max: 3 } }];
    const desc = describeChain(steps);
    expect(desc).toContain('dedupe');
    expect(desc).toContain('limit');
    expect(desc).toContain('→');
  });
});

describe('chain-format', () => {
  test('formatChainList handles empty', () => {
    expect(formatChainList([])).toMatch(/No steps/);
  });

  test('formatChainList shows steps', () => {
    const out = formatChainList([{ op: 'dedupe' }, { op: 'limit', opts: { max: 5 } }]);
    expect(out).toContain('dedupe');
    expect(out).toContain('limit');
    expect(out).toContain('max=5');
  });

  test('formatChainResult shows tab count', () => {
    const session = makeSession(['https://a.com', 'https://b.com']);
    const out = formatChainResult(session, [{ op: 'dedupe' }]);
    expect(out).toContain('2 tabs');
    expect(out).toContain('1 step');
  });

  test('formatChainError names the bad op', () => {
    expect(formatChainError('explode')).toContain('explode');
  });

  test('formatChainEmpty returns message', () => {
    expect(formatChainEmpty()).toMatch(/empty/);
  });
});
