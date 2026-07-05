import { snapToPx } from '@/constants/bottomSheet';
import { useBottomSheetDrag } from '@/hooks/bottomsheet/useBottomSheetDrag';
import { useSnapPoint } from '@/hooks/bottomsheet/useSnapPoint';
import { usePreventScroll } from '@/hooks/usePreventScroll';
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

/**
 * 바텀시트 컴포넌트입니다.
 * variant에 따라 핸들과 헤더 유무가 결정되며, 드래그를 통한 스냅 포인트 이동을 지원합니다.
 *
 * @param {'normal'|'handle'|'handleWithHeader'|'header'} [variant='normal'] - 바텀시트 변형 타입
 * @param {boolean} isOpen - 바텀시트 열림 여부
 * @param {function} onClose - 바텀시트 닫기 이벤트 핸들러
 * @param {function} [onFull] - 바텀시트가 full 스냅 포인트에 도달했을 때 호출되는 이벤트 핸들러
 * @param {boolean} [showScrim=true] - 스크림 표시 여부
 * @param {string} [title] - 바텀시트 헤더에 표시될 제목
 * @param {Array<string>} [snapPoints] - 바텀시트 스냅 포인트 목록, 미지정 시 variant별 기본 스냅 포인트 사용
 * @param {string} [defaultSnap='half'] - 바텀시트 초기 스냅 포인트
 * @param {React.ReactNode} children - 바텀시트 내부에 렌더링할 콘텐츠
 */

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
