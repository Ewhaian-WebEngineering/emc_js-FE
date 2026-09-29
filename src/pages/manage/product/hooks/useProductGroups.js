import { useState, useSyncExternalStore } from 'react';
import useModal from '@/hooks/modal/useModal';
import {
  getSnapshot,
  markSponsorGroupDeleted,
  reassignSponsorItemsGroup,
  subscribe,
  upsertSponsorGroupDraft,
} from '@/pages/admin/sponsor/store/sponsorDraftStore';

const INITIAL_NEW_GROUP = { name: '', description: '' };
const NO_GROUP_OPTION = { label: '그룹 없음', value: null, hideActions: true };

export function useProductGroups(productGroups, { groupId, onGroupIdChange }) {
  const { showModal } = useModal();
  const draft = useSyncExternalStore(subscribe, getSnapshot);

  const [isGroupSheetOpen, setIsGroupSheetOpen] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [newGroup, setNewGroup] = useState(INITIAL_NEW_GROUP);
  const [originalGroup, setOriginalGroup] = useState(INITIAL_NEW_GROUP);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const isEditMode = editingGroupId !== null;

  const baseGroupOptions = productGroups
    .map((group) => {
      const entry = draft.groups[group.id];
      if (entry?.status === 'deleted') return null;
      const merged =
        entry?.status === 'updated' ? { ...group, ...entry.data } : group;
      return {
        label: merged.name,
        value: merged.id,
        description: merged.description ?? '',
      };
    })
    .filter(Boolean);

  const newGroupOptions = Object.entries(draft.groups)
    .filter(([, entry]) => entry?.status === 'created')
    .map(([tempId, entry]) => ({
      label: entry.data.name,
      value: tempId,
      description: entry.data.description ?? '',
    }));

  const groupOptions = [
    NO_GROUP_OPTION,
    ...baseGroupOptions,
    ...newGroupOptions,
  ];

  const selectedGroupOption =
    groupOptions.find((option) => option.value === groupId) ?? NO_GROUP_OPTION;

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
      dismissible: false,
    });

    return !confirmed;
  };

  const handleConfirmAddGroup = () => {
    setHasAttemptedSubmit(true);
    if (isSubmitDisabled) return;

    if (isEditMode) {
      const existingEntry = draft.groups[editingGroupId];
      const status =
        existingEntry?.status === 'created' ? 'created' : 'updated';

      upsertSponsorGroupDraft(editingGroupId, {
        status,
        data: {
          id: editingGroupId,
          name: newGroup.name.trim(),
          description: newGroup.description.trim(),
        },
      });
    } else {
      const tempId = `temp-${crypto.randomUUID()}`;
      upsertSponsorGroupDraft(tempId, {
        status: 'created',
        data: {
          id: tempId,
          name: newGroup.name.trim(),
          description: newGroup.description.trim(),
        },
      });
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

    const serverGroup = productGroups.find((g) => g.id === option.value);
    const serverItemsInGroup = (serverGroup?.products ?? [])
      .filter((item) => draft.items[item.id]?.status !== 'deleted')
      .map((item) => ({
        id: item.id,
        status: draft.items[item.id]?.status ?? 'server',
      }));

    const draftCreatedItemsInGroup = Object.entries(draft.items)
      .filter(
        ([, entry]) =>
          entry?.status === 'created' && entry.data.groupId === option.value,
      )
      .map(([tempId]) => ({ id: tempId, status: 'created' }));

    reassignSponsorItemsGroup(
      [...serverItemsInGroup, ...draftCreatedItemsInGroup],
      null,
    );
    markSponsorGroupDeleted(option.value);

    if (option.value === groupId) {
      onGroupIdChange(null);
    }
  };

  return {
    groupOptions,
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
