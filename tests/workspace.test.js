const fs = require('fs');
const os = require('os');
const path = require('path');

jest.mock('os', () => ({ homedir: () => '/tmp/tabdrop-test-workspace' }));

const { setWorkspace, getWorkspace, removeWorkspace, listWorkspaces, loadWorkspaces } = require('../src/workspace');

const WORKSPACE_FILE = path.join('/tmp/tabdrop-test-workspace', '.tabdrop', 'workspaces', 'workspaces.json');

afterEach(() => {
  if (fs.existsSync(WORKSPACE_FILE)) fs.unlinkSync(WORKSPACE_FILE);
});

const mockSession = { tabs: [{ title: 'Google', url: 'https://google.com' }] };

test('setWorkspace saves a workspace', () => {
  const ws = setWorkspace('work', mockSession);
  expect(ws.name).toBe('work');
  expect(ws.session).toEqual(mockSession);
  expect(ws.updatedAt).toBeDefined();
});

test('getWorkspace retrieves saved workspace', () => {
  setWorkspace('home', mockSession);
  const ws = getWorkspace('home');
  expect(ws).not.toBeNull();
  expect(ws.name).toBe('home');
});

test('getWorkspace returns null for missing workspace', () => {
  expect(getWorkspace('nonexistent')).toBeNull();
});

test('removeWorkspace deletes a workspace', () => {
  setWorkspace('temp', mockSession);
  const result = removeWorkspace('temp');
  expect(result).toBe(true);
  expect(getWorkspace('temp')).toBeNull();
});

test('removeWorkspace returns false if not found', () => {
  expect(removeWorkspace('ghost')).toBe(false);
});

test('listWorkspaces returns all workspaces', () => {
  setWorkspace('ws1', mockSession);
  setWorkspace('ws2', mockSession);
  const list = listWorkspaces();
  expect(list.length).toBe(2);
  expect(list.map(w => w.name)).toContain('ws1');
});

test('setWorkspace throws on invalid name', () => {
  expect(() => setWorkspace('', mockSession)).toThrow('Invalid workspace name');
});
