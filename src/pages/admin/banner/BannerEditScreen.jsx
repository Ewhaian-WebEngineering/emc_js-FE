import BannerForm from './BannerForm';
import { useNavigate } from 'react-router-dom';
import { mockBanner } from '../constants/mockBanner';
import { ADMIN_ROUTES } from '@/constants/routes';

export default function BannerEditScreen() {
  const navigate = useNavigate();
  const handleSubmit = (payload) => {
    // TODO: api로 교체
    console.log('edit payload', payload);
    navigate(ADMIN_ROUTES.DASHBOARD);
  };

  return (
    <BannerForm mode="edit" initialData={mockBanner} onSubmit={handleSubmit} />
  );
}
