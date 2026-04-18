const {
  formatPreset,
  formatPresetList,
  formatPresetSet,
  formatPresetRemoved,
  formatPresetNotFound
} = require('../src/export-preset-format');

const samplePreset = {
  name: 'compact',
  options: { format: 'md', noDate: true },
  createdAt: '2024-01-01T00:00:00.000Z'
};

test('formatPreset includes name and options', () => {
  const out = formatPreset(samplePreset);
  expect(out).toContain('compact');
  expect(out).toContain('format=md');
});

test('formatPresetList with presets', () => {
  const out = formatPresetList([samplePreset]);
  expect(out).toContain('compact');
});

test('formatPresetList empty', () => {
  expect(formatPresetList([])).toMatch(/no export presets/i);
});

test('formatPresetSet', () => {
  expect(formatPresetSet('compact')).toContain('compact');
});

test('formatPresetRemoved', () => {
  expect(formatPresetRemoved('compact')).toContain('removed');
});

test('formatPresetNotFound', () => {
  expect(formatPresetNotFound('ghost')).toContain('not found');
});
