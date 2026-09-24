import { useState } from 'react';
import BannerForm from './BannerForm';
import {
  useCreateBanner,
  useUpdateBanner,
} from '@/api/feature/admin/useBannerData';
import { useToastContext } from '@/designsystem/components/toast/ToastContext';

export default function BannerCreateScreen() {
  const { mutateAsync: createBanner } = useCreateBanner();
  const { mutateAsync: updateBanner } = useUpdateBanner();
  const { toast } = useToastContext();

  const [createdId, setCreatedId] = useState(null);

  const handleSubmit = async (payload) => {
    if (createdId) {
      await updateBanner({ bid: createdId, ...payload });
    } else {
      const created = await createBanner(payload);
      setCreatedId(created?.id);
    }

    toast({ message: '변경사항이 저장되었어요.' });
  };

  return (
    <BannerForm mode={createdId ? 'edit' : 'create'} onSubmit={handleSubmit} />
  );
}
