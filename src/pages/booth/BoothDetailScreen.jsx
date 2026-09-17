import TransparentHeader from '@/designsystem/components/header/TransparentHeader';
import { useGoBack } from '@/hooks/useGoBack';
import { useParams } from 'react-router-dom';
import BoothDetailContent from '@/components/boothDetail/BoothDetailContent';
import { useBoothDetailData } from '@/api/feature/booth/useBoothData';
import { ScreenWrapper } from './style';

export default function BoothDetailScreen() {
  const { boothId } = useParams();
  const handleBack = useGoBack();

  const { booth } = useBoothDetailData(boothId);

  return (
    <ScreenWrapper>
      <TransparentHeader onBack={handleBack} />
      <BoothDetailContent booth={booth} boothId={boothId} interactive />
    </ScreenWrapper>
  );
}
