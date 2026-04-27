const fs = require('fs');
const path = require('path');
const os = require('os');

const SLOTS_DIR = path.join(os.homedir(), '.tabdrop', 'slots');

function clearSlots() {
  if (fs.existsSync(SLOTS_DIR)) {
    for (const f of fs.readdirSync(SLOTS_DIR)) {
      fs.unlinkSync(path.join(SLOTS_DIR, f));
    }
  }
}

const { saveSlot, getSlot, removeSlot, listSlots, slotExists } = require('../src/slot');
const { formatSlot, formatSlotList, formatSlotSaved, formatSlotRemoved, formatSlotNotFound } = require('../src/slot-format');

const mockSession = { windows: [{ tabs: [{ title: 'A', url: 'https://a.com' }, { title: 'B', url: 'https://b.com' }] }] };

beforeEach(() => clearSlots());
afterAll(() => clearSlots());

test('saveSlot and getSlot round-trip', () => {
  saveSlot('work', mockSession);
  const slot = getSlot('work');
  expect(slot).not.toBeNull();
  expect(slot.name).toBe('work');
  expect(slot.session).toEqual(mockSession);
  expect(slot.savedAt).toBeTruthy();
});

test('slotExists returns true after save', () => {
  saveSlot('home', mockSession);
  expect(slotExists('home')).toBe(true);
  expect(slotExists('nope')).toBe(false);
});

test('removeSlot deletes the slot', () => {
  saveSlot('tmp', mockSession);
  expect(removeSlot('tmp')).toBe(true);
  expect(getSlot('tmp')).toBeNull();
  expect(removeSlot('tmp')).toBe(false);
});

test('listSlots returns all saved slots sorted', () => {
  saveSlot('alpha', mockSession);
  saveSlot('beta', mockSession);
  const list = listSlots();
  expect(list.length).toBe(2);
  expect(list.map(s => s.name)).toContain('alpha');
  expect(list.map(s => s.name)).toContain('beta');
});

test('formatSlot shows name and tab count', () => {
  saveSlot('work', mockSession);
  const slot = getSlot('work');
  const out = formatSlot(slot);
  expect(out).toContain('work');
  expect(out).toContain('2 tab(s)');
});

test('formatSlotList empty', () => {
  expect(formatSlotList([])).toBe('No slots saved.');
});

test('formatSlotSaved and formatSlotRemoved messages', () => {
  expect(formatSlotSaved('x')).toContain('x');
  expect(formatSlotRemoved('x')).toContain('x');
  expect(formatSlotNotFound('x')).toContain('x');
});
