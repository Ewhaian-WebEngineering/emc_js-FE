import AdminCardActions from './AdminCardActions';
import {
  AdminCardBottomContent,
  AdminCardColumnContainer,
  AdminCardContentOneLine,
  AdminCardTitle,
} from './style';

export default function AdminSpCard({
  title,
  content,
  selected,
  onClick,
  onDelete,
  onEdit,
}) {
  return (
    <AdminCardColumnContainer onClick={onClick} selected={selected}>
      <AdminCardTitle>{title}</AdminCardTitle>
      <AdminCardContentOneLine>{content}</AdminCardContentOneLine>
      <AdminCardBottomContent>
        <AdminCardActions onDelete={onDelete} onEdit={onEdit} />
      </AdminCardBottomContent>
    </AdminCardColumnContainer>
  );
}
