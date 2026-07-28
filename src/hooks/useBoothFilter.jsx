import { OPERATING_TIME_OPTIONS, SORT_OPTIONS } from '@/constants/filter';
import { useMemo, useState } from 'react';

export function useBoothFilter(source) {
  const [category, setCategory] = useState('all');
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0]);
  const [filterOption, setFilterOption] = useState(OPERATING_TIME_OPTIONS[0]);

  const booths = useMemo(() => {
    if (category === 'all') return source;
    return source.filter((booth) => booth.badges.includes(category));
  }, [source, category]);

  // TODO: sortOption과 filterOption에 따른 booths 필터링 로직 추가

  return {
    category,
    setCategory,
    sortOption,
    setSortOption,
    filterOption,
    setFilterOption,
    booths,
  };
}
