import { semantic } from '@/designsystem/tokens/semantic';
import styled from '@emotion/styled';

export const LoadingScreenContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${semantic.fillNormalWhite};
`;

export const LoadingLogo = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.05;
`;
