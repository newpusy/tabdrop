function formatNote(sessionId, note) {
  if (!note) return `No note found for session: ${sessionId}`;
  return `📝 ${sessionId}\n   ${note.text}\n   updated: ${note.updatedAt}`;
}

function formatNoteList(notes) {
  const entries = Object.entries(notes);
  if (entries.length === 0) return 'No notes saved.';
  return entries
    .map(([id, note]) => `📝 ${id}\n   ${note.text}\n   updated: ${note.updatedAt}`)
    .join('\n\n');
}

function formatNoteSet(sessionId) {
  return `Note saved for session: ${sessionId}`;
}

function formatNoteRemoved(sessionId) {
  return `Note removed for session: ${sessionId}`;
}

module.exports = { formatNote, formatNoteList, formatNoteSet, formatNoteRemoved };
