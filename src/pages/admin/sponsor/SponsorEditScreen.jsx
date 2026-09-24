import { useParams } from 'react-router-dom';
import { useSponsorDraftStore } from './hooks/useSponsorDraftStore';
import { useSaveSponsorDraft } from './hooks/useSaveSponsorDraft';
import { InfiniteScrollLoader } from '@/components/common/style';
import Spinner from '@/designsystem/components/spinner/Spinner';
import SponsorFormScreen from './SponsorFormScreen';
import { useSponsorDetail } from '@/api/feature/admin/useSponsorManageData';

export default function SponsorEditScreen() {
  const { sponsorId } = useParams();
  const { data: sponsor, isPending } = useSponsorDetail(sponsorId);
  const draft = useSponsorDraftStore();
  const { save, isSaving } = useSaveSponsorDraft(sponsorId);

  if (isPending) {
    return (
      <InfiniteScrollLoader>
        <Spinner />
      </InfiniteScrollLoader>
    );
  }

  const handleSubmit = async (sponsorForm) => {
    await save(sponsorForm, draft);
  };

  return (
    <SponsorFormScreen
      sponsor={sponsor}
      onSubmit={handleSubmit}
      submitLabel="edit"
      isSaving={isSaving}
    />
  );
}
