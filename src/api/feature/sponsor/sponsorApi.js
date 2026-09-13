import instance from '@/api/core/instance';

export const getSponsorList = () => instance.get('/api/sponsors');

export const getSponsorDetail = (sponsorId) =>
  instance.get(`/api/sponsors/${sponsorId}`);
