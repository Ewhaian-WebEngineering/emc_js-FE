import { useState } from 'react';
import { GROUP_OPTIONS } from '../constants/groupOptions';
import useModal from '@/hooks/modal/useModal';

const INITIAL_NEW_GROUP = { name: '', description: '' };

export function useProductGroups({ groupId, onGroupIdChange }) {
  const { showModal } = useModal();

  const [isGroupSheetOpen, setIsGroupSheetOpen] = useState(false);
  const [newGroup, setNewGroup] = useState(INITIAL_NEW_GROUP);

  const selectedGroupOption = GROUP_OPTIONS.find(
    (option) => option.value === groupId,
  );

  const updateNewGroupField = (field, value) => {
    setNewGroup((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectGroup = (option) => {
    onGroupIdChange(option.value);
  };

  const handleAddGroup = () => {
    setIsGroupSheetOpen(true);
  };

  const isNewGroupDirty =
    newGroup.name.trim() !== '' || newGroup.description.trim() !== '';

  const isNewGroupValid = newGroup.name.trim() !== '';

  const handleCloseGroupSheet = () => {
    setNewGroup(INITIAL_NEW_GROUP);
    setIsGroupSheetOpen(false);
  };

  const handleCheckBeforeClose = async () => {
    if (!isNewGroupDirty) return true;

    const { confirmed } = await showModal({
      variant: 'confirmation',
      title: '작성 중인 내용이 있어요.',
      description: '나가면 작성 중인 내용이 저장되지 않아요.',
      cancelText: '나가기',
      confirmText: '계속 작성하기',
    });

    return !confirmed;
  };

  const handleConfirmAddGroup = () => {
    if (!isNewGroupValid) return;
    handleCloseGroupSheet();
  };

  const handleDeleteGroup = () => {
    // TODO: 그룹 삭제 로직 추가
    alert('그룹 삭제');
  };

  const handleEditGroup = () => {
    // TODO: 그룹 수정 로직 추가
    alert('그룹 수정');
  };

  return {
    groupOptions: GROUP_OPTIONS,
    selectedGroupOption,
    handleSelectGroup,
    handleAddGroup,
    handleDeleteGroup,
    handleEditGroup,
    isGroupSheetOpen,
    handleCloseGroupSheet,
    handleCheckBeforeClose,
    newGroup,
    updateNewGroupField,
    isNewGroupValid,
    handleConfirmAddGroup,
  };
}
