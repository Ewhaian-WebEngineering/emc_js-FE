import { useSuspenseQuery } from '@tanstack/react-query';
import { getHomeEvents, getHomeSponsors, getPopularBooths } from './homeApi';

export const usePopularBooths = () => {
  return useSuspenseQuery({
    queryKey: ['popular-booths'],
    queryFn: getPopularBooths,
  });
};

export const useHomeSponsors = () => {
  return useSuspenseQuery({
    queryKey: ['home-sponsors'],
    queryFn: getHomeSponsors,
  });
};

export const useHomeEvents = () => {
  return useSuspenseQuery({
    queryKey: ['home-events'],
    queryFn: getHomeEvents,
  });
};
