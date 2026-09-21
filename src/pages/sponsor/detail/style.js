import styled from '@emotion/styled';

import { semantic } from '@/designsystem/tokens/semantic';
import { typography } from '@/designsystem/tokens/typography';
import { measurement } from '@/designsystem/tokens/measurement';

export const SponsorDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  margin-bottom: 144px;
  background: ${semantic.fillNormalWhite};
`;

export const RepresentativeImage = styled.img`
  display: block;
  width: 100%;
  height: 250px;
  object-fit: cover;
  border: ${measurement.borderWidthXs} solid ${semantic.borderNormalNormal};
  border-radius: ${measurement.borderRadiusRectangle};
`;

export const RepresentativeImagePlaceholder = styled.div`
  width: 100%;
  height: 250px;
  border: ${measurement.borderWidthXs} solid ${semantic.borderNormalNormal};
  border-radius: ${measurement.borderRadiusRectangle};
  overflow: hidden;
`;

export const SponsorInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${measurement.spacing20} ${measurement.spacing16};
  gap: ${measurement.spacing20};
`;

export const SponsorName = styled.h1`
  ${typography.headline2Semibold};
  color: ${semantic.textNormalStrong};
`;

export const InfoList = styled.dl`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
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

export const InfoLabel = styled.dt`
  ${typography.caption1Regular};
  color: ${semantic.textNormalNormal};
`;

export const InfoValue = styled.dd`
  ${typography.caption1Medium};
  min-width: ${measurement.spacing0};
  margin: 0;
  color: ${semantic.textNormalStrong};
  justify-self: start;
`;

export const IntroductionSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${measurement.spacing24} ${measurement.spacing16};
  gap: ${measurement.spacing40};
`;

export const SectionTitle = styled.h2`
  ${typography.headline2Semibold};
  color: ${semantic.textNormalStrong};
`;

export const IntroductionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  background-color: ${semantic.fillNormalWhite};
  min-height: 500px;

  ${typography.body2Regular}
  color: ${semantic.textNormalNormal};

  p {
    margin-bottom: ${measurement.spacing12};
  }

  p:last-child {
    margin-bottom: 0;
  }

  b,
  strong {
    font-weight: 700;
  }
`;

export const ProductSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${measurement.spacing24} ${measurement.spacing16};
  gap: ${measurement.spacing24};
  scroll-margin-top: ${measurement.spacing0};
`;

export const ProductGroups = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing40};
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
  gap: ${measurement.spacing20};
`;

export const EventTitle = styled.h2`
  ${typography.title3Semibold};
  color: ${semantic.textNormalStrong};
  white-space: pre-line;
`;

export const EventButtonContent = styled.div`
  display: flex;
  gap: ${measurement.spacing4};
`;

export const TabWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${semantic.fillNormalWhite};
`;
