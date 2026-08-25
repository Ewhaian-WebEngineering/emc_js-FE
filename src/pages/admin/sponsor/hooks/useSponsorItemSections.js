import { useState } from 'react';

const toSections = (sponsor) => sponsor?.itemSections ?? [];

export function useSponsorItemSections(sponsor) {
  const [itemSections, setItemSections] = useState(toSections(sponsor));
  const [itemsError, setItemsError] = useState(undefined);

  const handleEditItem = (itemId) => {
    // TODO: 협찬품 수정 페이지 이동
  };

  const handleDeleteItem = (itemId) => {
    setItemSections((prev) =>
      prev.map((section) => ({
        ...section,
        items: section.items.filter((item) => item.id !== itemId),
      })),
    );
  };

  const validateItems = () => {
    const isEmpty = itemSections.every((section) => section.items.length === 0);
    const error = isEmpty ? '협찬품을 1개 이상 등록해주세요.' : undefined;
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
