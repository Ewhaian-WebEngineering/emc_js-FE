import styled from '@emotion/styled';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';

export const ToolTipWrapper = styled.div`
  display: flex;
  flex-direction: column;

  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.08))
    drop-shadow(0 1px 4px rgba(0, 0, 0, 0.08))
    drop-shadow(0 2px 8px rgba(0, 0, 0, 0.12));
`;

export const ToolTipTailSection = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${measurement.spacing32};
  margin-bottom: -2px;
`;

export const ToolTipContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${measurement.spacing12};
  background-color: ${semantic.fillNormalWhite};
  border-radius: ${measurement.borderRadiusLg};

  ${typography.caption1Regular};
  color: ${semantic.textNormalNormal};
  white-space: pre-line;
  text-align: left;
`;
