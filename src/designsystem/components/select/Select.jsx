import { useEffect, useRef, useState } from 'react';
import { semantic } from '../../tokens/semantic';
import ChevronDownIcon16px from '../../../assets/svg/16px/ic_arrow_down.svg?react';
import ChevronDownIcon20px from '../../../assets/svg/20px/ic_arrow_down.svg?react';
import SelectItem from './SelectItem';
import { SelectTrigger, SelectWrapper } from './style';

export default function Select({
  size,
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  error,
  disabled,
}) {
  // 상태 관리
  const [selectedValue, setSelectedValue] = useState(value || defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // 외부 클릭 감지
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 핸들러
  const handleSelect = (option) => {
    setSelectedValue(option);
    onChange?.(option);
    setIsOpen(false);
  };

  return (
    <SelectWrapper>
      {/* 트리거 */}
      <SelectTrigger
        size={size}
        error={error}
        isOpen={isOpen}
        disabled={disabled}
        hasValue={!!selectedValue}
      >
        <span>{selectedValue?.label || placeholder}</span>
        <button onClick={() => setIsOpen(!isOpen)}>
          {size === 'sm' ? (
            <ChevronDownIcon16px color={semantic.iconNormalNormal} />
          ) : (
            <ChevronDownIcon20px color={semantic.iconNormalStrong} />
          )}
        </button>
      </SelectTrigger>

      {/* 드롭다운 */}
      {isOpen && (
        <ul ref={containerRef}>
          {options.map((option) => (
            <SelectItem
              key={option}
              label={option.label}
              size={size}
              selected={selectedValue?.value === option.value}
              disabled={option.disabled}
              onClick={() => handleSelect(option)}
            />
          ))}
        </ul>
      )}
    </SelectWrapper>
  );
}
