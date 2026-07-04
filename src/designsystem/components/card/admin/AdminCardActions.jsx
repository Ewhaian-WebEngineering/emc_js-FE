import TextButton from '../../button/textbutton/TextButton';
import { semantic } from '../../../tokens/semantic';
import { ActionCardActionsDivider, AdminCardActionsWrapper } from './style';

export default function AdminCardActions({ onDelete, onEdit }) {
  return (
    <AdminCardActionsWrapper>
      <TextButton
        variant="primary"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.();
        }}
        style={{ color: semantic.statusDanger }}
      >
        삭제
      </TextButton>
      <ActionCardActionsDivider />
      <TextButton
        variant="primary"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onEdit?.();
        }}
      >
        수정
      </TextButton>
    </AdminCardActionsWrapper>
  );
}
