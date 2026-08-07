import styled from '@emotion/styled';
import { semantic } from '@/designsystem/tokens/semantic';
import { typography } from '@/designsystem/tokens/typography';
import { measurement } from '@/designsystem/tokens/measurement';

export const SponsorDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: ${semantic.fillNormalWhite};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: ${measurement.spacing40};
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  background: ${semantic.fillNormalNormal};
`;

export const SponsorInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing20};
  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing20};
`;

export const SponsorName = styled.h1`
  ${typography.headline2Semibold};
  color: ${semantic.textNormalStrong};
  margin: 0;
`;

export const InfoTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing12};
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${measurement.spacing16};
`;

export const InfoLabel = styled.span`
  ${typography.body2Medium};
  color: ${semantic.textNormalAssistive};
  min-width: 72px;
`;

export const InfoValue = styled.span`
  ${typography.body2Medium};
  color: ${semantic.textNormalNormal};
  flex: 1;
`;

export const IntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing16};
  padding: ${measurement.spacing8} ${measurement.spacing16}
    ${measurement.spacing24};
`;

export const IntroTitle = styled.h2`
  ${typography.headline2Semibold};
  color: ${semantic.textNormalStrong};
  margin: 0;
`;

export const IntroImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  padding: ${measurement.spacing24};
  border: 1px solid ${semantic.borderNormalNormal};
  border-radius: ${measurement.borderRadiusLg};
  background: ${semantic.fillNormalNormal};
`;

export const IntroPlaceholder = styled.div`
  ${typography.body2Medium};
  color: ${semantic.textNormalAssistive};
  text-align: center;
  line-height: 1.5;
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing20};
  padding: ${measurement.spacing8} ${measurement.spacing16}
    ${measurement.spacing24};
`;

export const ProductGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing12};
`;

export const ProductGroupTitle = styled.h3`
  ${typography.body2Semibold};
  color: ${semantic.textNormalStrong};
  margin: 0;
`;

export const ProductGroupDescription = styled.p`
  ${typography.body2Medium};
  color: ${semantic.textNormalNormal};
  line-height: 1.5;
  margin: 0;
`;

export const EventSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing16};
  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing40};
`;

export const EventTitle = styled.h2`
  ${typography.headline2Semibold};
  color: ${semantic.textNormalStrong};
  text-align: center;
  white-space: pre-line;
  margin: 0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
