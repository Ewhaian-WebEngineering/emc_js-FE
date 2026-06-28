// snap point에 대응하는 화면 높이 비율(vh)
export const SNAP_VH = {
  min: 10,
  peek: 18,
  half: 50,
  expanded: 84,
  full: 100,
};

// snap point에 대응하는 실제 높이(px) 계산
export const snapToPx = (snap) => {
  return (SNAP_VH[snap] / 100) * window.innerHeight;
};

// 드래그를 멈췄을 때 가장 가까운 snap point로 이동
export const getNearestSnap = (currentPx, allowedSnaps) => {
  return allowedSnaps.reduce((nearest, snap) => {
    const nearestDiff = Math.abs(currentPx - snapToPx(nearest));
    const snapDiff = Math.abs(currentPx - snapToPx(snap));

    return snapDiff < nearestDiff ? snap : nearest;
  });
};

// 드래그 속도 반영
export const getSnapByVelocity = (currentPx, velocityPxPerMs, allowedSnaps) => {
  // 속도 임계값
  const VELOCITY_THRESHOLD = 0.5;

  // 속도가 임계값보다 낮으면 위치 기준 snap point 계산
  if (Math.abs(velocityPxPerMs) < VELOCITY_THRESHOLD) {
    return getNearestSnap(currentPx, allowedSnaps);
  }

  // snap 오름차순 정렬
  const sortedSnaps = [...allowedSnaps].sort((a, b) => SNAP_VH[a] - SNAP_VH[b]);

  // 위로 빠르게 드래그
  if (velocityPxPerMs < -VELOCITY_THRESHOLD) {
    // 현재 위치보다 위에 있는 snap point 중 가장 가까운 snap point 반환
    const above = sortedSnaps.filter((snap) => snapToPx(snap) > currentPx);
    return above[0] ?? sortedSnaps[sortedSnaps.length - 1];
  }

  // 아래로 빠르게 드래그
  const below = sortedSnaps.filter((snap) => snapToPx(snap) < currentPx);
  return below[below.length - 1] ?? sortedSnaps[0];
};
