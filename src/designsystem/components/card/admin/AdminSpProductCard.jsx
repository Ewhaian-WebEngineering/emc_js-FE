import CardPlaceholder from '../../Placeholder';
import AdminCardActions from './AdminCardActions';
import {
  AdminCardBottomContent,
  AdminCardContentOneLine,
  AdminCardRowContainer,
  AdminCardTitle,
  AdminSpProductCardInfo,
  AdminSpProductCardThumbnail,
} from './style';

/**
 * 협찬 제품 카드 컴포넌트입니다.
 * 협찬사 등록 > 협찬품 목록 섹션에서 사용됩니다.
 *
 * @param {string} [thumbnail] - 썸네일 이미지 URL, 없으면 placeholder 표시
 * @param {string} title - 제품 이름
 * @param {string} content - 제품 한 줄 소개
 * @param {boolean} [selected] - 카드 선택 여부
 * @param {function} [onClick] - 카드 클릭 시 호출되는 함수
 * @param {function} [onDelete] - 삭제 버튼 클릭 시 호출되는 함수
 * @param {function} [onEdit] - 수정 버튼 클릭 시 호출되는 함수
 */
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
