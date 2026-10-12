import instance from '@/api/core/instance';

export const getPhase = () => {
  return instance.get('/api/config/phase');
};
