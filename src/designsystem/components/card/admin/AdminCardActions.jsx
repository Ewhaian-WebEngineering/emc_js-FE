import TextButton from '../../button/textbutton/TextButton';
import { semantic } from '../../../tokens/semantic';
import { ActionCardActionsDivider, AdminCardActionsWrapper } from './style';

/**
 * 관리자 카드 하단의 액션 버튼 영역입니다.
 * onPreview가 존재하면 미리보기 버튼을, 존재하지 않으면 삭제 버튼을 표시합니다.
 *
 * @param {function} onDelete - 삭제 버튼 클릭 이벤트 핸들러
 * @param {function} onEdit - 수정 버튼 클릭 이벤트 핸들러
 * @param {function} [onPreview] - 미리보기 버튼 클릭 이벤트 핸들러
 */
export default function AdminCardActions({ onDelete, onEdit, onPreview }) {
  return (
    <AdminCardActionsWrapper>
      {onPreview ? (
        <TextButton
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onPreview();
          }}
          style={{ color: semantic.textNormalNormal }}
        >
          미리보기
        </TextButton>
      ) : (
        <TextButton
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          style={{ color: semantic.statusDanger }}
        >
          삭제
        </TextButton>
      )}
      <ActionCardActionsDivider />
      <TextButton
        variant="primary"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onEdit?.();
        }}
      >
        수정
      </TextButton>
    </AdminCardActionsWrapper>
  );
}
