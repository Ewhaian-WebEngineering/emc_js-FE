import CloseIcon from '@/assets/svg/20px/ic_close.svg?react';
import {
  BottomSheetHeaderCloseButton,
  BottomSheetHeaderTitle,
  BottomSheetHeaderWrapper,
} from './style';

/**
 * 바텀시트 헤더 컴포넌트입니다.
 * variant == 'handleWithHeader' 또는 'header'일 때만 닫기 버튼이 표시됩니다.
 *
 * @param {'normal'|'handle'|'handleWithHeader'|'header'} variant - 바텀시트 변형 타입
 * @param {string} [title] - 바텀시트 헤더에 표시될 제목
 * @param {function} onClose - 바텀시트 닫기 이벤트 핸들러
 * @returns
 */
export default function SheetHeader({ variant, title, onClose }) {
  return (
    <BottomSheetHeaderWrapper>
      {title && (
        <BottomSheetHeaderTitle variant={variant}>
          {title}
        </BottomSheetHeaderTitle>
      )}
      {(variant === 'handleWithHeader' || variant === 'header') && (
        <BottomSheetHeaderCloseButton onClick={onClose}>
          <CloseIcon />
        </BottomSheetHeaderCloseButton>
      )}
    </BottomSheetHeaderWrapper>
  );
}
