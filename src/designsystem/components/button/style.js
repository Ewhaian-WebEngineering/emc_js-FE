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

  background-color: ${({ $variant }) =>
    $variant === 'primary'
      ? semantic.fillPrimaryNormal
      : $variant === 'error'
        ? semantic.statusDangerSubtle1
        : semantic.fillNormalStrong};

  color: ${({ $variant }) =>
    $variant === 'primary'
      ? semantic.textNormalInverse
      : $variant === 'error'
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

  &:active:not(:disabled) {
    background-color: ${({ $variant }) =>
      $variant === 'primary'
        ? semantic.fillInteractionPrimaryHover
        : $variant === 'error'
          ? semantic.statusDangerSubtle2
          : gray[200]};
  }
`;

export const TextButtonContainer = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  padding: ${measurement.spacing4};

  background-color: transparent;

  color: ${({ $variant }) =>
    $variant === 'primary'
      ? semantic.textPrimaryNormal
      : semantic.textNormalNormal};

  border: none;
  border-radius: ${measurement.borderRadiusMd};

  ${({ $size }) =>
    $size === 'md'
      ? css(typography.body1Semibold)
      : $size === 'sm'
        ? css(typography.body2Semibold)
        : css(typography.caption1Medium)}

  &:disabled {
    color: ${semantic.textNormalAssistive};
    cursor: default;
  }

  &:active:not(:disabled) {
    background-color: ${({ $variant }) =>
      $variant === 'primary'
        ? semantic.fillPrimaryAssistive
        : semantic.fillNormalStrong};
  }
`;

export const LinkButtonContainer = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  max-width: 100%;
  min-width: 0;

  color: ${({ $variant }) =>
    $variant === 'primary'
      ? semantic.textPrimaryNormal
      : semantic.textNormalNormal};

  border: none;

  text-decoration: underline;

  ${({ $size }) =>
    $size === 'lg'
      ? css(typography.body1Medium)
      : $size === 'md'
        ? css(typography.body2Medium)
        : css(typography.caption1Medium)}
`;

export const LinkButtonLabel = styled.span`
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const IconButtonContainer = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  padding: ${({ $size }) =>
    $size === 'md' ? measurement.spacing12 : measurement.spacing8};

  background-color: ${({ $variant }) =>
    $variant === 'primary'
      ? semantic.fillPrimaryNormal
      : $variant === 'secondary'
        ? semantic.fillNormalNormal
        : 'transparent'};

  color: ${({ $variant }) =>
    $variant === 'primary'
      ? semantic.iconNormalInverse
      : semantic.iconNormalStrong};

  border: ${({ $variant }) =>
    $variant === 'transparent'
      ? 'none'
      : `${measurement.borderWidthSm} solid ${
          $variant === 'primary'
            ? semantic.borderPrimaryNormal
            : semantic.borderNormalStrong
        }`};

  border-radius: ${measurement.borderRadiusLg};

  &:disabled {
    background-color: ${semantic.fillInteractionDisabled};
    color: ${semantic.iconNormalAssistive};
    border: ${({ $variant }) =>
      $variant === 'transparent'
        ? 'none'
        : `${measurement.borderWidthSm} solid ${semantic.borderNormalNormal}`};
    cursor: default;
  }

  &:active:not(:disabled) {
    background-color: ${({ $variant }) =>
      $variant === 'primary'
        ? semantic.fillPrimaryNormal
        : semantic.fillInteractionPressed};
    border: ${({ $variant }) =>
      $variant === 'transparent'
        ? 'none'
        : `${measurement.borderWidthSm} solid ${
            $variant === 'primary'
              ? semantic.borderPrimaryNormal
              : semantic.borderNormalStrong
          }`};
  }
`;
