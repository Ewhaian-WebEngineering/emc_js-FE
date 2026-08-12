export const noticeForm = {
  titleMaxLength: 20,
  contentMaxLength: 1000,
  titlePlaceholder: '공지 제목을 입력해주세요.',
  contentPlaceholder: '공지 내용을 입력해주세요.',
  emptyFieldError: '내용을 입력해주세요.',
};

export const exitConfirmModal = {
  variant: 'confirmation',
  title: '작성 중인 내용이 있어요',
  description: '나가면 작성 중인 내용이 저장되지 않아요.',
  cancelText: '나가기',
  confirmText: '계속 작성하기',
};

export const submitFailModal = {
  variant: 'alert',
  title: '등록에 실패했습니다.',
  description: '잠시 후 다시 시도해주세요.',
  cancelText: '확인',
};

export const deleteConfirmModal = {
  variant: 'confirmation',
  title: '공지사항을 삭제하시겠습니까?',
  description: '삭제하시면 다시 되돌릴 수 없습니다.',
  cancelText: '취소',
  confirmText: '삭제하기',
  confirmVariant: 'error',
};
