import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import {
  createEventApi,
  updateEventApi,
  getEventApi,
} from './eventManageApi.js';

const EVENT_QUERY_KEY = ['events'];

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEventApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENT_QUERY_KEY });
    },
  });
};

export const useEvent = (eid) => {
  return useSuspenseQuery({
    queryKey: [...EVENT_QUERY_KEY, eid],
    queryFn: () => getEventApi({ eid }),
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEventApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENT_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['adminDashboard'] });
    },
  });
};
