import { useCallback, useRef } from 'react';

export default function useHorizontalPager({
  pagerRef,
  items,
  activeItem,
  onActiveChange,
  debounceMs = 100,
}) {
  const debounceTimer = useRef(null);

  const scrollToIndex = useCallback(
    (idx) => {
      const el = pagerRef.current;
      if (!el) return;
      el.classList.add('smooth');
      el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' });
    },
    [pagerRef],
  );

  const onScroll = useCallback(
    (e) => {
      const el = e.target;
      el.classList.remove('smooth');

      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        const idx = Math.round(el.scrollLeft / el.clientWidth);
        const next = items[idx];
        if (next && next !== activeItem) {
          onActiveChange(next);
        }
      }, debounceMs);
    },
    [items, activeItem, onActiveChange, debounceMs],
  );

  return { onScroll, scrollToIndex };
}
