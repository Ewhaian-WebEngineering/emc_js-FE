import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const CongestionListWrapper = styled.ul`
  display: flex;
  flex-direction: column;

  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing40} ${measurement.spacing16};
`;

export const CongestionButtonWrapper = styled.div`
  padding: ${measurement.spacing12} ${measurement.spacing16}
    ${measurement.spacing40} ${measurement.spacing16};

  & > button {
    width: 100%;
  }
`;

export const ButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;
