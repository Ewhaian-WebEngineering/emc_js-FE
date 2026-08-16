import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';

export const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${measurement.spacing8};
`;

export const TextInputHeadLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TextInputLabel = styled.label`
  ${typography.body1Medium};
  color: ${semantic.textNormalNormal};
`;

export const TextInputRequired = styled.span`
  ${typography.body1Semibold};
  color: ${semantic.statusDanger};
`;

export const TextInputDescription = styled.span`
  ${typography.caption1Regular};
  color: ${semantic.textNormalAssistive};
`;

export const TextFieldInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  border: ${measurement.borderWidthXs} solid ${semantic.borderNormalNormal};
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

  &::-ms-reveal,
  &::-ms-clear {
    display: none;
  }
`;

export const TextFieldIconGroup = styled.div`
  position: absolute;
  right: ${measurement.spacing12};
  display: flex;
  align-items: center;
  gap: ${measurement.spacing12};
`;

export const TextFieldIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  color: ${semantic.iconNormalNormal};
  cursor: pointer;
`;

export const TextInputBottomLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TextInputHelperText = styled.span`
  ${typography.caption1Regular};
  color: ${({ hasError }) =>
    hasError ? semantic.statusDanger : semantic.textNormalNormal};
`;

export const TextInputMaxLength = styled.span`
  ${typography.caption1Regular};
  color: ${semantic.textNormalNormal};
`;

export const TextAreaWrapper = styled.div`
  position: relative;
  border: ${measurement.borderWidthXs} solid ${semantic.borderNormalNormal};
  border-radius: ${measurement.borderRadiusXl};
  background-color: ${semantic.fillNormalWhite};
  padding-right: 3px;

  &:focus-within {
    border-color: ${semantic.borderPrimaryNormal};
  }

  &:has(textarea:disabled) {
    background-color: ${semantic.fillInteractionDisabled};
    border-color: ${semantic.borderNormalNormal};
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

export const TextAreaInput = styled.textarea`
  width: 100%;
  height: 148px;
  overflow-y: auto;
  padding: ${measurement.spacing12};
  border: none;
  outline: none;
  background-color: transparent;
  resize: none;
  color: ${semantic.textNormalStrong};
  ${typography.body2Regular}

  &::placeholder {
    color: ${semantic.textNormalAssistive};
  }

  &:disabled {
    color: ${semantic.textNormalAssistive};
    cursor: not-allowed;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 7px 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${semantic.borderNormalNormal};
    border-radius: ${measurement.borderRadiusRounded};
    cursor: pointer;
  }
`;
