import { formatNumber } from '../../../../utils/formatNumber';
import CardPlaceholder from '../CardPlaceholder';
import AdminCardActions from './AdminCardActions';
import {
  AdminCardPrice,
  AdminCardRowContainer,
  AdminCardTitle,
  AdminProductCardThumbnail,
  AdminCardBottomContainer,
  AdminProductCardInfo,
} from './style';

export default function AdminProductCard({
  thumbnail,
  title,
  price,
  selected,
  onDelete,
  onEdit,
  onClick,
}) {
  return (
    <AdminCardRowContainer onClick={onClick} selected={selected}>
      <AdminProductCardThumbnail>
        {thumbnail ? <img src={thumbnail} alt={title} /> : <CardPlaceholder />}
      </AdminProductCardThumbnail>
      <AdminProductCardInfo>
        <AdminCardTitle>{title}</AdminCardTitle>
        <AdminCardBottomContainer>
          <AdminCardPrice>{formatNumber(price)}원</AdminCardPrice>
          <AdminCardActions onDelete={onDelete} onEdit={onEdit} />
        </AdminCardBottomContainer>
      </AdminProductCardInfo>
    </AdminCardRowContainer>
  );
}
