import { TagWrapper } from './style';
import CloseButton from '@/assets/svg/16px/ic_close.svg?react';

export default function Tag({ label, type, selected, onDelete, onClick }) {
  return (
    <TagWrapper
      type={type}
      selected={selected}
      onDelete={onDelete}
      onClick={onClick}
    >
      {label}
      {onDelete && (
        <CloseButton onClick={onDelete} style={{ cursor: 'pointer' }} />
      )}
    </TagWrapper>
  );
}
