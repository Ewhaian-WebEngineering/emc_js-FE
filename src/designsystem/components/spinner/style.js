import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const SpinnerCircle = styled.svg`
  animation: ${rotate} 0.9s linear infinite;
`;
