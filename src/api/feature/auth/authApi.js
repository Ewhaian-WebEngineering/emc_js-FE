import instance from '@/api/core/instance';

export const kakaoLogin = (code) => {
  return instance.post('/api/auth/kakao', { code }, { skipErrorModal: true });
};

export const refreshAccessToken = (refreshToken) => {
  return instance.post('/api/auth/refresh', { refreshToken });
};

export const logout = (refreshToken) => {
  return instance.post('/api/auth/logout', { refreshToken });
};
