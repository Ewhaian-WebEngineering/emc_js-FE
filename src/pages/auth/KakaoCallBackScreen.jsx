import { modalStore } from '@/api/core/store/modalStore';
import { useKakaoLogin } from '@/api/feature/auth/useAuth';
import LoadingScreen from '@/components/common/LoadingScreen';
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function KakaoCallBackScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mutate: loginWithKakao } = useKakaoLogin();
  const hasRequested = useRef(false);

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      navigate('/', { replace: true });
      return;
    }

    if (hasRequested.current) return;
    hasRequested.current = true;

    loginWithKakao(code, {
      onError: () => {
        modalStore.show({
          variant: 'alert',
          title: '로그인에 실패했습니다.',
          description: '잠시 후 다시 시도해주세요.',
          cancelText: '확인',
          onCancel: () => navigate('/my', { replace: true }),
        });
      },
    });
  }, [searchParams, navigate, loginWithKakao]);

  return <LoadingScreen />;
}
