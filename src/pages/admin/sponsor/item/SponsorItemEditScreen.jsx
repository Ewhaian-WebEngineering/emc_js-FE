import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import SponsorItemFormScreen from './SponsorItemFormScreen';
import { mockSponsorItem } from '../mocks/mockSponsorItem';
import { upsertSponsorItemDraft } from '../store/sponsorDraftStore';

export default function SponsorItemEditScreen() {
  const { sponsorId, itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const stateItem = location.state?.itemData;

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (stateItem) {
      setItem(stateItem);
      setIsLoading(false);
      return;
    }
    setItem(mockSponsorItem);
    setIsLoading(false);
  }, [sponsorId, itemId, stateItem]);

  if (isLoading) return <div>Loading...</div>;

  const handleSubmit = async (values, thumbnailFile) => {
    const status = stateItem?.status === 'created' ? 'created' : 'updated';

    upsertSponsorItemDraft(itemId, {
      status,
      data: { id: itemId, ...values },
      file: thumbnailFile,
    });

    navigate(ADMIN_ROUTES.SPONSOR_EDIT(sponsorId));
  };

  return (
    <SponsorItemFormScreen
      item={item}
      onSubmit={handleSubmit}
      submitLabel="edit"
    />
  );
}
