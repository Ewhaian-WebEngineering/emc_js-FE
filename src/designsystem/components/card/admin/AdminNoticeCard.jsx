import { formatDate } from '@/utils/formatDate';
import AdminCardActions from './AdminCardActions';
import {
  AdminCardColumnContainer,
  AdminCardContent,
  AdminCardTitle,
  AdminCardBottomContainer,
  AdminCardDate,
} from './style';

/**
 * 공지사항 카드 컴포넌트입니다.
 * 내 부스 관리 > 공지사항 섹션에서 사용됩니다.
 *
 * @param {string} title - 공지사항 제목
 * @param {string} content - 공지사항 본문
 * @param {boolean} [selected] - 카드 선택 여부
 * @param {string} date - 공지 등록(수정)일
 * @param {function} [onDelete] - 삭제 버튼 클릭 시 호출되는 함수
 * @param {function} [onEdit] - 수정 버튼 클릭 시 호출되는 함수
 * @param {function} [onClick] - 카드 클릭 시 호출되는 함수
 */
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
