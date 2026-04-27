const {
  buildReplayPlan,
  describeReplay,
  replayToText,
  filterReplayByDomain,
} = require('../src/replay');

const session = {
  windows: [
    {
      tabs: [
        { url: 'https://example.com', title: 'Example' },
        { url: 'https://github.com', title: 'GitHub' },
      ],
    },
    {
      tabs: [{ url: 'https://news.ycombinator.com', title: 'HN' }],
    },
  ],
};

test('buildReplayPlan returns one step per tab', () => {
  const steps = buildReplayPlan(session);
  expect(steps).toHaveLength(3);
  expect(steps[0].url).toBe('https://example.com');
  expect(steps[2].url).toBe('https://news.ycombinator.com');
});

test('buildReplayPlan respects windowIndex option', () => {
  const steps = buildReplayPlan(session, { windowIndex: 1 });
  expect(steps).toHaveLength(1);
  expect(steps[0].url).toBe('https://news.ycombinator.com');
});

test('buildReplayPlan respects limit option', () => {
  const steps = buildReplayPlan(session, { limit: 1 });
  expect(steps).toHaveLength(2); // 1 per window
});

test('buildReplayPlan applies delay to non-first tabs in window', () => {
  const steps = buildReplayPlan(session, { delay: 200 });
  expect(steps[0].delay).toBe(0);
  expect(steps[1].delay).toBe(200);
  expect(steps[2].delay).toBe(0); // first tab of second window
});

test('buildReplayPlan throws on invalid session', () => {
  expect(() => buildReplayPlan(null)).toThrow();
  expect(() => buildReplayPlan({})).toThrow();
});

test('buildReplayPlan throws on invalid windowIndex', () => {
  expect(() => buildReplayPlan(session, { windowIndex: 99 })).toThrow();
});

test('describeReplay summarises steps', () => {
  const steps = buildReplayPlan(session);
  const desc = describeReplay(steps);
  expect(desc).toMatch('3 tab(s)');
  expect(desc).toMatch('2 window(s)');
});

test('replayToText produces one line per step', () => {
  const steps = buildReplayPlan(session);
  const text = replayToText(steps);
  const lines = text.trim().split('\n');
  expect(lines).toHaveLength(3);
  expect(lines[0]).toMatch('[1]');
  expect(lines[0]).toMatch('https://example.com');
});

test('filterReplayByDomain filters steps by domain', () => {
  const steps = buildReplayPlan(session);
  const filtered = filterReplayByDomain(steps, 'github.com');
  expect(filtered).toHaveLength(1);
  expect(filtered[0].url).toBe('https://github.com');
});
