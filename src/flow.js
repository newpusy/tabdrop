// flow.js — named multi-step pipelines that can be saved and run
const fs = require('fs');
const path = require('path');
const os = require('os');

const FLOWS_FILE = path.join(os.homedir(), '.tabdrop', 'flows.json');

function ensureFlowsFile() {
  const dir = path.dirname(FLOWS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(FLOWS_FILE)) fs.writeFileSync(FLOWS_FILE, '{}');
}

function loadFlows() {
  ensureFlowsFile();
  return JSON.parse(fs.readFileSync(FLOWS_FILE, 'utf8'));
}

function saveFlows(flows) {
  ensureFlowsFile();
  fs.writeFileSync(FLOWS_FILE, JSON.stringify(flows, null, 2));
}

function setFlow(name, steps) {
  const flows = loadFlows();
  flows[name] = { name, steps, createdAt: flows[name]?.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() };
  saveFlows(flows);
  return flows[name];
}

function getFlow(name) {
  const flows = loadFlows();
  return flows[name] || null;
}

function removeFlow(name) {
  const flows = loadFlows();
  if (!flows[name]) return false;
  delete flows[name];
  saveFlows(flows);
  return true;
}

function listFlows() {
  return Object.values(loadFlows());
}

function runFlow(name, session, ops) {
  const flow = getFlow(name);
  if (!flow) return null;
  let result = session;
  const log = [];
  for (const step of flow.steps) {
    if (ops[step.op]) {
      result = ops[step.op](result, step.args || {});
      log.push({ step: step.op, ok: true });
    } else {
      log.push({ step: step.op, ok: false, error: 'unknown op' });
    }
  }
  return { result, log };
}

module.exports = { ensureFlowsFile, loadFlows, saveFlows, setFlow, getFlow, removeFlow, listFlows, runFlow };
