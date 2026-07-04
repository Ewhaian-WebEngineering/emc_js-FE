import CalendarIcon from '@/assets/svg/20px/ic_calendar.svg?react';
import {
  DateButton,
  DateField,
  DateInput,
} from '@/designsystem/components/datepicker/style';

/**
 * 날짜를 표시/입력하는 텍스트필드 컴포넌트입니다.
 *
 * @param {'default'|'focus'|'filled'|'disabled'|'error'|'errorEmpty'} state - 현재 상태
 * @param {string} [value=''] - 표시할 날짜 문자열
 * @param {function} onChange - 날짜 문자열이 변경될 때 호출되는 콜백 함수
 * @param {function} onFocus - 텍스트필드가 포커스될 때 호출되는 콜백 함수
 * @param {string} [placeholder='YYYY. MM. DD'] - 입력 필드에 표시될 placeholder 텍스트
 * @param {boolean} [readOnly=false] - 입력 필드를 읽기 전용으로 설정할지 여부
 */
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
