function formatLock(name, lock) {
  const reason = lock.reason ? ` — "${lock.reason}"` : '';
  return `🔒 ${name}${reason} (locked at ${lock.lockedAt})`;
}

function formatLockList(locks) {
  const keys = Object.keys(locks);
  if (!keys.length) return 'No locked sessions.';
  return keys.map(k => formatLock(k, locks[k])).join('\n');
}

function formatLocked(name) {
  return `🔒 Session "${name}" is now locked.`;
}

function formatUnlocked(name) {
  return `🔓 Session "${name}" has been unlocked.`;
}

function formatAlreadyLocked(name) {
  return `Session "${name}" is already locked.`;
}

function formatNotLocked(name) {
  return `Session "${name}" is not locked.`;
}

module.exports = { formatLock, formatLockList, formatLocked, formatUnlocked, formatAlreadyLocked, formatNotLocked };
