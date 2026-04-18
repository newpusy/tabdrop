// Terminal color helpers for tabdrop CLI output

const: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

const NO_COLOR = process.env.NO_COLOR || process.env.CI;

function colorize(text, ...codes) {
  if (NO_COLOR) return text;
  const open = codes.map(c => COLORS[c] || '').join('');
  return `${open}${text}${COLORS.reset}`;
}

const color = {
  bold: (t) => colorize(t, 'bold'),
  dim: (t) => colorize(t, 'dim'),
  red: (t) => colorize(t, 'red'),
  green: (t) => colorize(t, 'green'),
  yellow: (t) => colorize(t, 'yellow'),
  blue: (t) => colorize(t, 'blue'),
  cyan: (t) => colorize(t, 'cyan'),
  white: (t) => colorize(t, 'white'),
  success: (t) => colorize(t, 'green', 'bold'),
  error: (t) => colorize(t, 'red', 'bold'),
  warn: (t) => colorize(t, 'yellow'),
  info: (t) => colorize(t, 'cyan'),
  label: (t) => colorize(t, 'blue', 'bold'),
  muted: (t) => colorize(t, 'dim'),
};

module.exports = { color, colorize, COLORS };
