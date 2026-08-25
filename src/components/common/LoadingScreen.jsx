import Logo from '@/assets/svg/logo/ic_logo_main.svg?react';
import { LoadingLogo, LoadingScreenContainer } from './style';
import Spinner from '@/designsystem/components/spinner/Spinner';

export default function LoadingScreen() {
  return (
    <LoadingScreenContainer>
      <LoadingLogo src={Logo} />
      <Spinner />
    </LoadingScreenContainer>
  );
}
