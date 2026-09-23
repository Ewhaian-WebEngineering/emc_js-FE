import { useState, useCallback } from 'react';

export function useToggleMap(initialKeys = []) {
  const [state, setState] = useState(() =>
    Object.fromEntries(initialKeys.map((key) => [key, false])),
  );

  const toggle = useCallback((key) => {
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const open = useCallback((key) => {
    setState((prev) => ({ ...prev, [key]: true }));
  }, []);

  return [state, toggle, open];
}
