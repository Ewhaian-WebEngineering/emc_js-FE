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

/**
 * 제품 관리용 카드 컴포넌트입니다.
 * 내 부스 관리 > 제품 목록 섹션에서 사용됩니다.
 *
 * @param {string} [thumbnail] - 썸네일 이미지 URL, 없으면 placeholder 표시
 * @param {string} title - 제품 이름
 * @param {number} price - 제품 가격
 * @param {boolean} [selected] - 카드 선택 여부
 * @param {function} [onDelete] - 삭제 버튼 클릭 시 호출되는 함수
 * @param {function} [onEdit] - 수정 버튼 클릭 시 호출되는 함수
 * @param {function} [onClick] - 카드 클릭 시 호출되는 함수
 */
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
