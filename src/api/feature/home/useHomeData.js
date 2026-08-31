import { useSuspenseQueries } from '@tanstack/react-query';
import { getHomeEvents, getHomeSponsors, getPopularBooths } from './homeApi';

export const useHomeData = () => {
  const [boothsResult, sponsorsResult, eventsResult] = useSuspenseQueries({
    queries: [
      { queryKey: ['popular-booths'], queryFn: getPopularBooths },
      { queryKey: ['home-sponsors'], queryFn: getHomeSponsors },
      { queryKey: ['home-events'], queryFn: getHomeEvents },
    ],
  });

  return {
    popularBoothData: boothsResult.data,
    sponsorData: sponsorsResult.data,
    eventData: eventsResult.data,
  };
};
