import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';

export const SelectItemWrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: ${({ size }) =>
    size === 'lg'
      ? `${measurement.spacing16} ${measurement.spacing8}`
      : `${measurement.spacing8}`};
  gap: ${measurement.spacing4};

  border-radius: ${measurement.borderRadiusLg};
  background-color: ${({ selected }) =>
    selected ? semantic.fillNormalStrong : `transparent`};

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `}

  span {
    color: ${({ disabled }) =>
      disabled ? semantic.textNormalAssistive : semantic.textNormalStrong};

    ${({ size }) =>
      size === 'lg'
        ? css(typography.body1Regular)
        : size === 'md'
          ? css(typography.body2Regular)
          : css(typography.caption1Regular)}

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  button {
  }
`;

export const SelectItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing8};
`;

export const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const SelectTrigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: ${({ size }) =>
    size === 'md'
      ? `${measurement.spacing12} ${measurement.spacing12} ${measurement.spacing12} ${measurement.spacing16}`
      : `${measurement.spacing6} ${measurement.spacing0}`};
  gap: ${({ size }) =>
    size === 'md' ? measurement.spacing8 : measurement.spacing2};

  border: ${measurement.borderRadiusSm} solid
    ${({ size, error, isOpen }) =>
      size === 'sm'
        ? 'transparent'
        : error
          ? semantic.statusDanger
          : isOpen
            ? semantic.borderPrimaryNormal
            : semantic.borderNormalNormal};
  border-radius: ${measurement.borderRadiusLg};

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      background-color: ${semantic.fillInteractionDisabled};
    `}

  span {
    color: ${({ hasValue }) =>
      hasValue ? semantic.textNormalStrong : semantic.textNormalAssistive};

    ${({ size }) =>
      size === 'md'
        ? css(typography.body2Regular)
        : css(typography.caption1Regular)}

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;
