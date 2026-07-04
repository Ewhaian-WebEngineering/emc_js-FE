import { formatDate } from '../../../../utils/formatDate';
import AdminCardActions from './AdminCardActions';
import {
  AdminCardBottomContainer,
  AdminCardColumnContainer,
  AdminCardDate,
  AdminCardTitle,
} from './style';

/**
 * 관리자 이벤트/배너 카드 컴포넌트입니다.
 * 관리자 대시보드 > 이벤트/배너 관리 섹션에서 사용됩니다.
 *
 * @param {string} title - 이벤트/배너 제목
 * @param {string} startDate - 이벤트/배너 노출 시작일
 * @param {string} endDate - 이벤트/배너 노출 종료일
 * @param {boolean} [selected] - 카드 선택 여부
 * @param {function} [onClick] - 카드 클릭 시 호출되는 함수
 * @param {function} [onDelete] - 삭제 버튼 클릭 시 호출되는 함수
 * @param {function} [onEdit] - 수정 버튼 클릭 시 호출되는 함수
 */
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
