import styled from '@emotion/styled';
import { semantic } from '../../tokens/semantic';
import { shadow } from '../../tokens/shadow';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';
import { Z_INDEX } from '@/constants/zIndex';

export const BottomSheetDragHandleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: ${measurement.spacing16};
  touch-action: none;
`;

export const BottomSheetDragHandle = styled.div`
  width: 48px;
  height: 4px;
  background-color: ${semantic.fillInteractionPressed};
  border-radius: ${measurement.borderRadius3xl};
  touch-action: none;
  cursor: grab;
`;

export const BottomSheetHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${measurement.spacing6} ${measurement.spacing16};
`;

export const BottomSheetHeaderTitle = styled.h2`
  width: 100%;
  ${typography.headline2Semibold};
  color: ${semantic.textNormalStrong};
  text-align: ${({ variant }) => (variant === 'header' ? 'center' : 'left')};
`;

export const BottomSheetHeaderCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${semantic.iconNormalNormal};
  margin-left: auto;
`;

export const BottomSheetContentsSection = styled.div`
  height: ${({ heightPx }) => (heightPx ? `${heightPx}px` : 'auto')};
  transition: ${({ isDragging }) => (isDragging ? 'none' : 'height 0.3s ease')};

  overflow-y: ${({ scrollLocked }) => (scrollLocked ? 'hidden' : 'auto')};
`;

export const BottomSheetContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  padding-top: ${({ variant }) =>
    variant === 'normal' || variant === 'header' ? measurement.spacing20 : '0'};

  background-color: ${semantic.fillNormalWhite};
  box-shadow: ${shadow.shadowHeavy};
  border-radius: ${measurement.borderRadius3xl} ${measurement.borderRadius3xl} 0
    0;

  overflow: hidden;
  z-index: ${Z_INDEX.bottomSheet};
`;
