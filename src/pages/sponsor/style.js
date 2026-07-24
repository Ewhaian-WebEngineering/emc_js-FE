import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { typography } from '@/designsystem/tokens/typography';
import { measurement } from '@/designsystem/tokens/measurement';

export const SponsorContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: ${semantic.fillNormalWhite};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;g
`;

export const IntroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: ${measurement.spacing40} ${measurement.spacing24};
  gap: ${measurement.spacing20};
  background: #fff7e6;
`;

export const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  gap: ${measurement.spacing16};

  svg {
    width: 43px;
    height: 47px;
    flex-shrink: 0;
  }
`;

export const IntroTitle = styled.h2`
  ${typography.headline1Semibold};

  color: ${semantic.textNormalStrong};

  text-align: center;
  white-space: pre-line;
`;

export const IntroDescription = styled.p`
  ${typography.body2Medium};

  color: ${semantic.textNormalNormal};

  text-align: center;
`;

export const SponsorList = styled.div`
  display: flex;
  flex-direction: column;

  padding: ${measurement.spacing20} ${measurement.spacing16}
    ${measurement.spacing72} ${measurement.spacing16};

  gap: ${measurement.spacing36};
`;
