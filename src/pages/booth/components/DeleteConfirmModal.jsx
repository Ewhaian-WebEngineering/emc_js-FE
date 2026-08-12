import Modal from '@/designsystem/components/modal/Modal';
import { deleteConfirmModal } from '../constants/noticeForm';

export default function DeleteConfirmModal({ onConfirm, onCancel }) {
  return (
    <Modal
      variant="danger"
      title={deleteConfirmModal.title}
      description={deleteConfirmModal.description}
      confirmText={deleteConfirmModal.confirmText}
      cancelText={deleteConfirmModal.cancelText}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
