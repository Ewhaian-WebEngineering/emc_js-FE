import { useState, useEffect } from 'react';
import { getRecentSearchKey } from '../utils/recentSearchKey';

const MAX_COUNT = 3;

export function useRecentSearches(userId) {
  const key = getRecentSearchKey(userId);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(recentSearches));
  }, [key, recentSearches]);

  const addSearch = (term) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((t) => t !== term);
      return [term, ...filtered].slice(0, MAX_COUNT);
    });
  };

  const removeSearch = (index) => {
    setRecentSearches((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => setRecentSearches([]);

  return { recentSearches, addSearch, removeSearch, clearAll };
}
