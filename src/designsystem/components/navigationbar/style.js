import styled from '@emotion/styled';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';
import { layout } from '../../tokens/layout';

export const NavigationBarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;

  display: flex;

  max-width: ${layout.containerMax};
  margin: 0 auto;

  background-color: ${semantic.fillNormalWhite};
  border-top: ${measurement.borderWidthSm} solid ${semantic.borderNormalNormal};
  padding-bottom: env(safe-area-inset-bottom);
`;

export const NavigationBarItem = styled.button`
  flex: 1 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${measurement.spacing4};

  padding: ${measurement.spacing12} ${measurement.spacing4};

  background: none;
  border: none;
  cursor: pointer;

  color: ${({ isActive }) =>
    isActive ? semantic.iconPrimaryNormal : semantic.iconNormalAssistive};

  & > svg {
    width: 24px;
    height: 24px;
  }
`;

export const NavigationBarLabel = styled.span`
  ${({ isActive }) =>
    isActive ? typography.caption1Medium : typography.caption1Regular};
  color: ${({ isActive }) =>
    isActive ? semantic.textPrimaryNormal : semantic.textNormalAssistive};
`;
