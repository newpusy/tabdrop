const { color, colorize } = require('../src/color');

describe('color', () => {
  const originalNoColor = process.env.NO_COLOR;

  afterEach(() => {
    if (originalNoColor === undefined) {
      delete process.env.NO_COLOR;
    } else {
      process.env.NO_COLOR = originalNoColor;
    }
  });

  test('colorize wraps text with escape codes', () => {
    delete process.env.NO_COLOR;
    const result = colorize('hello', 'red');
    expect(result).toContain('hello');
    expect(result).toContain('\x1b[31m');
    expect(result).toContain('\x1b[0m');
  });

  test('colorize returns plain text when NO_COLOR is set', () => {
    process.env.NO_COLOR = '1';
    const result = colorize('hello', 'red');
    expect(result).toBe('hello');
  });

  test('color.success applies green bold', () => {
    delete process.env.NO_COLOR;
    const result = color.success('done');
    expect(result).toContain('done');
    expect(result).toContain('\x1b[32m');
    expect(result).toContain('\x1b[1m');
  });

  test('color.error applies red bold', () => {
    delete process.env.NO_COLOR;
    const result = color.error('fail');
    expect(result).toContain('\x1b[31m');
    expect(result).toContain('\x1b[1m');
  });

  test('color.muted applies dim', () => {
    delete process.env.NO_COLOR;
    const result = color.muted('quiet');
    expect(result).toContain('\x1b[2m');
  });

  test('all color helpers return strings containing the text', () => {
    delete process.env.NO_COLOR;
    const methods = ['bold','dim','red','green','yellow','blue','cyan','white','info','label','warn'];
    methods.forEach(m => {
      expect(color[m]('test')).toContain('test');
    });
  });
});
