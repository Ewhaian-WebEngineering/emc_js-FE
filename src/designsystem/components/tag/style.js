import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';

const getColorStyle = (variant, selected) => {
  if (variant === 'notice') {
    return {
      border: semantic.secondaryYellowDefault,
      background: selected
        ? semantic.secondaryYellowDefault
        : semantic.secondaryYellowLighten,
      color: selected
        ? semantic.textNormalInverse
        : semantic.secondaryYellowDefault,
    };
  }

  if (variant === 'button') {
    return {
      border: selected
        ? semantic.fillPrimaryNormal
        : semantic.borderNormalStrong,
      background: selected
        ? semantic.fillPrimaryNormal
        : semantic.fillNormalWhite,
      color: selected ? semantic.textNormalInverse : semantic.textNormalStrong,
    };
  }

  return {
    border: semantic.borderNormalStrong,
    background: semantic.fillNormalWhite,
    color: semantic.textNormalStrong,
  };
};

export const TagWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${measurement.spacing4};

  cursor: ${({ variant }) =>
    variant === 'notice' || variant === 'button' ? 'pointer' : 'default'};

  padding: ${({ onDelete }) =>
    onDelete
      ? measurement.spacing8
      : `${measurement.spacing8} ${measurement.spacing12}`};

  border-radius: ${measurement.borderRadiusRounded};

  ${({ variant, selected }) => {
    const { border, background, color } = getColorStyle(variant, selected);
    return css`
      border: ${measurement.borderWidthXs} solid ${border};
      background-color: ${background};
      color: ${color};
    `;
  }}

  ${css(typography.body2Medium)};
`;

export const TagLabel = styled.span`
  ${({ variant }) =>
    variant === 'sorting' &&
    css`
      max-width: 9.5em;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `}
`;
