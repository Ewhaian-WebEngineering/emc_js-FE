import { getSnapByVelocity, snapToPx } from '../../constants/bottomSheet';
import { useCallback, useState } from 'react';

export const useSnapPoint = ({
  allowedSnaps,
  defaultSnap,
  onClose,
  onFull,
}) => {
  const [currentSnap, setCurrentSnap] = useState(defaultSnap);
  const [heightPx, setHeightPx] = useState(snapToPx(defaultSnap));

  const moveTo = useCallback((snap) => {
    setCurrentSnap(snap);
    setHeightPx(snapToPx(snap));
  }, []);

  const onDrag = useCallback((newHeightPx) => {
    setHeightPx(newHeightPx);
  }, []);

  // 드래그 종료 후 snap point 결정
  const resolveAfterDrag = useCallback(
    (currentPx, velocityPxPerMs) => {
      const minSnapPx = snapToPx(allowedSnaps[0]);
      const isDraggingDown = velocityPxPerMs > 0.5;
      const isBelowMin = currentPx < minSnapPx * 0.6;

      if (isDraggingDown && isBelowMin) {
        onClose?.();
        return;
      }

      const next = getSnapByVelocity(currentPx, velocityPxPerMs, allowedSnaps);

      if (next === 'full') {
        onFull?.();
        return;
      }

      setCurrentSnap(next);
      setHeightPx(snapToPx(next));
    },
    [allowedSnaps, onClose, onFull],
  );

  return {
    currentSnap,
    heightPx,
    moveTo,
    onDrag,
    resolveAfterDrag,
  };
};
