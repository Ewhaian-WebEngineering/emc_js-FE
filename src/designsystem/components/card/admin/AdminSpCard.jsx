import AdminCardActions from './AdminCardActions';
import {
  AdminCardBottomContent,
  AdminCardColumnContainer,
  AdminCardContentOneLine,
  AdminCardTitle,
} from './style';

/**
 * 관리자 협찬사 카드 컴포넌트입니다.
 * 관리자 대시보드 > 협찬사 관리 섹션에서 사용됩니다.
 *
 * @param {string} title - 협찬사 이름
 * @param {string} content - 협찬사 한 줄 소개
 * @param {boolean} [selected] - 카드 선택 여부
 * @param {function} [onClick] - 카드 클릭 시 호출되는 함수
 * @param {function} [onDelete] - 삭제 버튼 클릭 시 호출되는 함수
 * @param {function} [onEdit] - 수정 버튼 클릭 시 호출되는 함수
 */
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
