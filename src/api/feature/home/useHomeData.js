import { useSuspenseQuery } from '@tanstack/react-query';
import { getPopularBooths } from './homeApi';

export const usePopularBooths = () => {
  return useSuspenseQuery({
    queryKey: ['popular-booths'],
    queryFn: getPopularBooths,
  });
};
