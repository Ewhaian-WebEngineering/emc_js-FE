import BoxButton from '@/designsystem/components/button/boxbutton/BoxButton';
import Scrim from '@/designsystem/components/scrim/Scrim';
import { deleteConfirmModal } from '../constants/noticeForm';
import {
  DeleteModalButtonGroup,
  DeleteModalContainer,
  DeleteModalContent,
} from './style';

/**
 * 공지사항 삭제 확인 모달입니다.
 *
 * @param {function} onConfirm - 삭제하기 버튼 클릭 시 호출되는 함수
 * @param {function} onCancel - 취소 버튼 또는 배경 클릭 시 호출되는 함수
 */
export default function DeleteConfirmModal({ onConfirm, onCancel }) {
  return (
    <Scrim onClick={onCancel}>
      <DeleteModalContainer>
        <DeleteModalContent>
          <h2>{deleteConfirmModal.title}</h2>
          <p>{deleteConfirmModal.description}</p>
        </DeleteModalContent>
        <DeleteModalButtonGroup>
          <BoxButton variant="secondary" size="md" onClick={onCancel}>
            {deleteConfirmModal.cancelText}
          </BoxButton>
          <BoxButton variant="error" size="md" onClick={onConfirm}>
            {deleteConfirmModal.confirmText}
          </BoxButton>
        </DeleteModalButtonGroup>
      </DeleteModalContainer>
    </Scrim>
  );
}
