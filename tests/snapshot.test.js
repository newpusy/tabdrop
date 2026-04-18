import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  ensureSnapshotDir,
  saveSnapshot,
  listSnapshots,
  loadSnapshot,
  deleteSnapshot,
  snapshotName,
} from '../src/snapshot.js';

const mockTabs = [
  { title: 'GitHub', url: 'https://github.com', windowId: 1 },
  { title: 'MDN', url: 'https://developer.mozilla.org', windowId: 1 },
];

describe('snapshotName', () => {
  it('includes label when provided', () => {
    const name = snapshotName('work');
    expect(name).toMatch(/^work-/);
  });

  it('returns timestamp only without label', () => {
    const name = snapshotName();
    expect(name).toMatch(/^\d{4}/);
  });
});

describe('saveSnapshot / loadSnapshot / deleteSnapshot', () => {
  let savedName;

  beforeEach(() => {
    const result = saveSnapshot(mockTabs, 'test', 'json');
    savedName = result.name;
  });

  afterEach(() => {
    deleteSnapshot(savedName);
  });

  it('saves and loads a snapshot', () => {
    const { content, format } = loadSnapshot(savedName);
    expect(format).toBe('json');
    const parsed = JSON.parse(content);
    expect(parsed.windows).toBeDefined();
  });

  it('lists snapshots including saved one', () => {
    const list = listSnapshots();
    expect(list.some(s => s.name === savedName)).toBe(true);
  });

  it('deleteSnapshot returns true for existing', () => {
    const result = deleteSnapshot(savedName);
    expect(result).toBe(true);
    savedName = null;
  });

  it('loadSnapshot throws for missing snapshot', () => {
    expect(() => loadSnapshot('nonexistent-snapshot-xyz')).toThrow();
  });
});
