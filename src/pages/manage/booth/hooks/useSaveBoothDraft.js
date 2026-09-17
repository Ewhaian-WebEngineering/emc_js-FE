import { useImageUpload } from '@/api/core/s3/useImageUpload';
import {
  useProductGroupList,
  useUpdateMyBoothData,
} from '@/api/feature/booth/useBoothData';
import {
  createProduct,
  createProductGroup,
  deleteProduct,
  deleteProductGroup,
  updateProduct,
  updateProductGroup,
} from '@/api/feature/product/productApi';
import {
  createNotice,
  deleteNotice,
  updateNotice,
} from '@/api/feature/booth/boothApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetDraft } from '../../store/boothDraftStore';
import { queryClient } from '@/api/core/query/queryClient';
import { MANAGE_ROUTES } from '@/constants/routes';

export function useSaveBoothDraft(booth, boothId) {
  const navigate = useNavigate();
  const { data: productGroups } = useProductGroupList(boothId);
  const { mutateAsync: updateBoothAsync } = useUpdateMyBoothData(boothId);
  const { mutateAsync: uploadImage } = useImageUpload();
  const [isSaving, setIsSaving] = useState(false);

  const save = async (boothForm, draft) => {
    setIsSaving(true);
    try {
      const groupIdMap = {};
      const groupEntries = Object.entries(draft.groups);

      for (const [key, entry] of groupEntries) {
        if (entry.status === 'created') {
          const createPayload = { ...entry.data };
          delete createPayload.id;
          delete createPayload.displayOrder;
          const created = await createProductGroup(createPayload, boothId);
          groupIdMap[key] = created.id;
        }
      }

      for (const [key, entry] of groupEntries) {
        if (entry.status === 'updated') {
          await updateProductGroup(key, entry.data, boothId);
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
          await createProduct(createPayload, boothId);
        } else if (entry.status === 'updated') {
          await updateProduct(key, payload, boothId);
        }
      }

      for (const [key, entry] of productEntries) {
        if (entry.status === 'deleted') {
          await deleteProduct(key, boothId);
        }
      }

      for (const [key, entry] of groupEntries) {
        if (entry.status === 'deleted') {
          await deleteProductGroup(key, boothId);
        }
      }

      const noticeEntries = Object.entries(draft.notices);

      for (const [key, entry] of noticeEntries) {
        if (entry.status === 'created') {
          await createNotice(
            { title: entry.data.title, content: entry.data.content },
            boothId,
          );
        } else if (entry.status === 'updated') {
          await updateNotice(
            { nid: key, title: entry.data.title, content: entry.data.content },
            boothId,
          );
        }
      }

      for (const [key, entry] of noticeEntries) {
        if (entry.status === 'deleted') {
          await deleteNotice(key, boothId);
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
      queryClient.invalidateQueries({ queryKey: ['product-groups', boothId] });
      queryClient.invalidateQueries({ queryKey: ['notices', boothId] });
      navigate(MANAGE_ROUTES.BOOTH_PREVIEW(boothId), { replace: true });
    } finally {
      setIsSaving(false);
    }
  };

  return { save, isSaving };
}
