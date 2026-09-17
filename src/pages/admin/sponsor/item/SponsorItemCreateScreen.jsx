import { ADMIN_ROUTES } from '@/constants/routes';
import { useNavigate, useParams } from 'react-router-dom';
import SponsorItemFormScreen from './SponsorItemFormScreen';
import { upsertSponsorItemDraft } from '../store/sponsorDraftStore';

export default function SponsorItemCreateScreen() {
  const navigate = useNavigate();
  const { sponsorId } = useParams();

  const handleSubmit = async (values, thumbnailFile) => {
    const itemId = `temp-${crypto.randomUUID()}`;

    upsertSponsorItemDraft(itemId, {
      status: 'created',
      data: { id: itemId, ...values },
      file: thumbnailFile,
    });

    navigate(ADMIN_ROUTES.SPONSOR_EDIT(sponsorId));
  };

  return <SponsorItemFormScreen onSubmit={handleSubmit} submitLabel="create" />;
}
