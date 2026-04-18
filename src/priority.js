const fs = require('fs');
const path = require('path');

const PRIORITIES = ['low', 'normal', 'high', 'urgent'];
const PRIORITY_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'priorities.json');

function ensurePriorityFile() {
  const dir = path.dirname(PRIORITY_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(PRIORITY_FILE)) fs.writeFileSync(PRIORITY_FILE, '{}');
}

function loadPriorities() {
  ensurePriorityFile();
  return JSON.parse(fs.readFileSync(PRIORITY_FILE, 'utf8'));
}

function savePriorities(priorities) {
  ensurePriorityFile();
  fs.writeFileSync(PRIORITY_FILE, JSON.stringify(priorities, null, 2));
}

function isValidPriority(level) {
  return PRIORITIES.includes(level);
}

function setPriority(sessionId, level) {
  if (!isValidPriority(level)) throw new Error(`Invalid priority: ${level}. Must be one of: ${PRIORITIES.join(', ')}`);
  const priorities = loadPriorities();
  priorities[sessionId] = level;
  savePriorities(priorities);
  return level;
}

function getPriority(sessionId) {
  const priorities = loadPriorities();
  return priorities[sessionId] || 'normal';
}

function removePriority(sessionId) {
  const priorities = loadPriorities();
  const had = sessionId in priorities;
  delete priorities[sessionId];
  savePriorities(priorities);
  return had;
}

function listPriorities() {
  return loadPriorities();
}

function filterByPriority(sessionIds, level) {
  if (!isValidPriority(level)) throw new Error(`Invalid priority: ${level}`);
  const priorities = loadPriorities();
  return sessionIds.filter(id => (priorities[id] || 'normal') === level);
}

module.exports = { isValidPriority, setPriority, getPriority, removePriority, listPriorities, filterByPriority, PRIORITIES };
