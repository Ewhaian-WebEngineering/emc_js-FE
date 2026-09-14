import { useImageUpload } from '@/api/core/s3/useImageUpload';
import { useUpdateMyBoothData } from '@/api/feature/booth/useBoothData';
import {
  createProduct,
  createProductGroup,
  deleteProduct,
  deleteProductGroup,
  updateProduct,
  updateProductGroup,
} from '@/api/feature/product/productApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetDraft } from '../../store/boothDraftStore';
import { queryClient } from '@/api/core/query/queryClient';
import { MANAGE_ROUTES } from '@/constants/routes';

export function useSaveBoothDraft(booth, boothId) {
  const navigate = useNavigate();
  const { mutateAsync: updateBoothAsync } = useUpdateMyBoothData();
  const { mutateAsync: uploadImage } = useImageUpload();
  const [isSaving, setIsSaving] = useState(false);

  const save = async (boothForm, draft) => {
    setIsSaving(true);
    try {
      const groupIdMap = {};
      const groupEntries = Object.entries(draft.groups);

      for (const [key, entry] of groupEntries) {
        if (entry.status === 'created') {
          const { displayOrder: _omit, ...createPayload } = entry.data;
          const created = await createProductGroup(createPayload);
          groupIdMap[key] = created.id;
        }
      }

      for (const [key, entry] of groupEntries) {
        if (entry.status === 'updated') {
          await updateProductGroup(key, entry.data);
        }
      }

      const productEntries = Object.entries(draft.products);

      for (const [key, entry] of productEntries) {
        if (entry.status === 'deleted') continue;

        let imageKey = entry.data.imageKey;

        if (entry.file) {
          const { fileKey } = await uploadImage({
            file: entry.file,
            imageType: 'booth_product',
            ownerId: boothId,
          });
          imageKey = fileKey;
        }

        const resolvedGroupId = String(entry.data.groupId).startsWith(
          'temp-group-',
        )
          ? groupIdMap[entry.data.groupId]
          : entry.data.groupId;

        const { name, price, isOnSale, description, displayOrder } = entry.data;
        const payload = {
          name,
          price,
          isOnSale,
          description,
          groupId: resolvedGroupId,
          imageKey,
          ...(displayOrder !== undefined && { displayOrder }),
        };

        if (entry.status === 'created') {
          const { displayOrder: _omit, ...createPayload } = payload;
          await createProduct(createPayload);
        } else if (entry.status === 'updated') {
          await updateProduct(key, payload);
        }
      }

      for (const [key, entry] of productEntries) {
        if (entry.status === 'deleted') {
          await deleteProduct(key);
        }
      }

      for (const [key, entry] of groupEntries) {
        if (entry.status === 'deleted') {
          await deleteProductGroup(key);
        }
      }

      let thumbnailKey = booth.thumbnailKey;
      if (draft.thumbnail.file) {
        const { fileKey } = await uploadImage({
          file: draft.thumbnail.file,
          imageType: 'booth_thumbnail',
          ownerId: boothId,
        });
        thumbnailKey = fileKey;
      } else if (draft.thumbnail.removed) {
        thumbnailKey = null;
      }

      const { marks, name, location, notices, ...boothFieldsOnly } = boothForm;
      await updateBoothAsync({ ...boothFieldsOnly, thumbnailKey });

      resetDraft();
      queryClient.invalidateQueries({ queryKey: ['my-booth'] });
      queryClient.invalidateQueries({ queryKey: ['booth-detail', boothId] });
      queryClient.invalidateQueries({ queryKey: ['product-groups'] });
      navigate(MANAGE_ROUTES.BOOTH_PREVIEW(boothId));
    } finally {
      setIsSaving(false);
    }
  };

  return { save, isSaving };
}
