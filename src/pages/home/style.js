import styled from '@emotion/styled';
import { gray } from '@/designsystem/tokens/colors';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const IntroImage = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
`;

export const HomeNoticeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${measurement.spacing20} ${measurement.spacing16};
  background-color: ${semantic.fillNormalNormal};
`;

export const HomeNoticeTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const HomeNoticeSubtitle = styled.p`
  font-family: 'Nixgon';
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: ${gray[950]};
`;

export const HomeNoticeTitle = styled.p`
  font-family: 'High1';
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: ${gray[950]};
`;

export const ArrowRightIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const HomeIconButtonWrapper = styled.button`
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  gap: ${measurement.spacing8};
  cursor: pointer;

  p {
    ${typography.caption1Medium}
    color: ${semantic.textNormalNormal}
    white-space: nowrap;
  }
`;

export const HomeIconButtonSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: ${measurement.spacing16};
  gap: ${measurement.spacing16};
`;

export const RankingScroll = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
`;

export const RankingPage = styled.div`
  flex: 0 0 85%;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing12};
`;

export const RankingItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing8};
`;

export const RankingNumber = styled.div`
  ${typography.title2Semibold}
  color: ${({ rank }) => (rank <= 3 ? semantic.textPrimaryNormal : gray[950])};
  width: ${measurement.spacing32};
`;

export const PopularBoothUpdateTime = styled.p`
  ${typography.caption1Regular}
  color: ${semantic.textNormalNormal};
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing24};
  padding: ${measurement.spacing16};
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing4};
`;

export const SectionTitle = styled.h2`
  ${typography.headline2Semibold};
  color: ${semantic.textNormalStrong};
`;

export const SectionSubTitle = styled.p`
  ${typography.body2Regular};
  color: ${semantic.textNormalNormal};
`;

export const ViewAllButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  gap: ${measurement.spacing2};
  padding: ${measurement.spacing4};
  border: none;
  background-color: transparent;

  p {
    ${typography.body2Semibold}
    color: ${semantic.textNormalNormal};
  }
`;

export const SponsorItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${measurement.spacing8};
`;

export const SponsorItemThumbnail = styled.div`
  width: 70px;
  height: 70px;
  border-radius: ${measurement.borderRadiusRounded};
  overflow: hidden;
  border: ${measurement.borderWidthSm} solid
    ${({ isSelected }) =>
      isSelected ? semantic.borderPrimaryNormal : semantic.borderNormalStrong};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SponsorName = styled.p`
  ${({ isSelected }) =>
    isSelected ? typography.caption1Medium : typography.caption1Regular};
  color: ${({ isSelected }) =>
    isSelected ? semantic.textNormalStrong : semantic.textNormalNormal};
`;

export const SponsorListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing20};
`;

export const ListScroll = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-inline: ${measurement.spacing16};
  margin-inline: -${measurement.spacing16};

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SponsorDescriptionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${measurement.spacing16};
  gap: ${measurement.spacing12};
  border: ${measurement.borderWidthSm} solid ${semantic.borderNormalNormal};
  border-radius: ${measurement.borderRadiusXl};
  background-color: ${semantic.fillNormalWhite};

  p {
    ${typography.caption2Regular}
    color: ${semantic.textNormalNormal};
    text-align: left;

    line-height: 1.5;
    max-height: 3em;
    overflow: hidden;
    flex: 1;
  }
`;

export const EventSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing12};
`;

export const EventTabsContainer = styled.div`
  display: flex;
  gap: ${measurement.spacing8};
`;

export const EventListItem = styled.div`
  flex-shrink: 0;
  width: 90%;
`;

export const FaqListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-inline: -${measurement.spacing16};
`;

export const FaqAnswer = styled.p`
  ${typography.body2Regular}
  color: ${semantic.textNormalNormal};
`;

export const ContactUsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing96};
  padding: ${measurement.spacing16} ${measurement.spacing16}
    ${measurement.spacing24} ${measurement.spacing16};
  background-color: ${semantic.fillNormalNormal};
`;

export const KakaoOpenChannelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${measurement.spacing16};
  gap: ${measurement.spacing12};
  border: ${measurement.borderWidthSm} solid ${semantic.borderNormalNormal};
  border-radius: ${measurement.borderRadiusXl};
  background-color: ${semantic.fillNormalWhite};
`;

export const KakaoOpenChannelContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    flex: 1;
    ${typography.caption1Medium}
    color: ${semantic.textNormalNormal};
    text-align: left;
  }
`;

export const AdminCertificationSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${measurement.spacing4};

  p {
    ${typography.body2Regular}
    color: ${semantic.textNormalNormal};
  }
`;
