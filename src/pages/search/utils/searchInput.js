export function cleanSearchInput(raw) {
  return raw.trim().replace(/\.$/, '');
}
