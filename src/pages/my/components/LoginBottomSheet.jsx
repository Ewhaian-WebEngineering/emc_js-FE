import KakaoIcon from '@/assets/svg/20px/ic_kakao.svg?react';
import BottomSheet from '@/designsystem/components/bottomsheet/BottomSheet';
import {
  LoginBottomSheetContent,
  KakaoLoginButton,
  KakaoLoginButtonWrapper,
} from './style.js';

/**
 * 카카오 로그인 안내 바텀시트
 *
 * @param {boolean} isOpen - 바텀시트 열림 여부
 * @param {function} onClose - 바텀시트 닫기 이벤트 핸들러
 * @param {function} onKakaoLogin - 카카오 로그인 버튼 클릭 시 호출되는 함수
 */
export default function LoginBottomSheet({ isOpen, onClose, onKakaoLogin }) {
  return (
    <BottomSheet variant="header" isOpen={isOpen} onClose={onClose}>
      <LoginBottomSheetContent>
        <h2>로그인하고 계속 이용해보세요!</h2>
        <p>
          웹사이트를 더 편하게 즐기려면
          <br />
          로그인을 해주세요.
        </p>
      </LoginBottomSheetContent>

      <KakaoLoginButtonWrapper>
        <KakaoLoginButton onClick={onKakaoLogin}>
          <KakaoIcon />
          카카오로 로그인하기
        </KakaoLoginButton>
      </KakaoLoginButtonWrapper>
    </BottomSheet>
  );
}
