export function isInternal(url) {
  if (typeof url !== 'string') return false;
  // Reject protocol-relative
  if (/^\/\//.test(url)) return false;
  // External protocols
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(url)) return false;
  // Treat root-relative and relative as internal
  return url.startsWith('/') || url.startsWith('./') || url.startsWith('../');
}

export function sanitizeUrl(url) {
  if (typeof url !== 'string') return '';
  const trimmed = url.trim();
  // Drop obviously unsafe schemes
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('javascript:')) return '';
  if (lower.startsWith('data:')) return '';
  return trimmed;
}
