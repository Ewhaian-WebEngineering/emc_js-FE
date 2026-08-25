import { ADMIN_ROUTES } from '@/constants/routes';
import { useNavigate, useParams } from 'react-router-dom';
import SponsorItemFormScreen from './SponsorItemFormScreen';

export default function SponsorItemCreateScreen() {
  const navigate = useNavigate();
  const { sponsorId } = useParams();

  const handleSubmit = async (values) => {
    // TODO: API 연동 시 itemId 받아오기
    const itemId = 'temp-item-id';
    navigate(ADMIN_ROUTES.SPONSOR_ITEM_EDIT(sponsorId, itemId), {
      state: { itemData: values },
    });
  };

  return <SponsorItemFormScreen onSubmit={handleSubmit} submitLabel="create" />;
}
