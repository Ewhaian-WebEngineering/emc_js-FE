import TransparentHeader from '@/designsystem/components/header/TransparentHeader';
import { useGoBack } from '@/hooks/useGoBack';
import { useParams } from 'react-router-dom';
import { DUMMY_BOOTH_DETAIL } from './constants/dummyBoothDetail';
import BoothDetailContent from '@/components/boothDetail/BoothDetailContent';

export default function BoothDetailScreen() {
  const { boothId } = useParams();
  const handleBack = useGoBack();

  // TODO: 실제 데이터로 교체
  const booth = DUMMY_BOOTH_DETAIL;

  return (
    <>
      <TransparentHeader onBack={handleBack} />
      <BoothDetailContent booth={booth} boothId={boothId} interactive />
    </>
  );
}
