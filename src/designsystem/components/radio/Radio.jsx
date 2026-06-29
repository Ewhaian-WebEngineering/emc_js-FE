import { useState } from 'react';
import { RadioGroup } from './style';
import RadioItem from './RadioItem';

export default function Radio({
  options = [],
  defaultValue,
  onChange,
  gap = '29',
  variant = 'vertical',
}) {
  const [value, setValue] = useState(defaultValue ?? null);

  const handleChange = (val) => {
    setValue(val);
    onChange?.(val);
  };

  return (
    <RadioGroup role="radiogroup" variant={variant} gap={gap}>
      {options.map((option) => (
        <RadioItem
          key={option.value}
          label={option.label}
          value={option.value}
          checked={value === option.value}
          onChange={handleChange}
        />
      ))}
    </RadioGroup>
  );
}
