const fs = require('fs');
const path = require('path');
const os = require('os');

const WORKSPACE_DIR = path.join(os.homedir(), '.tabdrop', 'workspaces');
const WORKSPACE_FILE = path.join(WORKSPACE_DIR, 'workspaces.json');

function ensureWorkspaceDir() {
  if (!fs.existsSync(WORKSPACE_DIR)) {
    fs.mkdirSync(WORKSPACE_DIR, { recursive: true });
  }
}

function loadWorkspaces() {
  ensureWorkspaceDir();
  if (!fs.existsSync(WORKSPACE_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(WORKSPACE_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function saveWorkspaces(workspaces) {
  ensureWorkspaceDir();
  fs.writeFileSync(WORKSPACE_FILE, JSON.stringify(workspaces, null, 2));
}

function setWorkspace(name, sessionData) {
  if (!name || typeof name !== 'string') throw new Error('Invalid workspace name');
  const workspaces = loadWorkspaces();
  workspaces[name] = { name, session: sessionData, updatedAt: new Date().toISOString() };
  saveWorkspaces(workspaces);
  return workspaces[name];
}

function getWorkspace(name) {
  const workspaces = loadWorkspaces();
  return workspaces[name] || null;
}

function removeWorkspace(name) {
  const workspaces = loadWorkspaces();
  if (!workspaces[name]) return false;
  delete workspaces[name];
  saveWorkspaces(workspaces);
  return true;
}

function listWorkspaces() {
  return Object.values(loadWorkspaces());
}

module.exports = { ensureWorkspaceDir, loadWorkspaces, saveWorkspaces, setWorkspace, getWorkspace, removeWorkspace, listWorkspaces };
