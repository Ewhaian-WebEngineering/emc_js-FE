import { useCallback, useRef, useState } from 'react';

/**
 * 바텀시트를 포인터로 드래그해서 높이를 조절하는 훅입니다.
 *
 * @param {number} currentHeightPx - 드래그 시작 시점의 바텀시트 높이(px)
 * @param {number} minHeightPx - 드래그로 줄일 수 있는 최소 높이(px)
 * @param {number} maxHeightPx - 드래그로 늘릴 수 있는 최대 높이(px)
 * @param {function} [onDrag] - 드래그 중 높이가 바뀔 때마다 호출되는 함수
 * @param {function} [onDragEnd] - 드래그가 끝났을 때 (최종 높이, 속도)와 함께 호출되는 함수
 * @returns {{ handlePointerDown: function, isDragging: boolean }} 드래그 시작 핸들러와 드래그 중 여부
 */
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
