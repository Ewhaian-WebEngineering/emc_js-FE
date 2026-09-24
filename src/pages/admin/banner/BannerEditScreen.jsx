import BannerForm from './BannerForm';
import { useParams } from 'react-router-dom';
import { useBanner, useUpdateBanner } from '@/api/feature/admin/useBannerData';
import { useToastContext } from '@/designsystem/components/toast/ToastContext';

export default function BannerEditScreen() {
  const { bannerId } = useParams();
  const { data: banner } = useBanner(bannerId);
  const { mutateAsync: updateBanner } = useUpdateBanner();
  const { toast } = useToastContext();

  const handleSubmit = async (payload) => {
    await updateBanner({ bid: bannerId, ...payload });
    toast({ message: '변경사항이 저장되었어요.' });
  };

  return (
    <BannerForm mode="edit" initialData={banner} onSubmit={handleSubmit} />
  );
}
