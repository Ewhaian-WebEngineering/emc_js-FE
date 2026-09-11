import instance from '@/api/core/instance';

export const getBoothList = ({ category, sort, time, cursor, limit = 20 }) => {
  return instance.get('/api/booths', {
    params: { category, sort, time, cursor, limit },
  });
};

export const getBoothDetail = (boothId) => {
  return instance.get(`/api/booths/${boothId}`);
};

export const getMyBoothData = async () => {
  const booth = await instance.get('/api/seller/booth');

  const latestNotice = [...(booth.notices ?? [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  )[0];

  return { ...booth, latestNotice };
};

export const updateMyBoothData = (payload) => {
  return instance.patch('/api/seller/booth', payload);
};
