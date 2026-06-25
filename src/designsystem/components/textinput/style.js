import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';

export const TextFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${measurement.spacing8};
`;

export const TextFieldHeadLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TextFieldLabel = styled.label`
  ${typography.body1Medium};
  color: ${semantic.textNormalNormal};
`;

export const TextFieldRequired = styled.span`
  ${typography.body1Semibold};
  color: ${semantic.statusDanger};
`;

export const TextFieldDescription = styled.span`
  ${typography.caption1Regular};
  color: ${semantic.textNormalAssistive};
`;

export const TextFieldInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  border: ${measurement.borderRadiusSm} solid ${semantic.borderNormalNormal};
  border-radius: ${measurement.borderRadiusXl};
  background-color: ${semantic.fillNormalWhite};

  &:focus-within {
    border-color: ${semantic.borderPrimaryNormal};
  }

  &:has(input:disabled) {
    background-color: ${semantic.fillInteractionDisabled};
    border-color: ${semantic.borderNormalNormal};
    color: ${semantic.textNormalAssistive};
  }

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${semantic.statusDanger};

      &:focus-within {
        border-color: ${semantic.statusDanger};
      }
    `}
`;

export const TextFieldInput = styled.input`
  width: 100%;
  padding: ${measurement.spacing12};
  border: none;
  outline: none;
  background-color: transparent;
  color: ${semantic.textNormalStrong};
  ${typography.body2Regular}

  &::placeholder {
    color: ${semantic.textNormalAssistive};
  }

  &:disabled {
    color: ${semantic.textNormalAssistive};
    cursor: not-allowed;
  }
`;

export const TextFieldIcon = styled.button`
  position: absolute;
  right: ${measurement.spacing12};
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  color: ${semantic.iconNormalNormal};
`;

export const TextFieldBottomLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TextFieldHelperText = styled.span`
  ${typography.caption1Regular};
  color: ${({ hasError }) =>
    hasError ? semantic.statusDanger : semantic.textNormalNormal};
`;

export const TextFieldMaxLength = styled.span`
  ${typography.caption1Regular};
  color: ${semantic.textNormalNormal};
`;
