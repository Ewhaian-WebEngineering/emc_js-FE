import { MANAGE_ROUTES } from '@/constants/routes';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteProduct } from '@/api/feature/product/useProductData';

export function useProductSections({ productGroups }) {
  const navigate = useNavigate();
  const { boothId } = useParams();
  const { mutateAsync: deleteProduct } = useDeleteProduct();

  const [productSections, setProductSections] = useState(() => [
    ...productGroups.map((group) => ({ ...group, isUngrouped: false })),
    { id: 'ungrouped', name: '그룹 없음', products: [], isUngrouped: true },
  ]);

  useEffect(() => {
    setProductSections([
      ...productGroups.map((group) => ({ ...group, isUngrouped: false })),
      { id: 'ungrouped', name: '그룹 없음', products: [], isUngrouped: true },
    ]);
  }, [productGroups]);

  const [productsError, setProductsError] = useState(null);

  const handleEditProduct = useCallback(
    (productId) => {
      navigate(MANAGE_ROUTES.PRODUCT_EDIT(boothId, productId), {
        state: {
          productData: productSections
            .flatMap((s) => s.products)
            .find((p) => p.id === productId),
        },
      });
    },
    [productSections, boothId],
  );

  const handleDeleteProduct = useCallback(async (productId) => {
    await deleteProduct(productId);
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
