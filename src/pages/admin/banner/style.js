import styled from '@emotion/styled';
import { measurement } from '@/designsystem/tokens/measurement';

export const BannerFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding-bottom: ${measurement.spacing110};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing36};
  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing0} ${measurement.spacing16};
`;
