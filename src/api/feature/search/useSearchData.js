import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';
import { searchBooths, searchPopularBooths } from './searchApi';

export const useSearchBooths = ({ q, category, sort, time }) => {
  return useInfiniteQuery({
    queryKey: ['booth-search', q, category, sort, time],
    queryFn: ({ pageParam }) =>
      searchBooths({ q, category, sort, time, cursor: pageParam, limit: 10 }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    enabled: !!q,
  });
};

export const useSearchData = () => {
  const popularBoothsQuery = useSuspenseQuery({
    queryKey: ['popular-booth-search'],
    queryFn: searchPopularBooths,
  });

  return {
    popularBooths: popularBoothsQuery.data,
  };
};
