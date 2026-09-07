import instance from '@/api/core/instance';

export const kakaoLogin = (code) => {
  return instance.post('/api/auth/kakao', { code });
};

export const refreshAccessToken = (refreshToken) => {
  return instance.post('/api/auth/refresh', { refreshToken });
};
