import { usePhaseQuery } from '@/api/feature/phase/usePhaseQuery';
import { useEffect, useState } from 'react';

export const usePhase = () => {
  const { data, isLoading } = usePhaseQuery();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  if (!data) return { isLocked: false, isLoading };

  const offset = new Date(data.serverTime).getTime() - data.fetchedAt;
  const isLocked =
    data.currentPhase === 2 ||
    now + offset >= new Date(data.phase2Start).getTime();

  return { isLocked, isLoading };
};
