import { useSuspenseQuery } from '@tanstack/react-query';
import { getBannersApi, getMyInfoApi, updateCongestionApi } from './myApi.js';
import {
  useUpdateCongestion as useUpdateCongestionBase,
  useCongestionStream,
} from '../admin/useCongestion.js';

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

export const useUpdateCongestion = () =>
  useUpdateCongestionBase(updateCongestionApi);
export { useCongestionStream };
