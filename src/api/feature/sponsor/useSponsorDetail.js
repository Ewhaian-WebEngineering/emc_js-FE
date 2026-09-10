import { useSuspenseQuery } from '@tanstack/react-query';
import { getSponsorDetail } from './sponsorApi';

export const useSponsorDetail = (sponsorId) => {
  return useSuspenseQuery({
    queryKey: ['sponsor', sponsorId],
    queryFn: () => getSponsorDetail(sponsorId),
  });
};
