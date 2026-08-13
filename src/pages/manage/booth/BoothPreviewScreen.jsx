import BoothDetailContent from '@/components/boothDetail/BoothDetailContent';
import { MANAGE_ROUTES } from '@/constants/routes';
import TextButton from '@/designsystem/components/button/textbutton/TextButton';
import TransparentHeader from '@/designsystem/components/header/TransparentHeader';
import { useGoBack } from '@/hooks/useGoBack';
import { DUMMY_BOOTH_DETAIL } from '@/pages/booth/constants/dummyBoothDetail';
import { useNavigate, useParams } from 'react-router-dom';

export default function BoothPreviewScreen() {
  const { boothId } = useParams();
  const handleBack = useGoBack();
  const navigate = useNavigate();

  // TODO: 실제 데이터로 교체
  const booth = DUMMY_BOOTH_DETAIL;

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
