function formatGroup(group) {
  const count = group.sessionIds.length;
  return `[${group.name}] ${count} session${count !== 1 ? 's' : ''} (updated ${group.updatedAt.slice(0, 10)})`;
}

function formatGroupList(groups) {
  if (!groups.length) return 'No groups found.';
  return groups.map(formatGroup).join('\n');
}

function formatGroupSet(name, sessionIds) {
  return `Group "${name}" saved with ${sessionIds.length} session(s).`;
}

function formatGroupRemoved(name) {
  return `Group "${name}" removed.`;
}

function formatGroupNotFound(name) {
  return `Group "${name}" not found.`;
}

function formatSessionAdded(groupName, sessionId) {
  return `Session "${sessionId}" added to group "${groupName}".`;
}

function formatSessionRemoved(groupName, sessionId) {
  return `Session "${sessionId}" removed from group "${groupName}".`;
}

module.exports = { formatGroup, formatGroupList, formatGroupSet, formatGroupRemoved, formatGroupNotFound, formatSessionAdded, formatSessionRemoved };
