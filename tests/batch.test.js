const { batchApply, batchFilter, batchTag, batchExport, batchDelete, describeBatch } = require('../src/batch');

const s1 = { id: 'a', windows: [{ tabs: [{ title: 'A', url: 'https://a.com' }] }], tags: [] };
const s2 = { id: 'b', windows: [{ tabs: [{ title: 'B', url: 'https://b.com' }] }], tags: [] };
const sessions = [s1, s2];

test('batchApply maps fn over sessions', () => {
  const results = batchApply(sessions, s => s.id.toUpperCase());
  expect(results).toEqual([{ id: 'a', result: 'A' }, { id: 'b', result: 'B' }]);
});

test('batchFilter filters sessions', () => {
  const filtered = batchFilter(sessions, s => s.id === 'a');
  expect(filtered).toHaveLength(1);
  expect(filtered[0].id).toBe('a');
});

test('batchTag adds tags to all sessions', () => {
  const tagged = batchTag(sessions, ['work']);
  tagged.forEach(s => expect(s.tags).toContain('work'));
});

test('batchExport returns content for each session', () => {
  const exported = batchExport(sessions, 'json');
  expect(exported).toHaveLength(2);
  exported.forEach(e => expect(e.content).toBeTruthy());
});

test('batchDelete removes sessions by id', () => {
  const remaining = batchDelete(sessions, ['a']);
  expect(remaining).toHaveLength(1);
  expect(remaining[0].id).toBe('b');
});

test('describeBatch returns summary string', () => {
  const results = [{ id: 'a', result: 'ok' }, { id: 'b', result: null }];
  const desc = describeBatch(results);
  expect(desc).toMatch(/1\/2/);
});
