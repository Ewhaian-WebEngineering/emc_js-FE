import styled from '@emotion/styled';

import { measurement } from '@/designsystem/tokens/measurement';

export const SponsorDetailContainer = styled.main`
  width: 100%;
  min-height: 100vh;

  background-color: #ffffff;
`;

export const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 250px;
  background-color: #e7eaed;
  overflow: hidden;
`;

export const RepresentativeImage = styled.img`
  display: block;
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

export const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
`;

export const SponsorInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${measurement.spacing24} ${measurement.spacing16};
  gap: ${measurement.spacing24};
`;

export const SponsorName = styled.h1`
  margin: 0;
  font-family: Pretendard, sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: #3d3f41;
`;

export const SponsorInfoList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${measurement.spacing12};
`;

export const SponsorInfoRow = styled.div`
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  column-gap: 0;
  align-items: center;
  width: 100%;
  min-height: 20px;
`;

export const SponsorInfoLabel = styled.span`
  display: block;
  width: 64px;
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  color: #b8bbbe;
  text-align: left;
`;

export const SponsorInfoValue = styled.span`
  display: block;
  min-width: 0;
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  color: #6f7173;
  text-align: left;
`;

export const SponsorInfoLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 0;
  text-align: left;
  & > a {
    justify-content: flex-start;
  }
`;

export const TabSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #e7eaed;
`;

export const TabButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: ${({ $active }) => ($active ? '#1769ff' : '#c4c6c8')};
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: ${({ $active }) => ($active ? '2px' : '0')};
    background-color: #1769ff;
  }
`;

export const IntroductionSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${measurement.spacing24} ${measurement.spacing16};
  gap: ${measurement.spacing24};
  scroll-margin-top: 48px;
`;

export const IntroductionTitle = styled.h2`
  margin: 0;
  font-family: Pretendard, sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
  color: #3d3f41;
`;

export const IntroductionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 720px;
  flex-shrink: 0;
  background-color: #f9fafb;
  text-align: center;
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  color: #6f7173;
`;

export const SectionDivider = styled.div`
  width: 100%;
  height: 8px;
  background-color: #f5f6f7;
`;

export const ProductSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${measurement.spacing24} ${measurement.spacing16};
  gap: ${measurement.spacing40};
  scroll-margin-top: 48px;
`;

export const ProductSectionTitle = styled.h2`
  margin: 0;
  font-family: Pretendard, sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
  color: #3d3f41;
`;

export const ProductGroup = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${measurement.spacing16};
`;

export const ProductGroupHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${measurement.spacing8};
`;

export const ProductGroupName = styled.h3`
  margin: 0;
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #3d3f41;
`;

export const ProductGroupDescription = styled.p`
  margin: 0;
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #6f7173;
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${measurement.spacing8};
`;

export const ProductItem = styled.article`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 168px;
  gap: ${measurement.spacing8};
  overflow: hidden;
`;

export const ProductThumbnail = styled.img`
  display: block;
  width: 100px;
  height: 168px;
  flex: 0 0 100px;
  object-fit: cover;
  background-color: #e7eaed;
`;

export const ProductText = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
  gap: ${measurement.spacing8};
`;

export const ProductName = styled.h4`
  margin: 0;
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #3d3f41;
`;

export const ProductDescription = styled.p`
  margin: 0;
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #6f7173;
  word-break: keep-all;
`;

export const EventSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${measurement.spacing32} ${measurement.spacing16};
  gap: ${measurement.spacing20};
`;

export const EventTitle = styled.h2`
  margin: 0;
  white-space: pre-line;
  font-family: Pretendard, sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
  color: #3d3f41;
`;

export const EventButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background-color: #1769ff;
  font-family: Pretendard, sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #ffffff;
  cursor: pointer;
`;
