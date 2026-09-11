import { useMyBoothData } from '@/api/feature/booth/useBoothData';
import BoothDetailContent from '@/components/boothDetail/BoothDetailContent';
import { InfiniteScrollLoader } from '@/components/common/style';
import { MANAGE_ROUTES } from '@/constants/routes';
import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import TransparentHeader from '@/designsystem/components/header/TransparentHeader';
import Spinner from '@/designsystem/components/spinner/Spinner';
import { useGoBack } from '@/hooks/useGoBack';
import { useNavigate, useParams } from 'react-router-dom';

export default function BoothPreviewScreen() {
  const { boothId } = useParams();
  const handleBack = useGoBack();
  const navigate = useNavigate();

  const { data: booth, isPending } = useMyBoothData();

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
    <>
      <TransparentHeader
        onBack={handleBack}
        right={
          <TextButton
            onClick={() => {
              navigate(MANAGE_ROUTES.BOOTH_EDIT(boothId));
            }}
          >
            수정
          </TextButton>
        }
      />
      <BoothDetailContent booth={booth} boothId={boothId} onBack={handleBack} />
    </>
  );
}
