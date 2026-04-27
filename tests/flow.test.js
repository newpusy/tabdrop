const fs = require('fs');
const os = require('os');
const path = require('path');

// redirect flows file to temp dir
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tabdrop-flow-'));
const FLOWS_FILE = path.join(tmpDir, 'flows.json');
jest.mock('os', () => ({ ...jest.requireActual('os'), homedir: () => tmpDir }));

const { setFlow, getFlow, removeFlow, listFlows, runFlow } = require('../src/flow');

function clearFlows() {
  const p = path.join(tmpDir, '.tabdrop', 'flows.json');
  if (fs.existsSync(p)) fs.writeFileSync(p, '{}');
}

beforeEach(clearFlows);

test('setFlow stores a flow', () => {
  const f = setFlow('myflow', [{ op: 'dedupe' }, { op: 'sort' }]);
  expect(f.name).toBe('myflow');
  expect(f.steps).toHaveLength(2);
});

test('getFlow retrieves stored flow', () => {
  setFlow('abc', [{ op: 'limit', args: { max: 10 } }]);
  const f = getFlow('abc');
  expect(f).not.toBeNull();
  expect(f.steps[0].op).toBe('limit');
});

test('getFlow returns null for missing', () => {
  expect(getFlow('nope')).toBeNull();
});

test('removeFlow deletes a flow', () => {
  setFlow('del', []);
  expect(removeFlow('del')).toBe(true);
  expect(getFlow('del')).toBeNull();
});

test('removeFlow returns false if not found', () => {
  expect(removeFlow('ghost')).toBe(false);
});

test('listFlows returns all flows', () => {
  setFlow('f1', [{ op: 'sort' }]);
  setFlow('f2', [{ op: 'dedupe' }]);
  const list = listFlows();
  expect(list.map(f => f.name)).toEqual(expect.arrayContaining(['f1', 'f2']));
});

test('runFlow applies ops in order', () => {
  setFlow('pipeline', [{ op: 'double' }, { op: 'add1' }]);
  const ops = {
    double: (s) => s * 2,
    add1: (s) => s + 1,
  };
  const { result, log } = runFlow('pipeline', 3, ops);
  expect(result).toBe(7);
  expect(log).toHaveLength(2);
  expect(log[0].ok).toBe(true);
});

test('runFlow logs error for unknown op', () => {
  setFlow('bad', [{ op: 'unknown' }]);
  const { log } = runFlow('bad', {}, {});
  expect(log[0].ok).toBe(false);
  expect(log[0].error).toBe('unknown op');
});

test('runFlow returns null for missing flow', () => {
  expect(runFlow('missing', {}, {})).toBeNull();
});
