import { snapToPx } from '../../../constants/bottomSheet';
import { useBottomSheetDrag } from '../../../hooks/bottomsheet/useBottomSheetDrag';
import { useSnapPoint } from '../../../hooks/bottomsheet/useSnapPoint';
import { usePreventScroll } from '../../../hooks/usePreventScroll';
import Scrim from '../scrim/Scrim';
import BottomSheetContentsSection from './BottomSheetContentsSection';
import BottomSheetHandle from './BottomSheetHandle';
import BottomSheetHeader from './BottomSheetHeader';
import { BottomSheetContainer } from './style';

const DEFAULT_SNAPS = {
  normal: [],
  handle: ['min', 'peek', 'half', 'expanded'],
  handleWithHeader: ['min', 'peek', 'half', 'full'],
  header: [],
};

export default function BottomSheet({
  variant = 'normal',
  isOpen,
  onClose,
  onFull,
  showScrim = true,
  title,
  snapPoints,
  defaultSnap = 'half',
  children,
}) {
  const allowedSnaps = snapPoints ?? DEFAULT_SNAPS[variant];

  const { heightPx, onDrag, resolveAfterDrag } = useSnapPoint({
    allowedSnaps,
    defaultSnap,
    onClose,
    onFull,
  });

  const { handlePointerDown, isDragging } = useBottomSheetDrag({
    currentHeightPx: heightPx,
    minHeightPx: snapToPx(allowedSnaps[0] ?? 'min'),
    maxHeightPx:
      variant === 'handleWithHeader'
        ? snapToPx('full')
        : snapToPx(allowedSnaps[allowedSnaps.length - 1] ?? 'expanded'),
    onDrag,
    onDragEnd: resolveAfterDrag,
  });

  usePreventScroll(isOpen);

  if (!isOpen) return null;

  return (
    <>
      {showScrim && <Scrim onClick={onClose} />}
      <BottomSheetContainer
        variant={variant}
        heightPx={heightPx}
        isDragging={isDragging}
      >
        <BottomSheetContentsSection heightPx={heightPx} isDragging={isDragging}>
          {(variant === 'handle' || variant === 'handleWithHeader') && (
            <BottomSheetHandle onPointerDown={handlePointerDown} />
          )}
          {(variant === 'handleWithHeader' || variant === 'header') && (
            <BottomSheetHeader
              variant={variant}
              title={title}
              onClose={onClose}
            />
          )}
          {children}
        </BottomSheetContentsSection>
      </BottomSheetContainer>
    </>
  );
}
