import instance from '@/api/core/instance';

export const getPopularBooths = async () => {
  return instance.get('/api/popular-booths');
};
