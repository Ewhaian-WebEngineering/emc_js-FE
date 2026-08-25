import { ADMIN_ROUTES, MANAGE_ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import SponsorFormScreen from './SponsorFormScreen';

export default function SponsorCreateScreen() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    // TODO: API 연동 시 sponsorId 받아오기
    const sponsorId = 'temp-id';
    navigate(ADMIN_ROUTES.DASHBOARD);
  };

  return <SponsorFormScreen onSubmit={handleSubmit} submitLabel="create" />;
}
