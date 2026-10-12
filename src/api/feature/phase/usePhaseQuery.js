import { useQuery } from '@tanstack/react-query';
import { getPhase } from './phaseApi';

export const usePhaseQuery = () => {
  return useQuery({
    queryKey: ['phase'],
    queryFn: async () => {
      const res = await getPhase();
      const forcedStart =
        import.meta.env.DEV && import.meta.env.VITE_FORCE_PHASE2_START;

      return {
        ...res,
        ...(forcedStart && { phase2Start: forcedStart }),
        fetchedAt: Date.now(),
      };
    },
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
};
