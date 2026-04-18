import fs from 'fs';
import path from 'path';
import os from 'os';

const HISTORY_DIR = path.join(os.homedir(), '.tabdrop');
const HISTORY_FILE = path.join(HISTORY_DIR, 'history.json');
const MAX_ENTRIES = 50;

export function ensureHistoryDir() {
  if (!fs.existsSync(HISTORY_DIR)) {
    fs.mkdirSync(HISTORY_DIR, { recursive: true });
  }
}

export function loadHistory() {
  ensureHistoryDir();
  if (!fs.existsSync(HISTORY_FILE)) return [];
  try {
    const raw = fs.readFileSync(HISTORY_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveHistory(entries) {
  ensureHistoryDir();
  const trimmed = entries.slice(-MAX_ENTRIES);
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(trimmed, null, 2));
}

export function addHistoryEntry({ file, format, tabCount, windowCount, action }) {
  const entries = loadHistory();
  entries.push({
    id: Date.now(),
    timestamp: new Date().toISOString(),
    file,
    format,
    tabCount,
    windowCount,
    action,
  });
  saveHistory(entries);
}

export function clearHistory() {
  saveHistory([]);
}

export function describeHistory(entries) {
  if (!entries.length) return 'No history found.';
  return entries
    .map(e => `[${e.timestamp}] ${e.action} — ${e.file} (${e.tabCount} tabs, ${e.windowCount} windows, ${e.format})`)
    .join('\n');
}
