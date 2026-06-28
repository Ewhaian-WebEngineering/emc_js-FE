import { BottomSheetDragHandle, BottomSheetDragHandleWrapper } from './style';

export default function BottomSheetHandle({ onPointerDown }) {
  return (
    <BottomSheetDragHandleWrapper>
      <BottomSheetDragHandle onPointerDown={onPointerDown} />
    </BottomSheetDragHandleWrapper>
  );
}
