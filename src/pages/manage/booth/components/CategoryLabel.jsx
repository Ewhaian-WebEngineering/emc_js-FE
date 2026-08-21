import Tag from '@/designsystem/components/tag/Tag';
import {
  CategoryLabelContainer,
  CategoryLabelTitle,
  CategoryLabelMain,
  CategoryLabelMultiple,
  CategoryLabelOptions,
  CategoryLabelHelperText,
} from '../style';

export default function CategoryLabel({
  title,
  multiple = false,
  options,
  selected,
  onChange,
  exclusiveValue,
  hasError,
  helperText,
}) {
  const isSelected = (value) =>
    multiple ? selected.includes(value) : selected === value;

  const handleClick = (value) => {
    if (!multiple) {
      onChange(value);
      return;
    }

    if (exclusiveValue !== undefined) {
      if (value === exclusiveValue) {
        onChange(isSelected(value) ? [] : [exclusiveValue]);
        return;
      }

      const withoutExclusive = selected.filter((v) => v !== exclusiveValue);
      const next = isSelected(value)
        ? withoutExclusive.filter((v) => v !== value)
        : [...withoutExclusive, value];
      onChange(next);
      return;
    }

    const next = isSelected(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    onChange(next);
  };

  return (
    <CategoryLabelContainer>
      <CategoryLabelTitle>
        <CategoryLabelMain>
          {title}
          <span>*</span>
        </CategoryLabelMain>
        {multiple && (
          <CategoryLabelMultiple>중복 선택 가능</CategoryLabelMultiple>
        )}
      </CategoryLabelTitle>
      <CategoryLabelOptions>
        {options.map((option, index) => (
          <Tag
            key={index}
            label={option.label}
            selected={isSelected(option.value)}
            onClick={() => handleClick(option.value)}
          />
        ))}
      </CategoryLabelOptions>
      {hasError && helperText && (
        <CategoryLabelHelperText>{helperText}</CategoryLabelHelperText>
      )}
    </CategoryLabelContainer>
  );
}
