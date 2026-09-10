import { useSuspenseQuery } from '@tanstack/react-query';
import { getSponsorList } from './sponsorApi';

export const useSponsorList = () => {
  return useSuspenseQuery({
    queryKey: ['sponsors'],
    queryFn: getSponsorList,
  });
};
