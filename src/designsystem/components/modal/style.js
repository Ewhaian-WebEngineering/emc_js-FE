import styled from '@emotion/styled';
import { semantic } from '../../tokens/semantic';
import { shadow } from '../../tokens/shadow';
import { measurement } from '../../tokens/measurement';
import { typography } from '../../tokens/typography';

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1001;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 320px;
  padding: ${measurement.spacing24};

  border-radius: ${measurement.borderRadius2xl};
  background-color: ${semantic.fillNormalWhite};
  box-shadow: ${shadow.shadowEmphasize};
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  padding: ${measurement.spacing8} ${measurement.spacing16};
  gap: ${measurement.spacing16};

  h2 {
    ${typography.headline2Semibold};
    text-align: center;
    color: ${semantic.textNormalStrong};
  }

  p {
    ${typography.body2Regular};
    text-align: center;
    color: ${semantic.textNormalNormal};
  }
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: ${measurement.spacing16};

  & > button {
    flex: 1;
  }
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: ${measurement.spacing8};

  & > button {
    flex: 1;
  }
`;
