import { getSnapByVelocity, snapToPx } from '../../constants/bottomSheet';
import { useCallback, useEffect, useState } from 'react';

/**
 * 바텀시트의 snap point(높이 단계)를 관리하는 훅입니다.
 *
 * @param {Array} allowedSnaps - 허용되는 snap point 목록
 * @param {*} defaultSnap - 초기 snap point
 * @param {function} [onClose] - 최소 snap point 아래로 빠르게 드래그했을 때 호출되는 함수
 * @param {function} [onFull] - 최대 snap point를 넘어 'full'로 판정됐을 때 호출되는 함수
 * @returns {{
 *   currentSnap: *,
 *   heightPx: number,
 *   moveTo: function,
 *   onDrag: function,
 *   resolveAfterDrag: function,
 * }} 현재 snap 상태와 이를 제어하는 함수들
 */
export const useSnapPoint = ({
  allowedSnaps,
  defaultSnap,
  snap,
  onClose,
  onFull,
}) => {
  const [currentSnap, setCurrentSnap] = useState(defaultSnap);
  const [heightPx, setHeightPx] = useState(snapToPx(defaultSnap));

  const moveTo = useCallback((snap) => {
    setCurrentSnap(snap);
    setHeightPx(snapToPx(snap));
  }, []);

  useEffect(() => {
    if (snap === null) return;
    moveTo(snap);
  }, [snap, moveTo]);

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
        if (onClose) {
          onClose();
        } else {
          setCurrentSnap(allowedSnaps[0]);
          setHeightPx(minSnapPx);
        }
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
