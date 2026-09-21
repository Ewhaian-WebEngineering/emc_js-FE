import { useMyBoothData } from '@/api/feature/booth/useBoothData';
import BoothDetailContent from '@/components/boothDetail/BoothDetailContent';
import { InfiniteScrollLoader } from '@/components/common/style';
import { MANAGE_ROUTES } from '@/constants/routes';
import TransparentHeader from '@/designsystem/components/header/TransparentHeader';
import Spinner from '@/designsystem/components/spinner/Spinner';
import { useGoBack } from '@/hooks/useGoBack';
import { useNavigate, useParams } from 'react-router-dom';
import { BoothPreviewContainer, EditButton } from './style';

export default function BoothPreviewScreen() {
  const { boothId } = useParams();
  const handleBack = useGoBack();
  const navigate = useNavigate();

  const { data: booth, isPending } = useMyBoothData(boothId);

  if (isPending) {
    return (
      <>
        <TransparentHeader onBack={handleBack} />
        <InfiniteScrollLoader>
          <Spinner />
        </InfiniteScrollLoader>
      </>
    );
  }

  return (
    <BoothPreviewContainer>
      <TransparentHeader
        onBack={handleBack}
        right={
          <EditButton
            onClick={() => {
              navigate(MANAGE_ROUTES.BOOTH_EDIT(boothId), { replace: true });
            }}
          >
            수정
          </EditButton>
        }
      />
      <BoothDetailContent booth={booth} boothId={boothId} onBack={handleBack} />
    </BoothPreviewContainer>
  );
}
