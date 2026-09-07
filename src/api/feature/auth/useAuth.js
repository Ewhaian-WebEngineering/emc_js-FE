import { useNavigate } from 'react-router-dom';
import { kakaoLogin, logout } from './authApi';
import { useMutation } from '@tanstack/react-query';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  getUserNickname,
  setTokens,
} from '@/api/core/tokenStorage';

export const useKakaoLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (code) => kakaoLogin(code),
    onSuccess: ({ accessToken, refreshToken, user }) => {
      setTokens({
        accessToken,
        refreshToken,
        userRole: user.role,
        userId: user.id,
        nickname: user.nickname,
      });
      navigate('/my');
    },
  });
};

export function getKakaoAuthorizeUrl() {
  const param = new URLSearchParams({
    client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
    redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
    response_type: 'code',
  });

  return `https://kauth.kakao.com/oauth/authorize?${param.toString()}`;
}

export const useAuth = () => {
  const accessToken = getAccessToken();
  const nickname = getUserNickname();

  return {
    isLoggedIn: !!accessToken,
    nickname,
  };
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => logout(getRefreshToken()),
    onSettled: () => {
      clearTokens();
    },
  });
};
