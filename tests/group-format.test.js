const { formatGroup, formatGroupList, formatGroupSet, formatGroupRemoved, formatGroupNotFound, formatSessionAdded, formatSessionRemoved } = require('../src/group-format');

const mockGroup = { name: 'work', sessionIds: ['s1', 's2'], updatedAt: '2024-06-01T10:00:00.000Z' };

test('formatGroup shows name and count', () => {
  const out = formatGroup(mockGroup);
  expect(out).toContain('work');
  expect(out).toContain('2 sessions');
});

test('formatGroup singular for one session', () => {
  const out = formatGroup({ ...mockGroup, sessionIds: ['s1'] });
  expect(out).toContain('1 session');
  expect(out).not.toContain('sessions');
});

test('formatGroupList empty message', () => {
  expect(formatGroupList([])).toBe('No groups found.');
});

test('formatGroupList multiple', () => {
  const out = formatGroupList([mockGroup, { ...mockGroup, name: 'personal' }]);
  expect(out).toContain('work');
  expect(out).toContain('personal');
});

test('formatGroupSet message', () => {
  expect(formatGroupSet('work', ['s1', 's2'])).toContain('work');
});

test('formatGroupRemoved message', () => {
  expect(formatGroupRemoved('work')).toContain('work');
});

test('formatGroupNotFound message', () => {
  expect(formatGroupNotFound('x')).toContain('x');
});

test('formatSessionAdded message', () => {
  expect(formatSessionAdded('work', 'abc')).toContain('abc');
});

test('formatSessionRemoved message', () => {
  expect(formatSessionRemoved('work', 'abc')).toContain('removed');
});
