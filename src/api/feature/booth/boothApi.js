import instance from '@/api/core/instance';

export const getBoothList = ({ category, sort, time, cursor, limit = 20 }) => {
  return instance.get('/api/booths', {
    params: { category, sort, time, cursor, limit },
  });
};

export const getBoothDetail = (boothId) => {
  return instance.get(`/api/booths/${boothId}`);
};
