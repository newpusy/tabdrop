import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  loadHistory,
  saveHistory,
  addHistoryEntry,
  clearHistory,
  describeHistory,
} from '../src/history.js';

const HISTORY_FILE = path.join(os.homedir(), '.tabdrop', 'history.json');

describe('history', () => {
  beforeEach(() => {
    if (fs.existsSync(HISTORY_FILE)) fs.unlinkSync(HISTORY_FILE);
  });

  afterEach(() => {
    if (fs.existsSync(HISTORY_FILE)) fs.unlinkSync(HISTORY_FILE);
  });

  it('returns empty array when no history file exists', () => {
    expect(loadHistory()).toEqual([]);
  });

  it('saves and loads history entries', () => {
    const entry = { id: 1, timestamp: '2024-01-01T00:00:00.000Z', file: 'tabs.md', format: 'markdown', tabCount: 5, windowCount: 2, action: 'export' };
    saveHistory([entry]);
    const loaded = loadHistory();
    expect(loaded).toHaveLength(1);
    expect(loaded[0].file).toBe('tabs.md');
  });

  it('addHistoryEntry appends an entry', () => {
    addHistoryEntry({ file: 'out.json', format: 'json', tabCount: 3, windowCount: 1, action: 'export' });
    const entries = loadHistory();
    expect(entries).toHaveLength(1);
    expect(entries[0].action).toBe('export');
    expect(entries[0].format).toBe('json');
  });

  it('clearHistory empties the log', () => {
    addHistoryEntry({ file: 'a.md', format: 'markdown', tabCount: 2, windowCount: 1, action: 'import' });
    clearHistory();
    expect(loadHistory()).toEqual([]);
  });

  it('describeHistory returns readable string', () => {
    const entries = [{ timestamp: '2024-01-01T00:00:00.000Z', file: 'tabs.md', format: 'markdown', tabCount: 4, windowCount: 2, action: 'export' }];
    const desc = describeHistory(entries);
    expect(desc).toContain('tabs.md');
    expect(desc).toContain('4 tabs');
  });

  it('describeHistory handles empty list', () => {
    expect(describeHistory([])).toBe('No history found.');
  });
});
