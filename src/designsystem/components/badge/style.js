import styled from '@emotion/styled';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';

export const BadgeWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: ${({ $size }) => ($size === 'sm' ? '20px' : '24px')};

  padding-inline: ${({ $size }) =>
    $size === 'sm' ? measurement.spacing4 : measurement.spacing8};

  border-radius: ${measurement.borderRadiusMd};

  color: ${({ $color }) => $color};
  background-color: ${({ $backgroundColor }) => $backgroundColor};

  ${({ $size }) =>
    $size === 'sm' ? typography.caption1Medium : typography.body2Medium}

  line-height: 1;
`;
