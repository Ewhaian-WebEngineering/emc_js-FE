import styled from '@emotion/styled';
import { measurement } from '@/designsystem/tokens/measurement';

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing32};
  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing48} ${measurement.spacing16};
`;
