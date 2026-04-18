const fs = require('fs');
const path = require('path');

const LABELS_FILE = path.join(process.env.HOME || '.', '.tabdrop', 'labels.json');

function ensureLabelsFile() {
  const dir = path.dirname(LABELS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(LABELS_FILE)) fs.writeFileSync(LABELS_FILE, '{}');
}

function loadLabels() {
  ensureLabelsFile();
  return JSON.parse(fs.readFileSync(LABELS_FILE, 'utf8'));
}

function saveLabels(labels) {
  ensureLabelsFile();
  fs.writeFileSync(LABELS_FILE, JSON.stringify(labels, null, 2));
}

function setLabel(sessionId, label) {
  const labels = loadLabels();
  labels[sessionId] = label.trim();
  saveLabels(labels);
  return labels[sessionId];
}

function getLabel(sessionId) {
  const labels = loadLabels();
  return labels[sessionId] || null;
}

function removeLabel(sessionId) {
  const labels = loadLabels();
  const had = sessionId in labels;
  delete labels[sessionId];
  saveLabels(labels);
  return had;
}

function listLabels() {
  return loadLabels();
}

function findByLabel(label) {
  const labels = loadLabels();
  return Object.entries(labels)
    .filter(([, v]) => v.toLowerCase() === label.toLowerCase())
    .map(([k]) => k);
}

module.exports = { ensureLabelsFile, loadLabels, saveLabels, setLabel, getLabel, removeLabel, listLabels, findByLabel };
