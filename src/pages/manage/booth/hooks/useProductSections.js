import { useCallback, useState } from 'react';

export function useProductSections({ productGroups, products }) {
  const [productSections, setProductSections] = useState(() => [
    ...productGroups.map((group) => ({ ...group, isUngrouped: false })),
    { id: 'ungrouped', name: '그룹 없음', products, isUngrouped: true },
  ]);

  const [productsError, setProductsError] = useState(null);

  const handleEditProduct = useCallback((productId) => {
    // TODO: 제품 수정 로직 구현
    alert(`제품 ${productId} 수정`);
  }, []);

  const handleDeleteProduct = useCallback((productId) => {
    // TODO: 제품 삭제 로직 구현
    setProductSections((prev) =>
      prev.map((section) => ({
        ...section,
        products: section.products.filter((p) => p.id !== productId),
      })),
    );
  }, []);

  const hasAnyProduct = productSections.some((s) => s.products.length > 0);

  const validateProducts = () => {
    const message = hasAnyProduct ? null : '제품을 등록해주세요.';
    setProductsError(message);
    return message;
  };

  return {
    productSections,
    setProductSections,
    handleEditProduct,
    handleDeleteProduct,
    productsError,
    validateProducts,
  };
}
