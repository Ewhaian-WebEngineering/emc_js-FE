import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import {
  createNotice,
  deleteNotice,
  getBoothDetail,
  getBoothList,
  getMyBoothData,
  getNotices,
  updateMyBoothData,
  updateNotice,
} from './boothApi';

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

export const useMyBoothData = () => {
  return useQuery({
    queryKey: ['my-booth'],
    queryFn: () => getMyBoothData(),
  });
};

export const useUpdateMyBoothData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyBoothData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-booth'] });
    },
  });
};

export const useNoticeList = (bid) => {
  return useSuspenseQuery({
    queryKey: ['notices', bid],
    queryFn: () => getNotices(bid),
  });
};

export const useCreateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNotice,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notices'],
        refetchType: 'all',
      });
    },
  });
};

export const useUpdateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotice,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notices'],
        refetchType: 'all',
      });
    },
  });
};

export const useDeleteNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotice,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notices'],
        refetchType: 'all',
      });
    },
  });
};
