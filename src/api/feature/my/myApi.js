import instance from '../../core/instance';

export const getMyInfoApi = async () => {
  return instance.get('/api/auth/me');
};

export const getBannersApi = async () => {
  return instance.get('/api/auth/banners');
};
