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
import { getProductGroups } from '../product/productApi';

export const useBoothData = ({ category, sort, time, limit = 20 }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isPending,
    isPaused,
    refetch,
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
    isPending,
    isPaused,
    refetch,
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

export const useMyBoothData = (boothId) => {
  return useQuery({
    queryKey: ['my-booth', boothId],
    queryFn: () => getMyBoothData(boothId),
  });
};

export const useUpdateMyBoothData = (boothId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => updateMyBoothData(payload, boothId),
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

export const useCreateNotice = (boothId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createNotice(payload, boothId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notices'],
        refetchType: 'all',
      });
    },
  });
};

export const useUpdateNotice = (boothId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => updateNotice(payload, boothId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notices'],
        refetchType: 'all',
      });
    },
  });
};

export const useDeleteNotice = (boothId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nid) => deleteNotice(nid, boothId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notices'],
        refetchType: 'all',
      });
    },
  });
};

export const useProductGroupList = (boothId) => {
  return useQuery({
    queryKey: ['product-groups', boothId],
    queryFn: () => getProductGroups(boothId),
    enabled: !!boothId,
  });
};
