import { useEffect, useMemo, useRef, useState } from 'react';
import { isAfter } from 'date-fns';
import DateTextField from './DateTextField';
import { formatDate } from '@/utils/formatDate';
import {
  CalendarPopOver,
  DateFieldGroup,
  DatePickerAnchor,
  DatePickerErrorText,
  DatePickerFieldRow,
  DatePickerLabel,
  DatePickerSeparator,
} from './style';
import { Calendar } from './Calendar';

export default function DatePicker({
  label = '기간 설정',
  required = true,
  disabled = false,
  externalError = '',
  value,
  onChange,
}) {
  const [internalStart, setInternalStart] = useState(value?.start ?? null);
  const [internalEnd, setInternalEnd] = useState(value?.end ?? null);
  const [activeField, setActiveField] = useState(null);

  const anchorRef = useRef(null);

  const start = value?.start !== undefined ? value.start : internalStart;
  const end = value?.end !== undefined ? value.end : internalEnd;

  const rangeError = useMemo(() => {
    if (start && end && isAfter(start, end)) {
      return '시작일은 종료일보다 이후일 수 없어요.';
    }
  }, [start, end]);

  const errorMessage = externalError || rangeError;

  const emitChange = (nextStart, nextEnd) => {
    setInternalStart(nextStart);
    setInternalEnd(nextEnd);
    onChange?.({ start: nextStart, end: nextEnd });
  };

  const handleFocusField = (field) => {
    if (disabled) return;
    setActiveField((prev) => (prev === field ? null : field));
  };

  const handleSelectDate = (date) => {
    if (activeField === 'start') {
      emitChange(date, end);
    } else if (activeField === 'end') {
      emitChange(start, date);
    }
  };

  const getFieldState = (fieldValue, isThisFieldActive) => {
    if (disabled) return 'disabled';
    if (errorMessage) return fieldValue ? 'error' : 'errorEmpty';
    if (isThisFieldActive) return 'focus';
    return fieldValue ? 'filled' : 'default';
  };

  const isCalendarOpen = !disabled && activeField !== null;

  useEffect(() => {
    if (!isCalendarOpen) return undefined;

    const handleClickOutside = (event) => {
      if (anchorRef.current && !anchorRef.current.contains(event.target)) {
        setActiveField(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCalendarOpen]);

  return (
    <DateFieldGroup>
      <DatePickerLabel>
        {label}
        {required && <span>*</span>}
      </DatePickerLabel>

      <DatePickerAnchor ref={anchorRef}>
        <DatePickerFieldRow>
          <DateTextField
            readOnly
            state={getFieldState(start, activeField === 'start')}
            value={formatDate(start)}
            onFocus={() => handleFocusField('start')}
          />
          <DatePickerSeparator />
          <DateTextField
            readOnly
            state={getFieldState(end, activeField === 'end')}
            value={formatDate(end)}
            onFocus={() => handleFocusField('end')}
          />
        </DatePickerFieldRow>

        {isCalendarOpen && (
          <CalendarPopOver>
            <Calendar
              value={activeField === 'start' ? start : end}
              onChange={handleSelectDate}
            />
          </CalendarPopOver>
        )}
      </DatePickerAnchor>

      {errorMessage && (
        <DatePickerErrorText>{errorMessage}</DatePickerErrorText>
      )}
    </DateFieldGroup>
  );
}
