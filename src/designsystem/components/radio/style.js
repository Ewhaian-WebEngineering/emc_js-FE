import styled from '@emotion/styled';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';

export const RadioItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing8};
`;

export const RadioItemHiddenInput = styled.input`
  display: none;
`;

export const RadioItemCustomInput = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  border-radius: ${measurement.borderRadiusRounded};
  border: 1.5px solid
    ${({ checked }) =>
      checked ? semantic.fillPrimaryNormal : semantic.borderNormalNormal};

  background-color: ${({ checked }) =>
    checked ? semantic.fillPrimaryNormal : 'none'};

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: ${measurement.borderRadiusRounded};
    background-color: ${semantic.fillNormalWhite};
    transition: background 0.15s ease;
  }
`;

export const RadioItemLabel = styled.label`
  ${typography.body1Regular};
  color: ${semantic.textNormalNormal};
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: ${({ variant }) =>
    variant === 'horizontal' ? 'row' : 'column'};
  gap: ${({ gap }) => gap}px;
`;
