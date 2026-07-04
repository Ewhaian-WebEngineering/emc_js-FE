import ArrowLeftIcon from '@/assets/svg/24px/ic_arrow_left.svg?react';
import ArrowRightIcon from '@/assets/svg/24px/ic_arrow_right.svg?react';
import {
  formatDayNumber,
  formatMonthTitle,
  getMonthGrid,
  goToNextMonth,
  goToPrevMonth,
  isSelectedDay,
} from '@/utils/calendarMath';
import { useMemo, useState } from 'react';
import {
  CalendarWrapper,
  CalendarDayCell,
  CalendarDayGrid,
  CalendarHeader,
  CalendarMonthLabel,
  CalendarNav,
  CalendarNavButton,
  CalendarWeekday,
  CalendarWeekdayRow,
  CalendarYearLabel,
} from './style';
import { WEEKDAY_LABELS } from '@/utils/calendarMath';

/**
 * 월 그리드 형태의 달력 컴포넌트입니다.
 *
 * @param {Date|null} value - 선택된 날짜
 * @param {function} onChange - 날짜 선택 시 호출되는 콜백 함수
 */
export function Calendar({ value, onChange }) {
  const [visibleMonth, setVisibleMonth] = useState(value ?? new Date());

  const days = useMemo(() => getMonthGrid(visibleMonth), [visibleMonth]);

  const handlePrevMonth = () => setVisibleMonth((prev) => goToPrevMonth(prev));
  const handleNextMonth = () => setVisibleMonth((prev) => goToNextMonth(prev));

  const handleSelectDay = (date, isOutsideMonth) => {
    if (isOutsideMonth) {
      setVisibleMonth(date);
    }
    onChange?.(date);
  };

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <CalendarYearLabel>{formatMonthTitle(visibleMonth)}</CalendarYearLabel>
        <CalendarNav>
          <CalendarNavButton aria-label="이전 달" onClick={handlePrevMonth}>
            <ArrowLeftIcon />
          </CalendarNavButton>
          <CalendarMonthLabel>{visibleMonth.getMonth() + 1}</CalendarMonthLabel>
          <CalendarNavButton aria-label="다음 달" onClick={handleNextMonth}>
            <ArrowRightIcon />
          </CalendarNavButton>
        </CalendarNav>
      </CalendarHeader>

      <CalendarWeekdayRow>
        {WEEKDAY_LABELS.map((label) => (
          <CalendarWeekday key={label}>{label}</CalendarWeekday>
        ))}
      </CalendarWeekdayRow>

      <CalendarDayGrid>
        {days.map(({ date, isCurrentMonth }) => (
          <CalendarDayCell
            key={date.toISOString()}
            isOutsideMonth={!isCurrentMonth}
            isSelected={isSelectedDay(date, value)}
            onClick={() => handleSelectDay(date, !isCurrentMonth)}
          >
            {formatDayNumber(date)}
          </CalendarDayCell>
        ))}
      </CalendarDayGrid>
    </CalendarWrapper>
  );
}
