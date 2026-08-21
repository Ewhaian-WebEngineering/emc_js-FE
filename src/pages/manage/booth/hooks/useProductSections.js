import { useState } from 'react';

export function useProductSections({ productGroups, products }) {
  const [productSections, setProductSections] = useState(() => [
    ...productGroups.map((group) => ({ ...group, isUngrouped: false })),
    { id: 'ungrouped', name: '그룹 없음', products, isUngrouped: true },
  ]);

  const handleEditProduct = (productId) => {
    // TODO: 제품 수정 로직 구현
    alert(`제품 ${productId} 수정`);
  };

  const handleDeleteProduct = (productId) => {
    setProductSections((prev) =>
      prev.map((section) => ({
        ...section,
        products: section.products.filter(
          (product) => product.id !== productId,
        ),
      })),
    );
  };

  const hasAnyProduct = productSections.some((s) => s.products.length > 0);

  return {
    productSections,
    setProductSections,
    handleEditProduct,
    handleDeleteProduct,
    hasAnyProduct,
  };
}
