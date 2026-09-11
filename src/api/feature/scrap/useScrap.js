import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { getScrapList, toggleBoothScrap } from './scrapApi';

export const useBoothScrap = (bid) => {
  const queryClient = useQueryClient();

  const patchBoothCache = (isScrapped) => {
    queryClient.setQueryData(['booth-detail', bid], (old) =>
      old ? { ...old, isScrapped } : old,
    );

    queryClient.setQueriesData({ queryKey: ['booth-list'] }, (old) => {
      if (!old) return old;
      return {
        ...old,
        pages: old.pages.map((page) => ({
          ...page,
          booths: page.booths.map((b) =>
            b.id === bid ? { ...b, isScrapped } : b,
          ),
        })),
      };
    });

    if (isScrapped) {
      queryClient.invalidateQueries({ queryKey: ['scrap-list'] });
    } else {
      queryClient.setQueriesData({ queryKey: ['scrap-list'] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            totalCount: page.totalCount - 1,
            booths: page.booths.filter((b) => b.boothId !== bid),
          })),
        };
      });
    }
  };

  return useMutation({
    mutationFn: () => toggleBoothScrap(bid),
    onSuccess: (data) => patchBoothCache(data.isScrapped),
  });
};

export const useScrapList = ({ category, sort, time, limit = 20 }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isError,
  } = useInfiniteQuery({
    queryKey: ['scrap-list', category, sort, time],
    queryFn: ({ pageParam }) =>
      getScrapList({ category, sort, time, cursor: pageParam, limit }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
  });

  const scrapListData =
    data?.pages.flatMap((page) =>
      page.booths.map((b) => ({ ...b, id: b.boothId })),
    ) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;
  const categoryCounts = data?.pages[0]?.categoryCounts ?? {};

  return {
    scrapListData,
    totalCount,
    categoryCounts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isError,
  };
};
