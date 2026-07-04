import CalendarIcon from '@/assets/svg/20px/ic_calendar.svg?react';
import {
  DateButton,
  DateField,
  DateInput,
} from '@/designsystem/components/datepicker/style';

export default function DateTextField({
  state = 'default',
  value = '',
  onChange,
  onFocus,
  placeholder = 'YYYY. MM. DD',
  readOnly = false,
}) {
  const isDisabled = state === 'disabled';

  return (
    <DateField state={state}>
      <DateInput
        state={state}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={isDisabled}
      />
      <DateButton
        state={state}
        disabled={isDisabled}
        onClick={onFocus}
        aria-label="달력 열기"
      >
        <CalendarIcon />
      </DateButton>
    </DateField>
  );
}
