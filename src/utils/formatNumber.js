/**
 * 숫자에 천 단위 콤마를 붙여 포맷팅합니다.
 *
 * @param {number} value - 포맷팅할 숫자
 * @returns {string} 콤마가 포함된 숫자 문자열, value가 null이면 빈 문자열
 */
export function formatNumber(value) {
  if (value === null) return '';
  return value.toLocaleString('ko-KR');
}
