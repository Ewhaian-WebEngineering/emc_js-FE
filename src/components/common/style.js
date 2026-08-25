import { measurement } from '@/designsystem/tokens/measurement';
import { semantic } from '@/designsystem/tokens/semantic';
import { typography } from '@/designsystem/tokens/typography';
import styled from '@emotion/styled';

export const CommonScreenContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${semantic.fillNormalWhite};
  padding-inline: ${measurement.spacing16};
`;

export const CommonLogoBg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.05;
  width: 100%;

  & > svg {
    width: 100%;
    height: auto;
  }
`;

export const ErrorTitle = styled.h1`
  ${typography.headline1Semibold};
  color: ${semantic.textNormalStrong};
  text-align: center;
`;

export const ErrorButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: ${measurement.spacing16};
  width: 100%;
  display: flex;
  padding-inline: ${measurement.spacing16};

  & > button {
    width: 100%;
  }
`;
