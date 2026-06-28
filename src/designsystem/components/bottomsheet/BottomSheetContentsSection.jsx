import { BottomSheetContentsSection } from './style';

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
