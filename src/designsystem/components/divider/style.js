import styled from '@emotion/styled';
import { measurement } from '../../tokens/measurement';
import { semantic } from '../../tokens/semantic';

export const DividerLine = styled.div`
  width: 100%;
  height: ${({ $size }) =>
    $size === 'sm' ? measurement.borderWidthXs : '12px'};
  background-color: ${({ $size }) =>
    $size === 'sm' ? semantic.borderNormalStrong : semantic.fillNormalStrong};
`;
