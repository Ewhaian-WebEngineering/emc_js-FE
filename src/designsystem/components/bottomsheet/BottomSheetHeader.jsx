import CloseIcon from '../../../assets/svg/20px/ic_close.svg?react';
import {
  BottomSheetHeaderCloseButton,
  BottomSheetHeaderTitle,
  BottomSheetHeaderWrapper,
} from './style';

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
