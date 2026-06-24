import styled from '@emotion/styled';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';

export const SwitchWrapper = styled.div`
  width: 48px;
  height: 28px;

  display: flex;
  align-items: center;

  padding: ${measurement.spacing4};
  border-radius: ${measurement.borderRadiusRounded};

  background-color: ${({ checked }) =>
    checked ? semantic.fillPrimaryNormal : semantic.fillInteractionPressed};

  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`;

export const SwitchThumb = styled.div`
  width: 20px;
  height: 20px;

  border-radius: ${measurement.borderRadiusRounded};

  background-color: ${semantic.fillNormalWhite};
  transform: ${({ checked }) =>
    checked ? 'translateX(20px)' : 'translateX(0)'};
  transition: transform 0.2s ease-in-out;
`;
