import { useSuspenseQueries } from '@tanstack/react-query';
import {
  getHomeEvents,
  getHomeFaqs,
  getHomeSponsors,
  getPopularBooths,
} from './homeApi';

export const useHomeData = () => {
  const [boothsResult, sponsorsResult, eventsResult, faqsResult] =
    useSuspenseQueries({
      queries: [
        { queryKey: ['popular-booths'], queryFn: getPopularBooths },
        { queryKey: ['home-sponsors'], queryFn: getHomeSponsors },
        { queryKey: ['home-events'], queryFn: getHomeEvents },
        { queryKey: ['home-faqs'], queryFn: getHomeFaqs },
      ],
    });

  return {
    popularBoothData: boothsResult.data,
    sponsorData: sponsorsResult.data,
    eventData: eventsResult.data,
    faqData: faqsResult.data,
  };
};
