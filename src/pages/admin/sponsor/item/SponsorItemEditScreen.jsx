import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useSponsorDetail } from '@/api/feature/admin/useSponsorManageData';
import { upsertSponsorItemDraft } from '../store/sponsorDraftStore';
import SponsorItemFormScreen from './SponsorItemFormScreen';

export default function SponsorItemEditScreen() {
  const { sponsorId, itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const stateItem = location.state?.itemData;

  const { data: sponsor, isPending } = useSponsorDetail(sponsorId);

  const item =
    stateItem ??
    sponsor?.productGroups
      ?.flatMap((group) => group.products ?? [])
      .find((product) => product.id === itemId) ??
    sponsor?.products?.find((product) => product.id === itemId) ??
    null;

  if (isPending) return <div>Loading...</div>;

  const handleSubmit = async (values, thumbnailFile) => {
    const status = stateItem?.status === 'created' ? 'created' : 'updated';

    upsertSponsorItemDraft(itemId, {
      status,
      data: { id: itemId, ...values },
      file: thumbnailFile,
    });

    navigate(ADMIN_ROUTES.SPONSOR_EDIT(sponsorId));
  };

  return (
    <SponsorItemFormScreen
      item={item}
      productGroups={sponsor?.productGroups ?? []}
      onSubmit={handleSubmit}
      submitLabel="edit"
    />
  );
}
