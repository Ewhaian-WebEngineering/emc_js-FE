/**
 * 날짜 문자열을 'yyyy. mm. dd' 형식으로 포맷팅합니다.
 *
 * @param {string} dateString - 포맷팅할 날짜 문자열
 * @returns {string} 포맷팅된 날짜 문자열, dateString이 없으면 빈 문자열
 */
export function formatDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  return `${yyyy}. ${mm}. ${dd}`;
}
