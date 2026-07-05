import {
  RadioItemCustomInput,
  RadioItemHiddenInput,
  RadioItemLabel,
  RadioItemWrapper,
} from './style';

/**
 * Radio 그룹에서 사용하는 개별 라디오 아이템 컴포넌트입니다.
 *
 * @param {string} label - 라디오 옆에 표시할 라벨
 * @param {*} value - 라디오의 값
 * @param {boolean} checked - 선택 여부
 * @param {function} onChange - 클릭 시 호출되는 함수
 */
export default function RadioItem({ label, value, checked, onChange }) {
  return (
    <RadioItemWrapper onClick={() => onChange(value)}>
      <RadioItemHiddenInput
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <RadioItemCustomInput checked={checked} />
      <RadioItemLabel>{label}</RadioItemLabel>
    </RadioItemWrapper>
  );
}
