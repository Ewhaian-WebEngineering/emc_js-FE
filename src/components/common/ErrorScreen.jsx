import BoxButton from '@/designsystem/components/button/boxbutton/BoxButton';
import {
  CommonLogoBg,
  CommonScreenContainer,
  ErrorButtonWrapper,
  ErrorTitle,
} from './style';
import Logo from '@/assets/svg/logo/ic_logo_main.svg?react';

export default function ErrorScreen({ onRetry }) {
  return (
    <CommonScreenContainer>
      <CommonLogoBg>
        <Logo />
      </CommonLogoBg>
      <ErrorTitle>
        일시적인 오류입니다
        <br />
        잠시 후 다시 시도해주세요
      </ErrorTitle>
      <ErrorButtonWrapper>
        <BoxButton size="lg" onClick={onRetry}>
          다시 시도
        </BoxButton>
      </ErrorButtonWrapper>
    </CommonScreenContainer>
  );
}
