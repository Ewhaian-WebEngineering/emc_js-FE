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
  };

  return useMutation({
    mutationFn: () => toggleBoothScrap(bid),
    onSuccess: (data) => patchBoothCache(data.isScrapped),
  });
};

export const useScrapList = ({ category, sort, limit = 20 }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isError,
  } = useInfiniteQuery({
    queryKey: ['scrap-list', category, sort],
    queryFn: ({ pageParam }) =>
      getScrapList({ category, sort, cursor: pageParam, limit }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
  });

  const scrapListData = data?.pages.flatMap((page) => page.booths) ?? [];
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
