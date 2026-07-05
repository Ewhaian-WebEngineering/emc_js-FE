import styled from '@emotion/styled';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';

export const EmptyStateContainer = styled.div`
  width: 100%;
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  gap: ${measurement.spacing24};
`;

export const EmptyStateText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  gap: ${measurement.spacing8};

  h2 {
    ${typography.headline2Semibold};
    color: '#252626';
  }

  p {
    ${typography.body1Regular};
    color: ${semantic.textNormalNormal};
  }
`;

export const EmptyStateTextSm = styled.span`
  ${typography.caption1Medium};
  color: ${semantic.textNormalAssistive};
`;
