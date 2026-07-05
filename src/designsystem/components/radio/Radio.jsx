import { useState } from 'react';
import { RadioGroup } from './style';
import RadioItem from './RadioItem';

/**
 * 라디오 버튼 그룹을 보여주는 Radio 컴포넌트입니다.
 *
 * @param {Array<{label: string, value: *}>} [options=[]] - 라디오 옵션 목록
 * @param {*} [defaultValue] - 초기 선택 값
 * @param {function} [onChange] - 선택된 값이 변경될 때 호출되는 함수
 * @param {string} [gap='29'] - 라디오 아이템 사이 간격(px)
 * @param {'vertical'|'horizontal'} [variant='vertical'] - 라디오 아이템 정렬 방향
 */
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
