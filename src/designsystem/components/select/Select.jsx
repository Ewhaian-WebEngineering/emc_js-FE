import { useEffect, useRef, useState } from 'react';
import { semantic } from '../../tokens/semantic';
import ChevronDownIcon16px from '@/assets/svg/16px/ic_arrow_down.svg?react';
import ChevronDownIcon20px from '@/assets/svg/20px/ic_arrow_down.svg?react';
import SelectItem from './SelectItem';
import {
  SelectList,
  SelectScrollArea,
  SelectTrigger,
  SelectWrapper,
} from './style';

/**
 * 옵션 목록에서 하나를 선택하는 Select 컴포넌트입니다.
 *
 * @param {'sm'|'md'} [size='md'] - Select의 크기
 * @param {Array<{label: string, value: *, disabled?: boolean}>} options - 선택 가능한 옵션 목록
 * @param {{label: string, value: *}} [value] - 선택된 옵션
 * @param {{label: string, value: *}} [defaultValue] - 초기 선택 옵션
 * @param {function} [onChange] - 옵션 선택 시 호출되는 함수
 * @param {string} [placeholder] - 선택된 값이 없을 때 표시할 문구
 * @param {boolean} [error] - 에러 상태 표시 여부
 * @param {boolean} [disabled] - 비활성화 여부
 * @param {boolean} [showActions] - 옵션별 수정/삭제 버튼 표시 여부
 * @param {function} [onDelete] - 옵션의 삭제 버튼 클릭 시 호출되는 함수
 * @param {function} [onEdit] - 옵션의 수정 버튼 클릭 시 호출되는 함수
 */
export default function Select({
  size = 'md',
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  prefix,
  error,
  disabled,
  showActions,
  onDelete,
  onEdit,
}) {
  // 상태 관리
  const [selectedValue, setSelectedValue] = useState(value || defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerLabel = selectedValue
    ? [prefix, selectedValue.label].filter(Boolean).join(' ')
    : placeholder;

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
    <SelectWrapper ref={containerRef}>
      {/* 트리거 */}
      <SelectTrigger
        size={size}
        error={error}
        isOpen={isOpen}
        disabled={disabled}
        hasValue={!!selectedValue}
      >
        <span>{triggerLabel}</span>
        <button onClick={() => setIsOpen(!isOpen)}>
          {size === 'sm' ? (
            <ChevronDownIcon16px
              color={
                disabled
                  ? semantic.iconNormalAssistive
                  : semantic.iconNormalNormal
              }
            />
          ) : (
            <ChevronDownIcon20px
              color={
                disabled
                  ? semantic.iconNormalAssistive
                  : semantic.iconNormalStrong
              }
            />
          )}
        </button>
      </SelectTrigger>

      {/* 드롭다운 */}
      {isOpen && (
        <SelectList size={size}>
          <SelectScrollArea>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                label={option.label}
                size={size}
                selected={selectedValue?.value === option.value}
                disabled={option.disabled}
                onClick={() => handleSelect(option)}
                showActions={showActions}
                onDelete={() => onDelete?.(option)}
                onEdit={() => onEdit?.(option)}
              />
            ))}
          </SelectScrollArea>
        </SelectList>
      )}
    </SelectWrapper>
  );
}
