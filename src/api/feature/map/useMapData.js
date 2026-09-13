import { useQuery } from '@tanstack/react-query';
import { getMapBoothList } from './mapApi';

export const useMapData = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['map-list'],
    queryFn: getMapBoothList,
  });

  return {
    generalBooths: data?.booths ?? [],
    sponsorBooths: data?.sponsors ?? [],
    isLoading,
    error,
    isError,
  };
};
