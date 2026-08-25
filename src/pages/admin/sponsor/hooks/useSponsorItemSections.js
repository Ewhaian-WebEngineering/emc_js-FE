import { ADMIN_ROUTES } from '@/constants/routes';
import useModal from '@/hooks/modal/useModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const toSections = (sponsor) => sponsor?.itemSections ?? [];

export function useSponsorItemSections(sponsor, sponsorId) {
  const navigate = useNavigate();
  const { showModal } = useModal();

  const [itemSections, setItemSections] = useState(toSections(sponsor));
  const [itemsError, setItemsError] = useState(undefined);

  const handleEditItem = (itemId) => {
    let targetItem = null;

    for (const section of itemSections) {
      const found = section.items.find((item) => item.id === itemId);
      if (found) {
        targetItem = found;
        break;
      }
    }

    if (!targetItem) return;

    navigate(ADMIN_ROUTES.SPONSOR_ITEM_EDIT(sponsorId, itemId), {
      state: { itemData: targetItem },
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

    setItemSections((prev) =>
      prev.map((section) => ({
        ...section,
        items: section.items.filter((item) => item.id !== itemId),
      })),
    );
  };

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
    itemsError,
    validateItems,
  };
}
