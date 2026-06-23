import styled from '@emotion/styled';
import { css } from '@emotion/react';
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
    $size === 'sm'
      ? css(typography.caption1Medium)
      : css(typography.body2Medium)}

  line-height: 1;
`;
