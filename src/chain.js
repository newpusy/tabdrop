// chain.js — pipe multiple session operations in sequence

const { applyFilters } = require('./filter');
const { sortSessions } = require('./sort');
const { limitTabs } = require('./limit');
const { dedupeSession } = require('./dedupe');
const { truncateSession } = require('./truncate');

const CHAIN_OPS = ['filter', 'sort', 'limit', 'dedupe', 'truncate'];

function isValidOp(op) {
  return CHAIN_OPS.includes(op);
}

function applyOp(session, op, opts = {}) {
  switch (op) {
    case 'filter':
      return applyFilters(session, opts);
    case 'sort':
      return sortSessions([session], opts.by || 'title')[0] || session;
    case 'limit':
      return limitTabs(session, opts.max || 10);
    case 'dedupe':
      return dedupeSession(session);
    case 'truncate':
      return truncateSession(session, opts.length || 80);
    default:
      return session;
  }
}

function buildChain(steps) {
  if (!Array.isArray(steps) || steps.length === 0) {
    throw new Error('Chain must be a non-empty array of steps');
  }
  for (const step of steps) {
    if (!isValidOp(step.op)) {
      throw new Error(`Unknown chain op: ${step.op}`);
    }
  }
  return steps;
}

function runChain(session, steps) {
  const chain = buildChain(steps);
  return chain.reduce((s, step) => applyOp(s, step.op, step.opts || {}), session);
}

function describeChain(steps) {
  return steps.map((s, i) => `${i + 1}. ${s.op}${s.opts ? ' ' + JSON.stringify(s.opts) : ''}`).join(' → ');
}

module.exports = { isValidOp, applyOp, buildChain, runChain, describeChain, CHAIN_OPS };
