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

const parseMonthDay = (dateString) => {
  if (!dateString) return null;
  const [, month, day] = dateString.split('-');
  return { month: Number(month), day: Number(day) };
};

/**
 * 이벤트 진행기간을 포맷팅합니다.
 * 현장 이벤트는 'M월 D일' 형식으로, 나머지는 'M.D - M.D' 형식으로 반환합니다.
 * endDate가 없으면 시작일만 'M.D' 형식으로 반환합니다.
 *
 * @param {string} eventType - 이벤트 유형 ('onsite' | 'pre' | 'post')
 * @param {string} startDate - 시작일 문자열
 * @param {string} endDate - 종료일 문자열
 * @returns {string} 포맷팅된 진행기간 문자열, startDate가 없으면 빈 문자열
 */
export function formatEventPeriod(eventType, startDate, endDate) {
  if (!startDate) return '';

  if (eventType === 'onsite') {
    const { month, day } = parseMonthDay(startDate);
    return `${month}월 ${day}일`;
  }

  const { month: startMonth, day: startDay } = parseMonthDay(startDate);

  if (!endDate) {
    return `${startMonth}.${startDay}`;
  }

  const { month: endMonth, day: endDay } = parseMonthDay(endDate);

  return `${startMonth}.${startDay} - ${endMonth}.${endDay}`;
}
