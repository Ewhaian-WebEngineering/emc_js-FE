import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import {
  createBannerApi,
  updateBannerApi,
  getBannerApi,
} from './bannerManageApi.js';

const BANNER_QUERY_KEY = ['banners'];

export const useCreateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBannerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BANNER_QUERY_KEY });
    },
  });
};

export const useBanner = (bid) => {
  return useSuspenseQuery({
    queryKey: [...BANNER_QUERY_KEY, bid],
    queryFn: () => getBannerApi({ bid }),
  });
};

export const useUpdateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBannerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BANNER_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['adminDashboard'] });
    },
  });
};
