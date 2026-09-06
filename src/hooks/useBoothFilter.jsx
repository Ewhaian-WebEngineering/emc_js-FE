import { useState } from 'react';

export function useBoothFilter(initialCategory = 'all') {
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState('number');
  const [time, setTime] = useState('all');

  return {
    category,
    setCategory,
    sort,
    setSort,
    time,
    setTime,
  };
}
