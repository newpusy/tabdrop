const fs = require('fs');
const path = require('path');
const os = require('os');

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-remind-'));
process.env.HOME = tmpDir;

const { loadReminders, addReminder, removeReminder, getDueReminders, markDone } = require('../src/remind');

describe('remind', () => {
  beforeEach(() => {
    const f = path.join(tmpDir, '.tabdrop', 'reminders.json');
    if (fs.existsSync(f)) fs.writeFileSync(f, '[]');
  });

  test('starts empty', () => {
    expect(loadReminders()).toEqual([]);
  });

  test('addReminder stores entry', () => {
    const r = addReminder('sess1', 'review tabs', '2099-01-01');
    expect(r.sessionId).toBe('sess1');
    expect(r.message).toBe('review tabs');
    expect(r.done).toBe(false);
    expect(loadReminders()).toHaveLength(1);
  });

  test('removeReminder deletes by id', () => {
    const r = addReminder('sess1', 'test', '2099-01-01');
    expect(removeReminder(r.id)).toBe(true);
    expect(loadReminders()).toHaveLength(0);
  });

  test('removeReminder returns false for unknown id', () => {
    expect(removeReminder(9999)).toBe(false);
  });

  test('getDueReminders returns only past due', () => {
    addReminder('s1', 'past', '2000-01-01');
    addReminder('s2', 'future', '2099-01-01');
    const due = getDueReminders();
    expect(due).toHaveLength(1);
    expect(due[0].message).toBe('past');
  });

  test('markDone sets done flag', () => {
    const r = addReminder('s1', 'do it', '2000-01-01');
    expect(markDone(r.id)).toBe(true);
    expect(getDueReminders()).toHaveLength(0);
  });

  test('markDone returns false for unknown id', () => {
    expect(markDone(9999)).toBe(false);
  });
});
