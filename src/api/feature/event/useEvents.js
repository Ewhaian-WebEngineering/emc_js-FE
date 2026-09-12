import { useSuspenseQuery } from '@tanstack/react-query';
import { getEventDetail, getEvents } from './eventApi';

export const useEvents = () => {
  return useSuspenseQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });
};

/**
 * @param {string} eid
 * @returns {import('@tanstack/react-query').UseSuspenseQueryResult<import('./eventApi').EventDetail>}
 */
export const useEventDetail = (eid) => {
  return useSuspenseQuery({
    queryKey: ['event-detail', eid],
    queryFn: () => getEventDetail(eid),
  });
};
