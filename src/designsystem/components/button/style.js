import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { gray } from '../../tokens/colors';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';

export const BoxButtonContainer = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  height: ${({ $size }) =>
    $size === 'lg' ? '56px' : $size === 'md' ? '48px' : '40px'};
  padding: ${({ $size }) =>
    $size === 'lg'
      ? `${measurement.spacing16} ${measurement.spacing24}`
      : $size === 'md'
        ? `${measurement.spacing12} ${measurement.spacing20}`
        : `${measurement.spacing12} ${measurement.spacing16}`};

  background-color: ${({ $type }) =>
    $type === 'primary'
      ? semantic.fillPrimaryNormal
      : $type === 'error'
        ? semantic.statusDangerSubtle1
        : semantic.fillNormalStrong};

  color: ${({ $type }) =>
    $type === 'primary'
      ? semantic.textNormalInverse
      : $type === 'error'
        ? semantic.statusDanger
        : semantic.textNormalNormal};

  border: none;
  border-radius: ${({ $size }) =>
    $size === 'sm' ? measurement.borderRadiusLg : measurement.borderRadiusXl};

  ${({ $size }) =>
    $size === 'lg'
      ? css(typography.headline2Semibold)
      : $size === 'md'
        ? css(typography.body1Semibold)
        : css(typography.body2Semibold)}

  &:disabled {
    background-color: ${semantic.fillInteractionDisabled};
    color: ${semantic.textNormalAssistive};
    cursor: default;
  }

  &:hover:not(:disabled) {
    background-color: ${({ $type }) =>
      $type === 'primary'
        ? semantic.fillInteractionPrimaryHover
        : $type === 'error'
          ? semantic.statusDangerSubtle2
          : gray[200]};
  }
`;
