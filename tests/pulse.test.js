const { recordPulse, getPulse, clearPulse, pulseSummary, loadPulse, savePulse } = require('../src/pulse');
const { formatPulseEntry, formatPulseList, formatPulseRecorded, formatPulseCleared, formatPulseSummary } = require('../src/pulse-format');

function resetPulse() { savePulse([]); }

describe('pulse', () => {
  beforeEach(resetPulse);

  test('recordPulse adds an entry', () => {
    const entry = recordPulse('sess1', 'export', { format: 'md' });
    expect(entry.sessionId).toBe('sess1');
    expect(entry.action).toBe('export');
    expect(entry.meta.format).toBe('md');
    expect(entry.timestamp).toBeDefined();
    expect(entry.id).toBeDefined();
  });

  test('getPulse returns all entries when no sessionId', () => {
    recordPulse('s1', 'import');
    recordPulse('s2', 'export');
    expect(getPulse().length).toBe(2);
  });

  test('getPulse filters by sessionId', () => {
    recordPulse('s1', 'import');
    recordPulse('s2', 'export');
    const results = getPulse('s1');
    expect(results.length).toBe(1);
    expect(results[0].sessionId).toBe('s1');
  });

  test('clearPulse removes all entries', () => {
    recordPulse('s1', 'import');
    clearPulse();
    expect(loadPulse().length).toBe(0);
  });

  test('clearPulse removes entries for a specific session', () => {
    recordPulse('s1', 'import');
    recordPulse('s2', 'export');
    clearPulse('s1');
    const remaining = loadPulse();
    expect(remaining.length).toBe(1);
    expect(remaining[0].sessionId).toBe('s2');
  });

  test('pulseSummary counts actions', () => {
    recordPulse('s1', 'export');
    recordPulse('s1', 'export');
    recordPulse('s1', 'import');
    const summary = pulseSummary('s1');
    expect(summary.total).toBe(3);
    expect(summary.counts.export).toBe(2);
    expect(summary.counts.import).toBe(1);
    expect(summary.latest).not.toBeNull();
  });

  test('formatPulseList shows no entries message', () => {
    expect(formatPulseList([])).toMatch(/No pulse/);
  });

  test('formatPulseRecorded includes action and session', () => {
    const entry = recordPulse('mySession', 'tag');
    const msg = formatPulseRecorded(entry);
    expect(msg).toMatch('tag');
    expect(msg).toMatch('mySession');
  });

  test('formatPulseCleared with session', () => {
    expect(formatPulseCleared('s1')).toMatch('s1');
  });

  test('formatPulseSummary with no activity', () => {
    expect(formatPulseSummary({ total: 0, counts: {}, latest: null })).toMatch(/No pulse/);
  });

  test('formatPulseSummary with data', () => {
    recordPulse('s1', 'export');
    const summary = pulseSummary('s1');
    const out = formatPulseSummary(summary);
    expect(out).toMatch('Total events: 1');
    expect(out).toMatch('export: 1');
  });
});
