export function formatNumber(value) {
  if (value === null) return '';
  return value.toLocaleString('ko-KR');
}
