import instance from '@/api/core/instance';

export const searchBooths = ({
  q,
  category,
  sort,
  time,
  cursor,
  limit = 20,
}) => {
  return instance.get('/api/search', {
    params: { q, category, sort, time, cursor, limit },
  });
};
