function formatPreset(preset) {
  const opts = Object.entries(preset.options)
    .map(([k, v]) => `${k}=${v}`)
    .join(', ');
  return `[${preset.name}] ${opts}`;
}

function formatPresetList(presets) {
  if (!presets.length) return 'No export presets saved.';
  return presets.map(formatPreset).join('\n');
}

function formatPresetSet(name) {
  return `Export preset "${name}" saved.`;
}

function formatPresetRemoved(name) {
  return `Export preset "${name}" removed.`;
}

function formatPresetNotFound(name) {
  return `Export preset "${name}" not found.`;
}

module.exports = { formatPreset, formatPresetList, formatPresetSet, formatPresetRemoved, formatPresetNotFound };
