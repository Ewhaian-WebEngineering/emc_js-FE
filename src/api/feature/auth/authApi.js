import instance from '@/api/core/instance';

export const kakaoLogin = (code, redirectUri) => {
  return instance.post(
    '/api/auth/kakao',
    { code, redirectUri },
    { skipErrorModal: true },
  );
};

export const refreshAccessToken = (refreshToken) => {
  return instance.post('/api/auth/refresh', { refreshToken });
};

export const logout = (refreshToken) => {
  return instance.post('/api/auth/logout', { refreshToken });
};

export const deleteAccount = () => {
  return instance.delete('/api/auth/me');
};
