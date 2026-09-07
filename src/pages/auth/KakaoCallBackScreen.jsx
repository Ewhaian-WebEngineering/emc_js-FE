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
        navigate('/', { replace: true });
      },
    });
  }, [searchParams, navigate, loginWithKakao]);

  return <LoadingScreen />;
}
