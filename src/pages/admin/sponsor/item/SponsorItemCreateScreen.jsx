import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSponsorDetail } from '@/api/feature/admin/useSponsorManageData';
import SponsorItemFormScreen from './SponsorItemFormScreen';
import {
  getSnapshot,
  upsertSponsorItemDraft,
} from '../store/sponsorDraftStore';
import { useToastContext } from '@/designsystem/components/toast/ToastContext';

function createTempItemId() {
  return `temp-${crypto.randomUUID()}`;
}

export default function SponsorItemCreateScreen() {
  const { toast } = useToastContext();
  const { sponsorId } = useParams();
  const [itemId] = useState(createTempItemId);

  const { data: sponsor, isPending } = useSponsorDetail(sponsorId);

  const handleSubmit = async (values, thumbnailFile) => {
    const prevFile = getSnapshot().items[itemId]?.file ?? null;

    upsertSponsorItemDraft(itemId, {
      status: 'created',
      data: { id: itemId, ...values },
      file: thumbnailFile ?? prevFile,
    });

    toast({ message: '변경사항이 저장되었어요.' });
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <SponsorItemFormScreen
      productGroups={sponsor?.productGroups ?? []}
      onSubmit={handleSubmit}
      submitLabel="create"
    />
  );
}
