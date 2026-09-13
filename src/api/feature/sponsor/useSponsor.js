import { useSuspenseQuery } from '@tanstack/react-query';
import { getSponsorDetail, getSponsorList } from './sponsorApi';

export const useSponsorList = () => {
  return useSuspenseQuery({
    queryKey: ['sponsors'],
    queryFn: getSponsorList,
  });
};

export const useSponsorDetail = (sponsorId) => {
  return useSuspenseQuery({
    queryKey: ['sponsor', sponsorId],
    queryFn: () => getSponsorDetail(sponsorId),
  });
};
