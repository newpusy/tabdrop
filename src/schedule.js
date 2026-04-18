import fs from 'fs';
import path from 'path';

const SCHEDULE_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'schedule.json');

const VALID_INTERVALS = ['hourly', 'daily', 'weekly'];

export function loadSchedule() {
  if (!fs.existsSync(SCHEDULE_FILE)) return null;
  try {
    return JSON.parse(fs.readFileSync(SCHEDULE_FILE, 'utf8'));
  } catch {
    return null;
  }
}

export function saveSchedule(config) {
  const dir = path.dirname(SCHEDULE_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(SCHEDULE_FILE, JSON.stringify(config, null, 2), 'utf8');
}

export function setSchedule(interval, format = 'json', label = 'auto') {
  if (!VALID_INTERVALS.includes(interval)) {
    throw new Error(`Invalid interval: ${interval}. Use: ${VALID_INTERVALS.join(', ')}`);
  }
  const config = { interval, format, label, createdAt: new Date().toISOString() };
  saveSchedule(config);
  return config;
}

export function clearSchedule() {
  if (fs.existsSync(SCHEDULE_FILE)) {
    fs.unlinkSync(SCHEDULE_FILE);
    return true;
  }
  return false;
}

export function describeSchedule(config) {
  if (!config) return 'No schedule set.';
  return `Auto-snapshot every ${config.interval} as ${config.format} (label: ${config.label})`;
}
