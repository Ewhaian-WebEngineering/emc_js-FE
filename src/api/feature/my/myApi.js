import instance from '../../core/instance';

export const getMyInfoApi = async () => {
  return instance.get('/api/auth/me');
};

export const getBannersApi = async () => {
  return instance.get('/api/auth/banners');
};

export const updateCongestionApi = async ({ level }) => {
  return instance.patch('/api/admin/congestion', { level });
};
