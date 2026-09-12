import { useEffect, useState } from 'react';
import useModal from '@/hooks/modal/useModal';
import {
  useCreateProductGroup,
  useDeleteProductGroup,
  useUpdateProductGroup,
} from '@/api/feature/product/useProductData';
import { getProductGroup } from '@/api/feature/product/productApi';

const INITIAL_NEW_GROUP = { name: '', description: '' };

export function useEntityGroups(initialGroups, { groupId, onGroupIdChange }) {
  const { showModal } = useModal();

  const { mutateAsync: createGroup } = useCreateProductGroup();
  const { mutateAsync: updateGroup } = useUpdateProductGroup();
  const { mutateAsync: deleteGroupApi } = useDeleteProductGroup();

  const [isGroupSheetOpen, setIsGroupSheetOpen] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [newGroup, setNewGroup] = useState(INITIAL_NEW_GROUP);
  const [originalGroup, setOriginalGroup] = useState(INITIAL_NEW_GROUP);
  const [groups, setGroups] = useState(initialGroups);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingGroup, setIsLoadingGroup] = useState(false);

  useEffect(() => {
    setGroups(initialGroups);
  }, [initialGroups]);

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

  const handleEditGroup = async (option) => {
    if (isLoadingGroup) return;
    setIsLoadingGroup(true);

    try {
      const group = await getProductGroup(option.value);
      const target = {
        name: group.name,
        description: group.description ?? '',
      };

      setEditingGroupId(group.id);
      setNewGroup(target);
      setOriginalGroup(target);
      setIsGroupSheetOpen(true);
    } catch (error) {
      await showModal({
        variant: 'danger',
        title: '그룹 정보를 불러오지 못했어요.',
        description: error.message || '잠시 후 다시 시도해주세요.',
        confirmText: '확인',
      });
    } finally {
      setIsLoadingGroup(false);
    }
  };

  const isNewGroupDirty =
    newGroup.name.trim() !== '' || newGroup.description.trim() !== '';

  const isNewGroupChanged =
    newGroup.name !== originalGroup.name ||
    newGroup.description !== originalGroup.description;

  const isNewGroupValid = newGroup.name.trim() !== '';

  const isSubmitDisabled = isEditMode
    ? !isNewGroupValid || !isNewGroupChanged
    : !isNewGroupValid;

  const isButtonDisabled = isSubmitDisabled || isSubmitting;

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

  const handleConfirmAddGroup = async () => {
    setHasAttemptedSubmit(true);
    if (isSubmitDisabled || isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (isEditMode) {
        await updateGroup({
          groupId: editingGroupId,
          payload: {
            name: newGroup.name.trim(),
            description: newGroup.description.trim() || null,
          },
        });
      } else {
        const created = await createGroup({
          name: newGroup.name.trim(),
          description: newGroup.description.trim() || null,
        });
        onGroupIdChange(created.id);
      }

      handleCloseGroupSheet();
    } catch (error) {
      await showModal({
        variant: 'danger',
        title: isEditMode
          ? '그룹 수정에 실패했어요.'
          : '그룹 등록에 실패했어요.',
        description: error.message || '잠시 후 다시 시도해주세요.',
        confirmText: '확인',
      });
    } finally {
      setIsSubmitting(false);
    }
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

    try {
      await deleteGroupApi(option.value);
      if (option.value === groupId) {
        onGroupIdChange(null);
      }
    } catch (error) {
      await showModal({
        variant: 'danger',
        title: '그룹 삭제에 실패했어요.',
        description: error.message || '잠시 후 다시 시도해주세요.',
        confirmText: '확인',
      });
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
    isLoadingGroup,
    groupNameError,
    handleConfirmAddGroup,
  };
}
