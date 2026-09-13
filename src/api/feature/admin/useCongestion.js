import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const STREAM_URL = `${import.meta.env.VITE_API_BASE_URL}/api/stream/congestion`;

const CONGESTION_LINKED_KEYS = [['myInfo'], ['adminDashboard']];

function setCongestionOnAllKeys(queryClient, level) {
  CONGESTION_LINKED_KEYS.forEach((key) => {
    queryClient.setQueryData(key, (old) =>
      old ? { ...old, congestion: level } : old,
    );
  });
}

export function useCongestionStream() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = new EventSource(STREAM_URL);

    eventSource.onmessage = (event) => {
      try {
        const { level } = JSON.parse(event.data);
        setCongestionOnAllKeys(queryClient, level);
      } catch (err) {
        console.error('Failed to parse SSE message:', err, event.data);
      }
    };

    eventSource.onerror = () => {
      if (eventSource.readyState === EventSource.CLOSED) {
        console.error('SSE connection permanently closed');
      }
    };

    return () => eventSource.close();
  }, [queryClient]);
}

export function useUpdateCongestion(updateCongestionApi) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCongestionApi,
    onSuccess: () => {
      CONGESTION_LINKED_KEYS.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
  });
}
