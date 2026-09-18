import { ADMIN_ROUTES } from '@/constants/routes';
import { useNavigate, useParams } from 'react-router-dom';
import SponsorItemFormScreen from './SponsorItemFormScreen';
import { upsertSponsorItemDraft } from '../store/sponsorDraftStore';
import { useToastContext } from '@/designsystem/components/toast/ToastContext';

export default function SponsorItemCreateScreen() {
  const navigate = useNavigate();
  const { toast } = useToastContext();
  const { sponsorId } = useParams();

  const handleSubmit = async (values, thumbnailFile) => {
    const itemId = `temp-${crypto.randomUUID()}`;

    upsertSponsorItemDraft(itemId, {
      status: 'created',
      data: { id: itemId, ...values },
      file: thumbnailFile,
    });

    toast({ message: '변경사항이 저장되었어요.' });
    navigate(ADMIN_ROUTES.SPONSOR_EDIT(sponsorId));
  };

  return <SponsorItemFormScreen onSubmit={handleSubmit} submitLabel="create" />;
}
