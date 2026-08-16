import { useGoBack } from '@/hooks/useGoBack';

import emcIntroductionImage from '../../assets/img/emcIntroduction/img_emc_introduction.png';
import FillCenterHeader from '../../designsystem/components/header/FillCenterHeader';

import * as S from './style';

export default function EmcIntroductionScreen() {
  const handleBack = useGoBack();

  return (
    <>
      <FillCenterHeader title="EMC 소개" onBack={handleBack} />

      <S.Image src={emcIntroductionImage} alt="EMC 소개" />
    </>
  );
}
