import { formatDate } from '../../../../utils/formatDate';
import AdminCardActions from './AdminCardActions';
import {
  AdminCardColumnContainer,
  AdminCardContent,
  AdminCardTitle,
  AdminCardBottomContainer,
  AdminCardDate,
} from './style';

export default function AdminNoticeCard({
  title,
  content,
  selected,
  date,
  onDelete,
  onEdit,
  onClick,
}) {
  return (
    <AdminCardColumnContainer onClick={onClick} selected={selected}>
      <AdminCardTitle>{title}</AdminCardTitle>
      <AdminCardContent>{content}</AdminCardContent>
      <AdminCardBottomContainer>
        <AdminCardDate>{formatDate(date)}</AdminCardDate>
        <AdminCardActions onDelete={onDelete} onEdit={onEdit} />
      </AdminCardBottomContainer>
    </AdminCardColumnContainer>
  );
}
