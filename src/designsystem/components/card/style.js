import styled from '@emotion/styled';
import { gray } from '../../tokens/colors';
import { measurement } from '../../tokens/measurement';

export const CardPlaceholderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${gray[200]};
  border-radius: ${measurement.borderRadiusMd};

  & > svg {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    mix-blend-mode: luminosity;
    opacity: 0.4;
  }
`;
