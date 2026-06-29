import {
  RadioItemCustomInput,
  RadioItemHiddenInput,
  RadioItemLabel,
  RadioItemWrapper,
} from './style';

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
