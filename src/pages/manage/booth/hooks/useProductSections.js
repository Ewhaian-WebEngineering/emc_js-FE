import { MANAGE_ROUTES } from '@/constants/routes';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useProductSections({ productGroups, products }) {
  const navigate = useNavigate();

  const [productSections, setProductSections] = useState(() => [
    ...productGroups.map((group) => ({ ...group, isUngrouped: false })),
    { id: 'ungrouped', name: '그룹 없음', products, isUngrouped: true },
  ]);

  const [productsError, setProductsError] = useState(null);

  const handleEditProduct = useCallback((productId) => {
    navigate(MANAGE_ROUTES.PRODUCT_EDIT(productId), {
      state: {
        productData: productSections
          .flatMap((s) => s.products)
          .find((p) => p.id === productId),
      },
    });
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
