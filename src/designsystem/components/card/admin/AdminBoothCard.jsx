import AdminCardActions from './AdminCardActions';
import {
  AdminBoothCardNumber,
  AdminBoothCardTextWrapper,
  AdminCardBottomContent,
  AdminCardColumnContainer,
  AdminCardContentOneLine,
  AdminCardTitle,
} from './style';

/**
 * 관리자 부스 카드 컴포넌트입니다.
 * 관리자 대시보드 > 부스 관리 섹션에서 사용됩니다.
 *
 * @param {number} cardNumber - 카드 번호 (2자리 표시)
 * @param {string} title - 부스 이름
 * @param {string} content - 부스 소개글
 * @param {boolean} [selected] - 카드 선택 여부
 * @param {function} [onClick] - 카드 클릭 이벤트 핸들러
 * @param {function} [onPreview] - 미리보기 버튼 클릭 이벤트 핸들러
 * @param {function} [onEdit] - 수정 버튼 클릭 이벤트 핸들러
 * @returns
 */
export default function AdminBoothCard({
  cardNumber,
  title,
  content,
  selected,
  onClick,
  onPreview,
  onEdit,
}) {
  const formattedNumber = String(cardNumber).padStart(2, '0');

  return (
    <AdminCardColumnContainer onClick={onClick} selected={selected}>
      <AdminBoothCardTextWrapper>
        <AdminBoothCardNumber>{formattedNumber}</AdminBoothCardNumber>
        <AdminCardTitle>{title}</AdminCardTitle>
      </AdminBoothCardTextWrapper>
      <AdminCardContentOneLine>{content}</AdminCardContentOneLine>
      <AdminCardBottomContent>
        <AdminCardActions onPreview={onPreview} onEdit={onEdit} />
      </AdminCardBottomContent>
    </AdminCardColumnContainer>
  );
}
