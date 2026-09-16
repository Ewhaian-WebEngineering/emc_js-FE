import { useImageUpload } from '@/api/core/s3/useImageUpload';
import {
  createSponsorProduct,
  createSponsorProductGroup,
  deleteSponsorProduct,
  deleteSponsorProductGroup,
  updateSponsor,
  updateSponsorProduct,
  updateSponsorProductGroup,
} from '@/api/feature/admin/sponsorManageApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetSponsorDraft } from '../store/sponsorDraftStore';
import { queryClient } from '@/api/core/query/queryClient';
import { ADMIN_ROUTES } from '@/constants/routes';

export function useSaveSponsorDraft(sponsorId) {
  const navigate = useNavigate();
  const { mutateAsync: uploadImage } = useImageUpload();
  const [isSaving, setIsSaving] = useState(false);

  const save = async (sponsorForm, draft) => {
    setIsSaving(true);
    try {
      let sponsorImageKey;
      if (draft.thumbnail.file) {
        const { fileKey } = await uploadImage({
          file: draft.thumbnail.file,
          imageType: 'sponsor_thumbnail',
          ownerId: sponsorId,
        });
        sponsorImageKey = fileKey;
      } else if (draft.thumbnail.removed) {
        sponsorImageKey = null;
      }

      await updateSponsor(sponsorId, {
        ...sponsorForm,
        ...(sponsorImageKey !== undefined && { imageKey: sponsorImageKey }),
      });

      const groupIdMap = {};
      const groupEntries = Object.entries(draft.groups);

      for (const [key, entry] of groupEntries) {
        if (entry.status === 'created') {
          const created = await createSponsorProductGroup(
            sponsorId,
            entry.data,
          );
          groupIdMap[key] = created.id;
        }
      }

      for (const [key, entry] of groupEntries) {
        if (entry.status === 'updated') {
          await updateSponsorProductGroup(sponsorId, key, entry.data);
        }
      }

      const productEntries = Object.entries(draft.items);

      for (const [key, entry] of productEntries) {
        if (entry.status === 'deleted') continue;

        let productImageKey;
        if (entry.file) {
          const { fileKey } = await uploadImage({
            file: entry.file,
            imageType: 'sponsor_product',
            ownerId: sponsorId,
          });
          productImageKey = fileKey;
        }

        const resolvedGroupId = String(entry.data.groupId).startsWith(
          'temp-group-',
        )
          ? groupIdMap[entry.data.groupId]
          : entry.data.groupId;

        const { name, description, displayOrder } = entry.data;
        const payload = {
          name,
          description,
          ...(resolvedGroupId !== null && { groupId: resolvedGroupId }),
          ...(productImageKey !== undefined && { imageKey: productImageKey }),
          ...(displayOrder !== undefined && { displayOrder }),
        };

        if (entry.status === 'created') {
          const { displayOrder: _omit, ...createPayload } = payload;
          await createSponsorProduct(sponsorId, createPayload);
        } else if (entry.status === 'updated') {
          await updateSponsorProduct(sponsorId, key, payload);
        }
      }

      for (const [key, entry] of productEntries) {
        if (entry.status === 'deleted') {
          await deleteSponsorProduct(sponsorId, key);
        }
      }

      for (const [key, entry] of groupEntries) {
        if (entry.status === 'deleted') {
          await deleteSponsorProductGroup(sponsorId, key);
        }
      }

      resetSponsorDraft();
      queryClient.invalidateQueries({
        queryKey: ['sponsor-detail', sponsorId],
      });
      navigate(ADMIN_ROUTES.DASHBOARD);
    } finally {
      setIsSaving(false);
    }
  };

  return { save, isSaving };
}
