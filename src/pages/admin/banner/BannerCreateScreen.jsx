import BannerForm from './BannerForm';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useCreateBanner } from '@/api/feature/admin/useBannerData';

export default function BannerCreateScreen() {
  const navigate = useNavigate();
  const { mutateAsync: createBanner } = useCreateBanner();

  const handleSubmit = async (payload) => {
    await createBanner(payload);
    navigate(ADMIN_ROUTES.DASHBOARD);
  };

  return <BannerForm mode="create" onSubmit={handleSubmit} />;
}
