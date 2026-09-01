import { useInfiniteQuery } from '@tanstack/react-query';
import { searchBooths } from './searchApi';

export const useSearchBooths = ({ q, category, sort, time }) => {
  return useInfiniteQuery({
    queryKey: ['booth-search', q, category, sort, time],
    queryFn: ({ pageParam }) =>
      searchBooths({ q, category, sort, time, cursor: pageParam, limit: 5 }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    enabled: !!q,
  });
};
