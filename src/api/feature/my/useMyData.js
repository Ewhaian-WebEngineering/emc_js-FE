import { useSuspenseQuery } from '@tanstack/react-query';
import { getBannersApi, getMyInfoApi } from './myApi.js';

export const useGetMyInfo = () => {
  return useSuspenseQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfoApi,
  });
};

export const useGetBanners = () => {
  return useSuspenseQuery({
    queryKey: ['banners'],
    queryFn: getBannersApi,
  });
};
