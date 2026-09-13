import instance from '@/api/core/instance';

export const getMapBoothList = () => {
  return instance.get('/api/booths/map-list');
};
