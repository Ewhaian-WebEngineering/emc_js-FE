import styled from '@emotion/styled';

import { semantic } from '@/designsystem/tokens/semantic';
import { typography } from '@/designsystem/tokens/typography';
import { measurement } from '@/designsystem/tokens/measurement';

export const SponsorDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  background: ${semantic.fillNormalWhite};
`;

export const HeroSection = styled.section`
  position: relative;
  width: 100%;
`;

export const RepresentativeImage = styled.img`
  display: block;
  width: 100%;
  height: 250px;
  object-fit: cover;
  border: ${measurement.borderWidthXs} solid ${semantic.borderNormalNormal};
  border-radius: ${measurement.borderRadiusRectangle};
`;

export const HeaderWrapper = styled.div`
  position: absolute;
  top: ${measurement.spacing0};
  left: ${measurement.spacing0};
  z-index: 1;
  width: 100%;
`;

export const SponsorInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${measurement.spacing20} ${measurement.spacing16};
  gap: ${measurement.spacing24};
`;

export const SponsorName = styled.h1`
  ${typography.headline2Semibold};
  color: ${semantic.textNormalStrong};
  line-height: 24px;
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${measurement.spacing16};
`;

export const InfoRow = styled.div`
  display: grid;
  grid-template-columns: ${measurement.spacing64} 1fr;
  width: 100%;
  align-items: center;
  gap: ${measurement.spacing12};
  & > a {
    justify-self: start;
  }
`;

export const InfoLabel = styled.span`
  ${typography.caption1Medium};
  color: ${semantic.textNormalNormal};
`;

export const InfoValue = styled.span`
  ${typography.caption1Medium};
  min-width: ${measurement.spacing0};
  color: ${semantic.textNormalStrong};
  justify-self: start;
`;

export const IntroductionSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${measurement.spacing24} ${measurement.spacing16};
  gap: ${measurement.spacing40};
  scroll-margin-top: ${measurement.spacing0};
`;

export const SectionTitle = styled.h2`
  ${typography.headline2Semibold};
  color: ${semantic.textNormalStrong};
`;

export const IntroductionContent = styled.div`
  ${typography.caption1Regular};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 720px;
  color: ${semantic.textNormalAssistive};
  background: ${semantic.fillNormalNormal};
  text-align: center;
  white-space: pre-line;
`;

export const ProductSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${measurement.spacing24} ${measurement.spacing16};
  gap: ${measurement.spacing40};
  scroll-margin-top: ${measurement.spacing0};
`;

export const ProductGroups = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing40};
`;

export const ProductGroupBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing24};
`;

export const ProductGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing24};
`;

export const ProductGroupHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${measurement.spacing8};
`;

export const ProductGroupName = styled.h3`
  ${typography.body2Semibold};
  color: ${semantic.textNormalStrong};
`;

export const ProductGroupDescription = styled.p`
  ${typography.caption1Regular};
  color: ${semantic.textNormalNormal};
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${measurement.spacing16};
`;

export const EventSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${measurement.spacing32} ${measurement.spacing16};
  background: ${semantic.fillNormalWhite};
  border-bottom: ${measurement.borderWidthSm} solid
    ${semantic.borderNormalAssistive};
`;

export const EventContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${measurement.spacing20};
`;

export const EventTitle = styled.h2`
  ${typography.title3Semibold};
  color: ${semantic.textNormalStrong};
  line-height: ${measurement.spacing36};
  white-space: pre-line;
`;

export const EventButtonContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${measurement.spacing4};
  svg {
    width: ${measurement.spacing20};
    height: ${measurement.spacing20};
    flex-shrink: 0;
  }
`;
