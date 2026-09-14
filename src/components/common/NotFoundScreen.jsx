import Logo from '@/assets/svg/logo/ic_logo_main.svg?react';
import { CommonLogoBg, CommonScreenContainer, ErrorTitle } from './style';

export default function NotFoundScreen({ text }) {
  return (
    <CommonScreenContainer>
      <CommonLogoBg>
        <Logo />
      </CommonLogoBg>
      <ErrorTitle>{text}</ErrorTitle>
    </CommonScreenContainer>
  );
}
