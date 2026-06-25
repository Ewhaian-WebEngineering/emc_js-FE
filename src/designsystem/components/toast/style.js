import styled from '@emotion/styled';
import { common } from '../../tokens/colors';
import { semantic } from '../../tokens/semantic';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';

export const ToastPortal = styled.div`
  position: fixed;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${measurement.spacing8};

  z-index: 9999;
  pointer-events: none;
`;

export const ToastWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 335px;
  height: 56px;
  padding: ${measurement.spacing12} ${measurement.spacing16};

  background-color: ${semantic.materialNormal};
  border-radius: ${measurement.borderRadius2xl};

  pointer-events: auto;

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translateY(${({ visible }) => (visible ? '0px' : '12px')});
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
`;

export const ToastMessage = styled.span`
  ${typography.body1Semibold};
  color: ${common[0]};
`;

export const ToastActionButton = styled.button`
  ${typography.body2Medium};
  color: ${semantic.textNormalInverse};
  background: ${semantic.materialStrong};
  border: none;
  border-radius: ${measurement.borderRadiusLg};
  cursor: pointer;
  padding: ${measurement.spacing6} ${measurement.spacing12};
  margin-left: ${measurement.spacing12};
`;
