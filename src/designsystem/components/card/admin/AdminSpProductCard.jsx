import CardPlaceholder from '../CardPlaceholder';
import AdminCardActions from './AdminCardActions';
import {
  AdminCardBottomContent,
  AdminCardContentOneLine,
  AdminCardRowContainer,
  AdminCardTitle,
  AdminSpProductCardInfo,
  AdminSpProductCardThumbnail,
} from './style';

export default function AdminSpProductCard({
  thumbnail,
  title,
  content,
  selected,
  onClick,
  onDelete,
  onEdit,
}) {
  return (
    <AdminCardRowContainer onClick={onClick} selected={selected}>
      <AdminSpProductCardThumbnail>
        {thumbnail ? <img src={thumbnail} alt={title} /> : <CardPlaceholder />}
      </AdminSpProductCardThumbnail>
      <AdminSpProductCardInfo>
        <AdminCardTitle>{title}</AdminCardTitle>
        <AdminCardContentOneLine>{content}</AdminCardContentOneLine>
        <AdminCardBottomContent>
          <AdminCardActions onDelete={onDelete} onEdit={onEdit} />
        </AdminCardBottomContent>
      </AdminSpProductCardInfo>
    </AdminCardRowContainer>
  );
}
