import styled from '@emotion/styled';
import { measurement } from '../designsystem/tokens/measurement';
import { layout } from '../designsystem/tokens/layout';

export const PageContainer = styled.div`
  max-width: ${layout.containerMax};
  margin: 0 auto;
`;

export const MainLayoutContent = styled.main`
  max-width: ${layout.containerMax};
  margin: 0 auto;
  padding-bottom: calc(${measurement.spacing64} + env(safe-area-inset-bottom));
`;
