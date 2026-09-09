import { useEffect, useState } from 'react';
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

export function useStreamCongestion() {
  const [congestion, setCongestion] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource(STREAM_URL, { withCredentials: true });

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCongestion(data.congestion);
    };

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return { congestion };
}
