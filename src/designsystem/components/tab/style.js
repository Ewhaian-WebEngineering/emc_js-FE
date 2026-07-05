import styled from '@emotion/styled';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';

export const TabMenu = styled.div`
  position: relative;
  display: flex;

  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  background-color: ${semantic.fillNormalWhite};
  border-bottom: ${measurement.borderWidthSm} solid
    ${semantic.borderNormalNormal};

  margin-inline: ${({ variant }) =>
    variant === 'categoryFilter' && `${measurement.spacing16}`};
`;

export const TabMenuItem = styled.button`
  flex: 1 0 auto;

  padding: ${({ variant }) =>
    variant === 'categoryFilter'
      ? `${measurement.spacing12} ${measurement.spacing8}`
      : `${measurement.spacing12} ${measurement.spacing20}`};

  background: none;
  border: none;
  white-space: nowrap;
  cursor: pointer;

  color: ${({ isActive }) =>
    isActive ? semantic.textPrimaryNormal : semantic.textNormalAssistive};
  ${({ isActive }) =>
    isActive ? typography.body2Semibold : typography.body2Medium};

  transition: color 0.2s ease-in-out;
`;

export const TabIndicator = styled.div`
  position: absolute;
  bottom: 0;
  height: ${measurement.borderWidthMd};

  background-color: ${semantic.borderPrimaryNormal};

  transform: ${({ left }) => `translateX(${left}px)`};
  width: ${({ width }) => `${width}px`};

  transition:
    transform 0.2s ease-in-out,
    width 0.2s ease-in-out;
`;
