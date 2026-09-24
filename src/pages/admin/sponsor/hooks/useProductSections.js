import { MANAGE_ROUTES } from '@/constants/routes';
import {
  markProductDeleted,
  updateBoothField,
  upsertGroupDraft,
  upsertProductDraft,
} from '@/pages/manage/store/boothDraftStore';
import { useBoothDraftStore } from '@/pages/manage/store/useBoothDraftStore';
import { buildSections } from '@/pages/manage/utils/buildSections';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EMPTY = [];

export function useProductSections({
  productGroups = EMPTY,
  ungroupedProducts = EMPTY,
  booth,
}) {
  const navigate = useNavigate();
  const { boothId } = useParams();
  const draft = useBoothDraftStore();

  const ungroupedDisplayOrder =
    draft.boothFields?.ungroupedDisplayOrder ??
    booth?.ungroupedDisplayOrder ??
    Number.MAX_SAFE_INTEGER;

  const [productSections, setProductSections] = useState(() =>
    buildSections(
      productGroups,
      draft.groups,
      draft.products,
      ungroupedProducts,
      'products',
      ungroupedDisplayOrder,
    ),
  );

  useEffect(() => {
    setProductSections(
      buildSections(
        productGroups,
        draft.groups,
        draft.products,
        ungroupedProducts,
        'products',
        ungroupedDisplayOrder,
      ),
    );
  }, [
    productGroups,
    ungroupedProducts,
    draft.groups,
    draft.products,
    ungroupedDisplayOrder,
  ]);

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

  const handleReorderGroups = useCallback((reorderedSections) => {
    reorderedSections.forEach((section, index) => {
      if (section.isUngrouped) {
        updateBoothField('ungroupedDisplayOrder', index);
        return;
      }

      const isTemp = String(section.id).startsWith('temp-group-');
      upsertGroupDraft(section.id, {
        status: isTemp ? 'created' : 'updated',
        data: {
          name: section.name,
          description: section.description ?? null,
          displayOrder: index,
        },
      });
    });
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
    handleReorderProducts,
    handleReorderGroups,
    productsError,
    validateProducts,
  };
}
