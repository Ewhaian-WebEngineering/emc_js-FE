import instance from '@/api/core/instance';

export const toggleBoothScrap = (boothId) => {
  return instance.post(`/api/booths/${boothId}/scrap`);
};

export const getScrapList = ({ category, sort, time, cursor, limit = 20 }) => {
  return instance.get('/api/scraps', {
    params: { category, sort, time, cursor, limit },
  });
};
