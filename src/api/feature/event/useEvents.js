import { useSuspenseQuery } from '@tanstack/react-query';
import { getEvents } from './eventApi';

export const useEvents = () => {
  return useSuspenseQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });
};
