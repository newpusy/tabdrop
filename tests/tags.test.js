const { isValidTag, normalizeTags, tagSession, filterByTag, listAllTags } = require('../src/tags');

describe('isValidTag', () => {
  test('accepts valid tags', () => {
    expect(isValidTag('work')).toBe(true);
    expect(isValidTag('my-project')).toBe(true);
    expect(isValidTag('tab_42')).toBe(true);
  });

  test('rejects invalid tags', () => {
    expect(isValidTag('')).toBe(false);
    expect(isValidTag('Has Spaces')).toBe(false);
    expect(isValidTag('UPPER')).toBe(false);
    expect(isValidTag('a'.repeat(33))).toBe(false);
  });
});

describe('normalizeTags', () => {
  test('lowercases and dedupes', () => {
    const result = normalizeTags(['Work', 'work', 'WORK']);
    expect(result).toEqual(['work']);
  });

  test('filters invalid tags', () => {
    const result = normalizeTags(['ok', 'bad tag', '', 'also-ok']);
    expect(result).toEqual(['ok', 'also-ok']);
  });

  test('limits to 10 tags', () => {
    const many = Array.from({ length: 15 }, (_, i) => `tag${i}`);
    expect(normalizeTags(many)).toHaveLength(10);
  });

  test('handles non-array input', () => {
    expect(normalizeTags(null)).toEqual([]);
  });
});

describe('tagSession', () => {
  test('merges tags into session', () => {
    const session = { id: '1', tags: ['work'] };
    const result = tagSession(session, ['personal', 'work']);
    expect(result.tags).toEqual(['work', 'personal']);
  });

  test('does not mutate original session', () => {
    const session = { id: '1', tags: ['work'] };
    tagSession(session, ['new']);
    expect(session.tags).toEqual(['work']);
  });
});

describe('filterByTag', () => {
  const sessions = [
    { id: '1', tags: ['work', 'urgent'] },
    { id: '2', tags: ['personal'] },
    { id: '3', tags: ['work'] },
  ];

  test('returns matching sessions', () => {
    expect(filterByTag(sessions, 'work')).toHaveLength(2);
    expect(filterByTag(sessions, 'personal')).toHaveLength(1);
    expect(filterByTag(sessions, 'missing')).toHaveLength(0);
  });
});

describe('listAllTags', () => {
  test('returns sorted unique tags', () => {
    const sessions = [
      { tags: ['work', 'urgent'] },
      { tags: ['personal', 'work'] },
    ];
    expect(listAllTags(sessions)).toEqual(['personal', 'urgent', 'work']);
  });
});
