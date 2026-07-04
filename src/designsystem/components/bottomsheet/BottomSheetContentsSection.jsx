import { BottomSheetContentsSection } from './style';

/**
 * 바텀시트 내부 콘텐츠 영역 컴포넌트입니다.
 * 드래그 상태와 높이 값에 따라 스타일이 결정됩니다.
 *
 * @param {boolean} isDragging - 드래그 중 여부
 * @param {number} heightPx - 바텀시트 현재 높이 (px 단위)
 * @param {React.ReactNode} children - 바텀시트 내부에 렌더링할 콘텐츠
 */
export default function BottomSheetContents({
  isDragging,
  heightPx,
  children,
}) {
  return (
    <BottomSheetContentsSection heightPx={heightPx} isDragging={isDragging}>
      {children}
    </BottomSheetContentsSection>
  );
}
