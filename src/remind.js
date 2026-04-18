const fs = require('fs');
const path = require('path');

const REMIND_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'reminders.json');

function ensureRemindFile() {
  const dir = path.dirname(REMIND_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(REMIND_FILE)) fs.writeFileSync(REMIND_FILE, '[]');
}

function loadReminders() {
  ensureRemindFile();
  return JSON.parse(fs.readFileSync(REMIND_FILE, 'utf8'));
}

function saveReminders(reminders) {
  ensureRemindFile();
  fs.writeFileSync(REMIND_FILE, JSON.stringify(reminders, null, 2));
}

function addReminder(sessionId, message, dueDate) {
  const reminders = loadReminders();
  const entry = { id: Date.now(), sessionId, message, dueDate: new Date(dueDate).toISOString(), done: false };
  reminders.push(entry);
  saveReminders(reminders);
  return entry;
}

function removeReminder(id) {
  const reminders = loadReminders();
  const filtered = reminders.filter(r => r.id !== id);
  if (filtered.length === reminders.length) return false;
  saveReminders(filtered);
  return true;
}

function getDueReminders(now = new Date()) {
  return loadReminders().filter(r => !r.done && new Date(r.dueDate) <= now);
}

function markDone(id) {
  const reminders = loadReminders();
  const r = reminders.find(r => r.id === id);
  if (!r) return false;
  r.done = true;
  saveReminders(reminders);
  return true;
}

module.exports = { loadReminders, addReminder, removeReminder, getDueReminders, markDone };
