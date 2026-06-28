import { useCallback, useRef, useState } from 'react';

export const useBottomSheetDrag = ({
  currentHeightPx,
  minHeightPx,
  maxHeightPx,
  onDrag,
  onDragEnd,
}) => {
  const dragRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = useCallback(
    (e) => {
      e.preventDefault();
      e.target.setPointerCapture(e.pointerId);
      setIsDragging(true);

      dragRef.current = {
        startY: e.clientY,
        startHeightPx: currentHeightPx,
        lastY: e.clientY,
        lastTime: performance.now(),
        velocityPxPerMs: 0,
      };

      const handlePointerMove = (moveEvent) => {
        if (!dragRef.current) return;

        const now = performance.now();
        const deltaY = dragRef.current.startY - moveEvent.clientY;
        const newHeightPx = Math.min(
          maxHeightPx,
          Math.max(minHeightPx * 0.5, dragRef.current.startHeightPx + deltaY),
        );

        const timeDelta = now - dragRef.current.lastTime;
        if (timeDelta > 0) {
          dragRef.current.velocityPxPerMs =
            ((dragRef.current.lastY - moveEvent.clientY) / timeDelta) * -1;
        }

        dragRef.current.lastY = moveEvent.clientY;
        dragRef.current.lastTime = now;

        onDrag?.(newHeightPx);
      };

      const handlePointerUp = (upEvent) => {
        setIsDragging(false);
        if (!dragRef.current) return;

        const deltaY = dragRef.current.startY - upEvent.clientY;
        const finalHeight = Math.min(
          maxHeightPx,
          Math.max(minHeightPx * 0.5, dragRef.current.startHeightPx + deltaY),
        );

        onDragEnd?.(finalHeight, dragRef.current.velocityPxPerMs);

        dragRef.current = null;
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    },
    [currentHeightPx, minHeightPx, maxHeightPx, onDrag, onDragEnd],
  );

  return { handlePointerDown, isDragging };
};
