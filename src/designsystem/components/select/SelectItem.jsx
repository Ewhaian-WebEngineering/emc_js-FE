import TextButton from '../button/textbutton/TextButton';
import { SelectItemActions, SelectItemWrapper } from './style';
import { semantic } from '../../tokens/semantic';

export default function SelectItem({
  label,
  size,
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
            onClick={onDelete}
            style={{ color: semantic.statusDanger }}
          >
            삭제
          </TextButton>
          <TextButton onClick={onEdit} style={{ color: semantic.statusInfo }}>
            수정
          </TextButton>
        </SelectItemActions>
      )}
    </SelectItemWrapper>
  );
}
