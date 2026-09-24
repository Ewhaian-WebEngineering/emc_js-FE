import { useState } from 'react';
import useModal from './modal/useModal';
import {
  markGroupDeleted,
  reassignProductsGroup,
  upsertGroupDraft,
} from '@/pages/manage/store/boothDraftStore';
import { useBoothDraftStore } from '@/pages/manage/store/useBoothDraftStore';

const INITIAL_NEW_GROUP = { name: '', description: '' };

function createTempGroupId() {
  return `temp-group-${crypto.randomUUID()}`;
}

export function useEntityGroups(
  initialGroups,
  productGroups,
  { groupId, onGroupIdChange },
) {
  const { showModal } = useModal();
  const draft = useBoothDraftStore();

  const [isGroupSheetOpen, setIsGroupSheetOpen] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [newGroup, setNewGroup] = useState(INITIAL_NEW_GROUP);
  const [originalGroup, setOriginalGroup] = useState(INITIAL_NEW_GROUP);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const groups = initialGroups;
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

    const payload = {
      name: newGroup.name.trim(),
      description: newGroup.description.trim() || null,
    };

    if (isEditMode) {
      const isTemp = String(editingGroupId).startsWith('temp-group-');
      upsertGroupDraft(editingGroupId, {
        status: isTemp ? 'created' : 'updated',
        data: payload,
      });
    } else {
      const tempId = createTempGroupId();
      upsertGroupDraft(tempId, { status: 'created', data: payload });
      onGroupIdChange(tempId);
    }

    handleCloseGroupSheet();
  };

  const handleDeleteGroup = async (option) => {
    if (option.value === null) return;

    const { confirmed } = await showModal({
      variant: 'danger',
      title: '해당 그룹을 삭제하시겠습니까?',
      description: `해당 그룹으로 설정된 제품은\n'그룹없음'으로 이동합니다.`,
      cancelText: '취소',
      confirmText: '삭제하기',
    });

    if (!confirmed) return;

    const serverGroup = productGroups?.find((g) => g.id === option.value);
    const serverItemsInGroup = (serverGroup?.products ?? [])
      .filter((item) => draft.products[item.id]?.status !== 'deleted')
      .map((item) => ({
        id: item.id,
        status: draft.products[item.id]?.status ?? 'server',
      }));

    const draftCreatedItemsInGroup = Object.entries(draft.products)
      .filter(
        ([, entry]) =>
          entry?.status === 'created' && entry.data.groupId === option.value,
      )
      .map(([tempId]) => ({ id: tempId, status: 'created' }));

    reassignProductsGroup(
      [...serverItemsInGroup, ...draftCreatedItemsInGroup],
      null,
    );
    markGroupDeleted(option.value);

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
    isButtonDisabled: isSubmitDisabled,
    groupNameError,
    handleConfirmAddGroup,
  };
}
