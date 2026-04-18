import fs from 'fs';
import path from 'path';
import { createSession } from './session.js';
import { exportSession } from './export.js';
import { ensureHistoryDir } from './history.js';

const SNAPSHOT_DIR = path.join(process.env.HOME || '.', '.tabdrop', 'snapshots');

export function ensureSnapshotDir() {
  if (!fs.existsSync(SNAPSHOT_DIR)) {
    fs.mkdirSync(SNAPSHOT_DIR, { recursive: true });
  }
  return SNAPSHOT_DIR;
}

export function snapshotName(label) {
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  return label ? `${label}-${ts}` : ts;
}

export function saveSnapshot(tabs, label, format = 'json') {
  ensureSnapshotDir();
  const session = createSession(tabs);
  const name = snapshotName(label);
  const ext = format === 'markdown' ? 'md' : 'json';
  const filePath = path.join(SNAPSHOT_DIR, `${name}.${ext}`);
  const content = exportSession(session, format);
  fs.writeFileSync(filePath, content, 'utf8');
  return { name, filePath, session };
}

export function listSnapshots() {
  ensureSnapshotDir();
  return fs.readdirSync(SNAPSHOT_DIR)
    .filter(f => f.endsWith('.json') || f.endsWith('.md'))
    .map(f => ({
      name: f.replace(/\.(json|md)$/, ''),
      file: path.join(SNAPSHOT_DIR, f),
      format: f.endsWith('.md') ? 'markdown' : 'json',
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function loadSnapshot(name) {
  ensureSnapshotDir();
  for (const ext of ['json', 'md']) {
    const filePath = path.join(SNAPSHOT_DIR, `${name}.${ext}`);
    if (fs.existsSync(filePath)) {
      return { content: fs.readFileSync(filePath, 'utf8'), format: ext === 'md' ? 'markdown' : 'json', filePath };
    }
  }
  throw new Error(`Snapshot not found: ${name}`);
}

export function deleteSnapshot(name) {
  for (const ext of ['json', 'md']) {
    const filePath = path.join(SNAPSHOT_DIR, `${name}.${ext}`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
  }
  return false;
}
