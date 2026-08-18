import styled from '@emotion/styled';
import { semantic } from '../../designsystem/tokens/semantic';
import { measurement } from '../../designsystem/tokens/measurement';
import { typography } from '../../designsystem/tokens/typography';

export const MyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MyContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: ${measurement.spacing20} ${measurement.spacing16}
    ${measurement.spacing144} ${measurement.spacing16};
  gap: ${measurement.spacing32};
`;

export const MyFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${measurement.spacing4};
  padding-bottom: ${measurement.spacing112};

  p {
    color: ${semantic.textNormalNormal};
    text-align: center;
    ${typography.body2Regular};
  }
`;
