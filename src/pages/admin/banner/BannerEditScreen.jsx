import BannerForm from './BannerForm';
import { useParams } from 'react-router-dom';
import { useBanner, useUpdateBanner } from '@/api/feature/admin/useBannerData';
import { useToastContext } from '@/designsystem/components/toast/ToastContext';

export default function BannerEditScreen() {
  const { bannerId } = useParams();
  const { data: banner } = useBanner(bannerId);
  const { mutate: updateBanner } = useUpdateBanner();
  const { toast } = useToastContext();

  const handleSubmit = (payload) => {
    updateBanner(
      { bid: bannerId, ...payload },
      {
        onSuccess: () => {
          toast({ message: '변경 사항이 저장되었어요.' });
        },
      },
    );
  };

  return (
    <BannerForm mode="edit" initialData={banner} onSubmit={handleSubmit} />
  );
}
