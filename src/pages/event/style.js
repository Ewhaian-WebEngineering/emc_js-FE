import styled from '@emotion/styled';
import { css } from '@emotion/react';
import BoxButton from '@/designsystem/components/button/boxbutton/BoxButton';
import { semantic } from '@/designsystem/tokens/semantic';
import { measurement } from '@/designsystem/tokens/measurement';
import { typography } from '@/designsystem/tokens/typography';

export const ScreenContainer = styled.div`
  min-height: 100vh;
  background-color: ${semantic.fillNormalWhite};
`;

export const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  transition: transform 0.3s ease-in-out;
  transform: translateY(
    ${({ isHeaderVisible }) =>
      isHeaderVisible ? '0' : `-${measurement.spacing64}`}
  );
`;

export const ContentWrapper = styled.div`
  padding-bottom: ${measurement.spacing56};
`;

export const EventSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing24};
  padding: ${measurement.spacing20} ${measurement.spacing16};
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing4};
`;

export const SectionTitle = styled.h2`
  color: ${semantic.textNormalStrong};
  ${typography.headline2Semibold};
`;

export const SectionDescription = styled.p`
  color: ${semantic.textNormalNormal};
  ${typography.body2Regular};
`;

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${measurement.spacing24};
`;

const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const flexColumn = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const sectionBase = css`
  width: 100%;
  ${flexCenter};
`;

const sectionColumn = css`
  width: 100%;
  ${flexColumn};
`;

export const Text = styled.span`
  white-space: pre-wrap;
`;

export const EventTitle = styled.h1`
  ${typography.headline1Semibold};
  color: ${semantic.textNormalStrong};
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: ${measurement.spacing20};
`;

export const EventPeriodLabel = styled(Text)`
  ${typography.body2Regular};
  color: ${semantic.textNormalNormal};
`;

export const EventPeriodValue = styled(Text)`
  ${typography.body2Medium};
  color: ${semantic.textNormalStrong};
`;

export const SponsorTitle = styled.h2`
  ${typography.title3Semibold};
  color: ${semantic.textNormalStrong};
`;

export const ShareTitle = styled.h2`
  ${typography.body1Medium};
  color: ${semantic.textNormalStrong};
  text-align: center;
`;

export const ShareActionLabel = styled.p`
  ${typography.body2Medium};
  color: ${semantic.textNormalNormal};
  text-align: center;
`;

export const NoticeTitle = styled.h2`
  ${typography.body2Semibold};
  color: ${semantic.textNormalStrong};
`;

export const NoticeText = styled(Text)`
  ${typography.caption1Regular};
  color: ${semantic.textNormalStrong};
`;

export const RowBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ gap }) => gap};
`;

export const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap};
`;

export const ShareIconCircle = styled.button`
  ${flexCenter};
  padding: 18px;
  border: none;
  cursor: pointer;
  border-radius: ${measurement.borderRadiusRounded};
`;

export const KakaoShareIconCircle = styled(ShareIconCircle)`
  background-color: #fee500;
`;

export const LinkShareIconCircle = styled(ShareIconCircle)`
  background-color: ${semantic.fillNormalWhite};
`;

export const EventHero = styled.section`
  ${sectionColumn};
  padding: ${measurement.spacing40} 24.5px;
  background-color: ${semantic.fillPrimaryAssistive};
`;

export const EventTypeBadge = styled.span`
  ${flexCenter};
  border-radius: ${measurement.borderRadiusRounded};
  background-color: ${semantic.fillPrimaryNormal};
  color: ${semantic.textNormalInverse};
  ${typography.body2Medium};
  padding: ${measurement.spacing6} ${measurement.spacing16};
  margin-bottom: ${measurement.spacing16};
`;

export const EventContent = styled.section`
  ${sectionColumn};
  background-color: ${semantic.fillNormalNormal};
`;

export const SponsorSection = styled.section`
  ${sectionBase};
  border-top: ${measurement.borderWidthSm} solid ${semantic.borderNormalNormal};
`;

export const SponsorContent = styled(ColumnBox)`
  width: 100%;
  align-items: flex-start;
  gap: ${measurement.spacing20};
  padding: ${measurement.spacing32} ${measurement.spacing16};
`;

export const SponsorButton = styled(BoxButton)`
  width: 100%;
  gap: ${measurement.spacing4};
`;

export const ShareSection = styled.section`
  ${sectionBase};
  padding: ${measurement.spacing20} ${measurement.spacing16};
`;

export const ShareBox = styled.div`
  ${flexColumn};
  width: 100%;
  gap: ${measurement.spacing24};
  padding: ${measurement.spacing32} ${measurement.spacing40};
  border-radius: ${measurement.borderRadius3xl};
  background-color: ${semantic.fillPrimaryAssistive};
`;

export const ShareActions = styled.div`
  display: flex;
  gap: ${measurement.spacing24};
`;

export const ShareAction = styled.div`
  ${flexColumn};
  gap: ${measurement.spacing16};
  padding: 0 ${measurement.spacing8};
`;

export const NoticeBox = styled.section`
  ${sectionColumn};
  align-items: stretch;
  padding: ${measurement.spacing24} ${measurement.spacing16}
    ${measurement.spacing128};
  background-color: ${semantic.fillNormalStrong};
`;
