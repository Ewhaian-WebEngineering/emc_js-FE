import instance from '@/api/core/instance';

export const getSponsorList = () => instance.get('/api/sponsors');
