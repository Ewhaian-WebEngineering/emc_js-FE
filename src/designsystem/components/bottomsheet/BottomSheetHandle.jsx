import { BottomSheetDragHandle, BottomSheetDragHandleWrapper } from './style';

/**
 * 바텀시트 상단 드래그 핸들 컴포넌트입니다.
 *
 * @param {function} onPointerDown - 핸들을 눌렀을 때 호출되는 이벤트 핸들러
 */
export default function BottomSheetHandle({ onPointerDown }) {
  return (
    <BottomSheetDragHandleWrapper>
      <BottomSheetDragHandle onPointerDown={onPointerDown} />
    </BottomSheetDragHandleWrapper>
  );
}
