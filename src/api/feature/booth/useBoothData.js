import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getBoothDetail, getBoothList } from './boothApi';

export const useBoothData = ({ category, sort, time, limit = 20 }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isError,
  } = useInfiniteQuery({
    queryKey: ['booth-list', category, sort, time],
    queryFn: ({ pageParam }) =>
      getBoothList({ category, sort, time, cursor: pageParam, limit }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
  });

  const boothListData = data?.pages.flatMap((page) => page.booths) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  return {
    boothListData,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isError,
  };
};

export const useBoothDetailData = (boothId) => {
  const boothDetailQuery = useSuspenseQuery({
    queryKey: ['booth-detail', boothId],
    queryFn: () => getBoothDetail(boothId),
  });

  return {
    booth: boothDetailQuery.data,
  };
};
