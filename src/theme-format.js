function formatTheme(name, colors, isActive) {
  const marker = isActive ? ' (active)' : '';
  const parts = Object.entries(colors).map(([k, v]) => `${k}=${v}`).join(', ');
  return `${name}${marker}: ${parts}`;
}

function formatThemeList({ themes, active }) {
  const lines = Object.entries(themes).map(([name, colors]) =>
    formatTheme(name, colors, name === active)
  );
  return lines.length ? lines.join('\n') : 'No themes found.';
}

function formatThemeSet(name) {
  return `Active theme set to: ${name}`;
}

function formatThemeRemoved(name) {
  return `Custom theme removed: ${name}`;
}

function formatThemeNotFound(name) {
  return `Theme not found: ${name}`;
}

function formatThemeAdded(name) {
  return `Custom theme saved: ${name}`;
}

module.exports = { formatTheme, formatThemeList, formatThemeSet, formatThemeRemoved, formatThemeNotFound, formatThemeAdded };
