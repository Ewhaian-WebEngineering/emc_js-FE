import { useNavigate } from 'react-router-dom';

import emcIntroductionImage from '../../assets/img/emcIntroduction/img_emc_introduction.png';
import FillCenterHeader from '../../designsystem/components/header/FillCenterHeader';

import * as S from './style';

export default function EmcIntroductionScreen() {
  const navigate = useNavigate();

  return (
    <S.Page>
      <FillCenterHeader title="EMC 소개" onBack={() => navigate(-1)} />

      <S.Image src={emcIntroductionImage} alt="EMC 소개" />
    </S.Page>
  );
}
