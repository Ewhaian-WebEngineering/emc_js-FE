import { useSearchBooths } from '@/api/feature/search/useSearchData';
import { useState } from 'react';

export function useBoothFilter(q, initialCategory = 'all') {
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState('number');
  const [time, setTime] = useState('all');

  const {
    data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchBooths({ q, category, sort, time });

  const booths = data?.pages.flatMap((page) => page.booths) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  return {
    category,
    setCategory,
    sort,
    setSort,
    time,
    setTime,
    booths,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isError,
  };
}
