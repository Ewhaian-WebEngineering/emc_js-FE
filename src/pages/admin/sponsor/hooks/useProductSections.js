import { useCallback, useEffect, useState } from 'react';
import { MANAGE_ROUTES } from '@/constants/routes';
import { useNavigate, useParams } from 'react-router-dom';
import { useBoothDraftStore } from '@/pages/manage/store/useBoothDraftStore';
import { buildSections } from '@/pages/manage/utils/buildSections';
import {
  markProductDeleted,
  upsertProductDraft,
} from '@/pages/manage/store/boothDraftStore';

export function useProductSections({ productGroups }) {
  const navigate = useNavigate();
  const { boothId } = useParams();
  const draft = useBoothDraftStore();

  const [productSections, setProductSections] = useState(() =>
    buildSections(productGroups, draft.groups, draft.products, [], 'products'),
  );

  useEffect(() => {
    setProductSections(
      buildSections(
        productGroups,
        draft.groups,
        draft.products,
        [],
        'products',
      ),
    );
  }, [productGroups, draft.groups, draft.products]);

  const [productsError, setProductsError] = useState(null);

  const handleEditProduct = useCallback(
    (productId) => {
      const section = productSections.find((s) =>
        s.products.some((p) => p.id === productId),
      );
      const target = section?.products.find((p) => p.id === productId);

      navigate(MANAGE_ROUTES.PRODUCT_EDIT(boothId, productId), {
        state: {
          productData: target && {
            ...target,
            groupId: section.isUngrouped ? null : section.id,
          },
        },
      });
    },
    [productSections, boothId],
  );

  const handleDeleteProduct = useCallback((productId) => {
    markProductDeleted(productId);
  }, []);

  const handleReorderProducts = useCallback(
    (updatedProducts) => {
      updatedProducts.forEach((product) => {
        const { id, ...data } = product;
        const isTemp = String(id).startsWith('temp-product-');
        const existingEntry = draft.products[id];

        upsertProductDraft(id, {
          status: isTemp ? 'created' : 'updated',
          data,
          file: existingEntry?.file ?? null,
        });
      });
    },
    [draft.products],
  );

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
    handleReorderProducts,
    productsError,
    validateProducts,
  };
}
