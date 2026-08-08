import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const MapScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const MapArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;
