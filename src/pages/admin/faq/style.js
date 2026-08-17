import styled from '@emotion/styled';
import { measurement } from '@/designsystem/tokens/measurement';

export const FaqFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding-bottom: ${measurement.spacing144};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing40};
  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing0} ${measurement.spacing16};
`;
