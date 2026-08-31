import instance from '@/api/core/instance';

export const getPopularBooths = async () => {
  return instance.get('/api/popular-booths');
};

export const getHomeSponsors = async () => {
  return instance.get('/api/sponsors/home');
};
