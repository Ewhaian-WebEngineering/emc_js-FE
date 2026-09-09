import instance from '@/api/core/instance';

export const getEvents = async () => {
  return instance.get('/api/events');
};
