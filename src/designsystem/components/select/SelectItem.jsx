import TextButton from '../button/textbutton/TextButton';
import { SelectItemActions, SelectItemWrapper } from './style';
import { semantic } from '../../tokens/semantic';

/**
 * Select 드롭다운에서 사용하는 개별 옵션 아이템 컴포넌트입니다.
 *
 * @param {string} label - 옵션에 표시할 텍스트
 * @param {'sm'|'md'|'lg'} [size='md'] - 아이템의 크기
 * @param {boolean} selected - 선택된 옵션인지 여부
 * @param {boolean} [disabled] - 비활성화 여부
 * @param {boolean} [showActions] - 수정/삭제 버튼 표시 여부
 * @param {function} onClick - 아이템 클릭 시 호출되는 함수
 * @param {function} [onDelete] - 삭제 버튼 클릭 시 호출되는 함수
 * @param {function} [onEdit] - 수정 버튼 클릭 시 호출되는 함수
 */
export default function SelectItem({
  label,
  size = 'md',
  selected,
  disabled,
  showActions,
  onClick,
  onDelete,
  onEdit,
}) {
  return (
    <SelectItemWrapper
      size={size}
      selected={selected}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{label}</span>
      {showActions && (
        <SelectItemActions>
          <TextButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            style={{ color: semantic.statusDanger }}
          >
            삭제
          </TextButton>
          <TextButton
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            style={{ color: semantic.statusInfo }}
          >
            수정
          </TextButton>
        </SelectItemActions>
      )}
    </SelectItemWrapper>
  );
}
