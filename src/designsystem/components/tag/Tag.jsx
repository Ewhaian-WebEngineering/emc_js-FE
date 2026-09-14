import { TagLabel, TagWrapper } from './style';
import CloseButton from '@/assets/svg/16px/ic_close.svg?react';

/**
 * 선택 가능한 태그를 보여주는 Tag 컴포넌트입니다.
 *
 * @param {string} label - 태그에 표시할 텍스트
 * @param {'sorting'|'notice'|'button'} [variant='button'] - 태그의 종류
 * @param {boolean} [selected] - 선택 여부
 * @param {function} [onDelete] - 삭제(닫기) 버튼 클릭 시 호출되는 함수
 * @param {function} [onClick] - 태그 클릭 시 호출되는 함수
 */
export default function Tag({
  label,
  variant = 'button',
  selected,
  onDelete,
  onClick,
}) {
  const isTruncated = variant === 'sorting' && label.length >= 11;

  return (
    <TagWrapper
      variant={variant}
      selected={selected}
      onClick={onClick}
      title={isTruncated ? label : undefined}
    >
      <TagLabel variant={variant}>{label}</TagLabel>
      {onDelete && (
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          style={{ cursor: 'pointer' }}
        />
      )}
    </TagWrapper>
  );
}
