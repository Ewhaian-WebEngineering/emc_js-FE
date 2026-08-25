import { useState } from 'react';
import useModal from '@/hooks/modal/useModal';

const INITIAL_NEW_GROUP = { name: '', description: '' };

export function useEntityGroups(initialGroups, { groupId, onGroupIdChange }) {
  const { showModal } = useModal();

  const [isGroupSheetOpen, setIsGroupSheetOpen] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [newGroup, setNewGroup] = useState(INITIAL_NEW_GROUP);
  const [originalGroup, setOriginalGroup] = useState(INITIAL_NEW_GROUP);
  const [groups, setGroups] = useState(initialGroups);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const isEditMode = editingGroupId !== null;

  const selectedGroupOption = groups.find((option) => option.value === groupId);

  const updateNewGroupField = (field, value) => {
    setNewGroup((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectGroup = (option) => {
    onGroupIdChange(option.value);
  };

  const handleAddGroup = () => {
    setEditingGroupId(null);
    setNewGroup(INITIAL_NEW_GROUP);
    setIsGroupSheetOpen(true);
  };

  const handleEditGroup = (option) => {
    const target = {
      name: option.label,
      description: option.description ?? '',
    };

    setEditingGroupId(option.value);
    setNewGroup(target);
    setOriginalGroup(target);
    setIsGroupSheetOpen(true);
  };

  const isNewGroupDirty =
    newGroup.name.trim() !== '' || newGroup.description.trim() !== '';

  const isNewGroupChanged =
    newGroup.name !== originalGroup.name ||
    newGroup.description !== originalGroup.description;

  const isNewGroupValid = newGroup.name.trim() !== '';

  const isButtonDisabled = isEditMode ? !isNewGroupChanged : !isNewGroupValid;

  const isSubmitDisabled = isEditMode
    ? !isNewGroupValid || !isNewGroupChanged
    : !isNewGroupValid;

  const groupNameError =
    hasAttemptedSubmit && newGroup.name.trim() === ''
      ? '내용을 입력해주세요.'
      : undefined;

  const handleCloseGroupSheet = () => {
    setNewGroup(INITIAL_NEW_GROUP);
    setOriginalGroup(INITIAL_NEW_GROUP);
    setHasAttemptedSubmit(false);
    setIsGroupSheetOpen(false);
  };

  const handleCheckBeforeClose = async () => {
    const dirty = isEditMode ? isNewGroupChanged : isNewGroupDirty;
    if (!dirty) return true;

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
    setHasAttemptedSubmit(true);
    if (isSubmitDisabled) return;

    if (isEditMode) {
      setGroups((prev) =>
        prev.map((group) =>
          group.value === editingGroupId
            ? {
                ...group,
                label: newGroup.name.trim(),
                description: newGroup.description.trim(),
              }
            : group,
        ),
      );
    } else {
      const newOption = {
        label: newGroup.name.trim(),
        description: newGroup.description.trim(),
      };
      setGroups((prev) => [...prev, newOption]);
    }

    handleCloseGroupSheet();
  };

  const handleDeleteGroup = async (option) => {
    if (option.value === null) return;

    const { confirmed } = await showModal({
      variant: 'danger',
      title: '해당 그룹을 삭제하시겠습니까?',
      description: '삭제하시면 다시 되돌릴 수 없어요.',
      cancelText: '취소',
      confirmText: '삭제하기',
    });

    if (!confirmed) return;

    setGroups((prev) => prev.filter((g) => g.value !== option.value));

    if (option.value === groupId) {
      onGroupIdChange(null);
    }
  };

  return {
    groupOptions: groups,
    selectedGroupOption,
    handleSelectGroup,
    handleAddGroup,
    handleDeleteGroup,
    isEditMode,
    handleEditGroup,
    isGroupSheetOpen,
    handleCloseGroupSheet,
    handleCheckBeforeClose,
    newGroup,
    updateNewGroupField,
    isButtonDisabled,
    groupNameError,
    handleConfirmAddGroup,
  };
}
