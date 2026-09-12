import { useEffect } from 'react';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { adminCodeApi } from './adminCodeApi';
import { getAdminDashboardApi, updateCongestionApi } from './adminDashboardApi';

const STREAM_URL = `${import.meta.env.VITE_API_BASE_URL}/api/stream/congestion`;

export function useAdminVerify() {
  return useMutation({
    mutationFn: adminCodeApi.adminVerify,
  });
}

export function useAdminDashboard() {
  return useSuspenseQuery({
    queryKey: ['adminDashboard'],
    queryFn: getAdminDashboardApi,
  });
}

export function useUpdateCongestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCongestionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminDashboard'] });
    },
  });
}

export function useCongestionStream() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = new EventSource(STREAM_URL);

    eventSource.onmessage = (event) => {
      try {
        const { level } = JSON.parse(event.data);
        queryClient.setQueryData(['adminDashboard'], (old) =>
          old ? { ...old, congestion: level } : old,
        );
      } catch (err) {
        console.error('Failed to parse SSE message:', err, event.data);
      }
    };

    eventSource.onerror = () => {
      if (eventSource.readyState === EventSource.CLOSED) {
        console.error('SSE connection permanently closed');
      }
    };

    return () => {
      eventSource.close();
    };
  }, [queryClient]);
}
