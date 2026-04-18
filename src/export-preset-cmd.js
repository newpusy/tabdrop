const { setPreset, getPreset, removePreset, listPresets } = require('./export-preset');
const {
  formatPreset,
  formatPresetList,
  formatPresetSet,
  formatPresetRemoved,
  formatPresetNotFound
} = require('./export-preset-format');

function cmdPresetSet(name, options) {
  const preset = setPreset(name, options);
  console.log(formatPresetSet(preset.name));
}

function cmdPresetGet(name) {
  const preset = getPreset(name);
  if (!preset) return console.log(formatPresetNotFound(name));
  console.log(formatPreset(preset));
}

function cmdPresetRemove(name) {
  const removed = removePreset(name);
  if (!removed) return console.log(formatPresetNotFound(name));
  console.log(formatPresetRemoved(name));
}

function cmdPresetList() {
  const presets = listPresets();
  console.log(formatPresetList(presets));
}

module.exports = { cmdPresetSet, cmdPresetGet, cmdPresetRemove, cmdPresetList };
