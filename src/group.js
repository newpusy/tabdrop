const fs = require('fs');
const path = require('path');

const GROUPS_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'groups.json');

function ensureGroupsFile() {
  const dir = path.dirname(GROUPS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(GROUPS_FILE)) fs.writeFileSync(GROUPS_FILE, JSON.stringify({}));
}

function loadGroups() {
  ensureGroupsFile();
  return JSON.parse(fs.readFileSync(GROUPS_FILE, 'utf8'));
}

function saveGroups(groups) {
  ensureGroupsFile();
  fs.writeFileSync(GROUPS_FILE, JSON.stringify(groups, null, 2));
}

function setGroup(name, sessionIds) {
  const groups = loadGroups();
  groups[name] = { name, sessionIds, createdAt: groups[name]?.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() };
  saveGroups(groups);
  return groups[name];
}

function getGroup(name) {
  const groups = loadGroups();
  return groups[name] || null;
}

function removeGroup(name) {
  const groups = loadGroups();
  if (!groups[name]) return false;
  delete groups[name];
  saveGroups(groups);
  return true;
}

function listGroups() {
  return Object.values(loadGroups());
}

function addToGroup(name, sessionId) {
  const groups = loadGroups();
  if (!groups[name]) return null;
  if (!groups[name].sessionIds.includes(sessionId)) {
    groups[name].sessionIds.push(sessionId);
    groups[name].updatedAt = new Date().toISOString();
    saveGroups(groups);
  }
  return groups[name];
}

function removeFromGroup(name, sessionId) {
  const groups = loadGroups();
  if (!groups[name]) return null;
  groups[name].sessionIds = groups[name].sessionIds.filter(id => id !== sessionId);
  groups[name].updatedAt = new Date().toISOString();
  saveGroups(groups);
  return groups[name];
}

/**
 * Returns all groups that contain the given sessionId.
 */
function getGroupsForSession(sessionId) {
  return Object.values(loadGroups()).filter(group => group.sessionIds.includes(sessionId));
}

module.exports = { ensureGroupsFile, loadGroups, saveGroups, setGroup, getGroup, removeGroup, listGroups, addToGroup, removeFromGroup, getGroupsForSession };
