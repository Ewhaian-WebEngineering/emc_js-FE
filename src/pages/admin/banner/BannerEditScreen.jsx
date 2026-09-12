import BannerForm from './BannerForm';
import { useNavigate, useParams } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useBanner, useUpdateBanner } from '@/api/feature/admin/useBannerData';

export default function BannerEditScreen() {
  const navigate = useNavigate();
  const { bannerId } = useParams();
  const { data: banner } = useBanner(bannerId);
  const { mutate: updateBanner } = useUpdateBanner();

  const handleSubmit = (payload) => {
    updateBanner(
      { bid: bannerId, ...payload },
      {
        onSuccess: () => {
          navigate(ADMIN_ROUTES.DASHBOARD);
        },
      },
    );
  };

  return (
    <BannerForm mode="edit" initialData={banner} onSubmit={handleSubmit} />
  );
}
