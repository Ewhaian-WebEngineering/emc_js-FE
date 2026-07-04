import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  format,
} from 'date-fns';

/**
 * 캘린더 그리드 날짜 배열 계산
 *
 * @param {Date} baseDate - 기준 날짜
 * @returns {{ date: Date, isCurrentMonth: boolean }[]} - 그리드 전체 날짜 배열
 */
export function getMonthGrid(baseDate) {
  const monthStart = startOfMonth(baseDate);
  const monthEnd = endOfMonth(baseDate);

  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  return eachDayOfInterval({ start: gridStart, end: gridEnd }).map((date) => ({
    date,
    isCurrentMonth: isSameMonth(date, baseDate),
  }));
}

/**
 * 이전 달로 이동합니다.
 * '<' 버튼 클릭 시 사용됩니다.
 *
 * @param {Date} date - 현재 보고 있는 달의 어떤 날짜
 */
export function goToPrevMonth(date) {
  return subMonths(date, 1);
}

/**
 * 다음 달로 이동합니다.
 * '>' 버튼 클릭 시 사용됩니다.
 *
 * @param {Date} date - 현재 보고 있는 달의 어떤 날짜
 */
export function goToNextMonth(date) {
  return addMonths(date, 1);
}

/**
 * 선택된 날짜인지 확인합니다.
 *
 * @param {Date} date - 확인할 날짜
 * @param {Date} selectedDate - 선택된 날짜
 */
export function isSelectedDay(date, selectedDate) {
  if (!selectedDate) return false;
  return isSameDay(date, selectedDate);
}

/** 캘린더 요일 헤더에 쓰이는 라벨 */
export const WEEKDAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

/**
 * 달 제목을 포맷팅합니다.
 *
 * @param {Date} date - 현재 보고 있는 달
 */
export function formatMonthTitle(date) {
  return format(date, 'yyyy');
}

/**
 * 날짜를 포맷팅합니다.
 *
 * @param {Date} date - 포맷팅할 날짜
 */
export function formatDayNumber(date) {
  return format(date, 'd');
}
