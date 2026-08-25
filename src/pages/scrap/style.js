import { measurement } from '@/designsystem/tokens/measurement';
import styled from '@emotion/styled';

export const ScrapScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const ScrapContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${({ boothCount }) =>
    boothCount === 0 ? measurement.spacing128 : '0'};
`;

export const EmptyStateButtonTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing4};
`;
