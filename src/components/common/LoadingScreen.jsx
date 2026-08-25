import Logo from '@/assets/svg/logo/ic_logo_main.svg?react';
import { CommonLogoBg, CommonScreenContainer } from './style';
import Spinner from '@/designsystem/components/spinner/Spinner';

export default function LoadingScreen() {
  return (
    <CommonScreenContainer>
      <CommonLogoBg>
        <Logo />
      </CommonLogoBg>
      <Spinner />
    </CommonScreenContainer>
  );
}
