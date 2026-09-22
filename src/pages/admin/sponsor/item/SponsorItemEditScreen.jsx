import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useSponsorDetail } from '@/api/feature/admin/useSponsorManageData';
import { upsertSponsorItemDraft } from '../store/sponsorDraftStore';
import { useSponsorItemSections } from '../hooks/useSponsorItemSections';
import SponsorItemFormScreen from './SponsorItemFormScreen';
import { useToastContext } from '@/designsystem/components/toast/ToastContext';

export default function SponsorItemEditScreen() {
  const { sponsorId, itemId } = useParams();
  const { toast } = useToastContext();
  const location = useLocation();
  const navigate = useNavigate();
  const stateItem = location.state?.itemData;

  const { data: sponsor, isPending } = useSponsorDetail(sponsorId);
  const { itemSections } = useSponsorItemSections(sponsor, sponsorId);

  const item =
    stateItem ??
    sponsor?.productGroups
      ?.flatMap((group) => group.products ?? [])
      .find((product) => product.id === itemId) ??
    sponsor?.products?.find((product) => product.id === itemId) ??
    null;

  if (isPending) return <div>Loading...</div>;

  const handleSubmit = async (values, thumbnailFile) => {
    const status = stateItem?.status === 'created' ? 'created' : 'updated';

    upsertSponsorItemDraft(itemId, {
      status,
      data: { id: itemId, ...values, displayOrder: item?.displayOrder },
      file: thumbnailFile,
    });

    toast({ message: '변경사항이 저장되었어요.' });
    navigate(ADMIN_ROUTES.SPONSOR_EDIT(sponsorId));
  };

  return (
    <SponsorItemFormScreen
      item={item}
      productGroups={sponsor?.productGroups ?? []}
      onSubmit={handleSubmit}
      submitLabel="edit"
    />
  );
}
