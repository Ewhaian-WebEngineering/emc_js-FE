import { formatDate } from '../../../../utils/formatDate';
import AdminCardActions from './AdminCardActions';
import {
  AdminCardBottomContainer,
  AdminCardColumnContainer,
  AdminCardDate,
  AdminCardTitle,
} from './style';

export default function AdminBannerSpCard({
  title,
  startDate,
  endDate,
  selected,
  onClick,
  onDelete,
  onEdit,
}) {
  return (
    <AdminCardColumnContainer onClick={onClick} selected={selected}>
      <AdminCardTitle>{title}</AdminCardTitle>
      <AdminCardBottomContainer>
        <AdminCardDate>
          {formatDate(startDate)} - {formatDate(endDate)}
        </AdminCardDate>
        <AdminCardActions onDelete={onDelete} onEdit={onEdit} />
      </AdminCardBottomContainer>
    </AdminCardColumnContainer>
  );
}
