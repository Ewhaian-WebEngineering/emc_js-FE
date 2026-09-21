import { ADMIN_ROUTES } from '@/constants/routes';
import useModal from '@/hooks/modal/useModal';
import { buildSections } from '@/pages/manage/utils/buildSections';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  markSponsorItemDeleted,
  upsertSponsorGroupDraft,
  upsertSponsorItemDraft,
} from '../store/sponsorDraftStore';
import { useSponsorDraftStore } from './useSponsorDraftStore';

export function useSponsorItemSections(sponsor, sponsorId) {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const draft = useSponsorDraftStore();

  const productGroups = sponsor?.productGroups ?? [];
  const ungroupedItems = sponsor?.products ?? [];

  const [itemSections, setItemSections] = useState(() =>
    buildSections(
      productGroups,
      draft.groups,
      draft.items,
      ungroupedItems,
      'items',
    ),
  );

  useEffect(() => {
    setItemSections(
      buildSections(
        productGroups,
        draft.groups,
        draft.items,
        ungroupedItems,
        'items',
      ),
    );
  }, [productGroups, ungroupedItems, draft.groups, draft.items]);

  const [itemsError, setItemsError] = useState(undefined);

  const handleEditItem = (itemId) => {
    const section = itemSections.find((s) =>
      s.items.some((item) => item.id === itemId),
    );
    const targetItem = section?.items.find((item) => item.id === itemId);

    if (!targetItem) return;

    navigate(ADMIN_ROUTES.SPONSOR_ITEM_EDIT(sponsorId, itemId), {
      state: {
        itemData: {
          ...targetItem,
          groupId: section.isUngrouped ? null : section.id,
        },
      },
    });
  };

  const handleDeleteItem = async (itemId) => {
    const result = await showModal({
      variant: 'danger',
      title: '해당 제품을 삭제하시겠습니까?',
      description: '삭제하시면 다시 되돌릴 수 없어요.',
      cancelText: '취소',
      confirmText: '삭제',
    });

    if (!result.confirmed) return;

    markSponsorItemDeleted(itemId);
  };

  const handleReorderItems = useCallback(
    (updatedItems) => {
      updatedItems.forEach((item) => {
        const { id, ...data } = item;
        const isTemp = String(id).startsWith('temp-');
        const existingEntry = draft.items[id];

        upsertSponsorItemDraft(id, {
          status: isTemp ? 'created' : 'updated',
          data,
          file: existingEntry?.file ?? null,
        });
      });
    },
    [draft.items],
  );

  const handleReorderGroups = useCallback((reorderedSections) => {
    reorderedSections
      .filter((section) => !section.isUngrouped)
      .forEach((section, index) => {
        const isTemp = String(section.id).startsWith('temp-');
        upsertSponsorGroupDraft(section.id, {
          status: isTemp ? 'created' : 'updated',
          data: {
            name: section.name,
            description: section.description ?? null,
            displayOrder: index,
          },
        });
      });
  }, []);

  const validateItems = () => {
    const isEmpty = itemSections.every((section) => section.items.length === 0);
    const error = isEmpty ? '내용을 입력해주세요.' : undefined;
    setItemsError(error);
    return error;
  };

  return {
    itemSections,
    setItemSections,
    handleEditItem,
    handleDeleteItem,
    handleReorderItems,
    handleReorderGroups,
    itemsError,
    validateItems,
  };
}
